// js/app.js
import { formatReportForExport } from './formatDailySummary.js';
import { formatDataForAttendance } from './formatDailyAttendance.js'
if (localStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = 'index.html';
}
const stageDayLimits = {
    // Default limits (apply if campaign not listed below)
    _default: {
        "CCT": 999,
        "PST": 999,
        "Nesting": 999
    },
    "campaign1": {
        "CCT": 3,
        "PST": 10,
        "Nesting": 10
    }
};

let mockTasks = {};
let tasksLoaded = false;

const campaignSelect = document.getElementById('campaign-select');
const stageSelect = document.getElementById('stage-select');
const classSelect = document.getElementById('class-select');
const checklistDiv = document.getElementById('daily-checklist');
const generateReportButton = document.getElementById('generate-report-button');
const generateAttendanceButton = document.getElementById('generate-attendance-button');
const currentDateSpan = document.getElementById('current-date');
const currentDaySpan = document.getElementById('current-day');
const logoutButton = document.getElementById('logout-button');
const appMessage = document.getElementById('app-message');
const prevDayButton = document.getElementById('prev-day-button');
const nextDayButton = document.getElementById('next-day-button');
const newClassModal = document.getElementById('new-class-modal');
const modalBackdrop = document.getElementById('modal-backdrop');
const newClassNumberInput = document.getElementById('new-class-number');
const newClassRosterTextarea = document.getElementById('new-class-roster');
const saveNewClassButton = document.getElementById('save-new-class-btn');
const cancelNewClassButton = document.getElementById('cancel-new-class-btn');
const closeModalButton = newClassModal.querySelector('.close-modal-btn');
const cctStartDateInput = document.getElementById('new-class-cct-start');
const cctEndDateInput = document.getElementById('new-class-cct-end');
const pstStartDateInput = document.getElementById('new-class-pst-start');
const pstEndDateInput = document.getElementById('new-class-pst-end');
const nestingStartDateInput = document.getElementById('new-class-nesting-start');
const nestingEndDateInput = document.getElementById('new-class-nesting-end');
const modalErrorP = document.getElementById('modal-error');

const reportModal = document.getElementById('report-modal');
const reportModalDay = document.getElementById('report-modal-day');
const reportModalClass = document.getElementById('report-modal-class');
const reportModalStage = document.getElementById('report-modal-stage');
const reportInitialHc = document.getElementById('report-initial-hc');
const reportCurrentHc = document.getElementById('report-current-hc');
const reportFinalHc = document.getElementById('report-final-hc');
const reportOverallAttrition = document.getElementById('report-overall-attrition');
const reportAbsences = document.getElementById('report-absences');
const reportLateness = document.getElementById('report-lateness');
const reportEwsYellow = document.getElementById('report-ews-yellow');
const reportEwsRed = document.getElementById('report-ews-red');
const reportTopicsTextarea = document.getElementById('report-topics');
const reportHighlightsTextarea = document.getElementById('report-highlights');
const reportPendingTextarea = document.getElementById('report-pending');
const reportActionsTextarea = document.getElementById('report-actions');
const saveReportButton = document.getElementById('save-report-btn');
const cancelReportButton = document.getElementById('cancel-report-btn');
const reportModalError = document.getElementById('report-modal-error');
const reportModalCloseBtn = reportModal.querySelector('.close-modal-btn');

const reportExportArea = document.getElementById('report-export-options');
const copyReportButton = document.getElementById('copy-report-btn');
const downloadReportButton = document.getElementById('download-report-btn');
const reportExportTextarea = document.getElementById('report-export-textarea');

const calloutInputs = {
    facilities: { impact: document.getElementById('callout-facilities-impact'), remarks: document.getElementById('callout-facilities-remarks') },
    equipment: { impact: document.getElementById('callout-equipment-impact'), remarks: document.getElementById('callout-equipment-remarks') },
    performance: { impact: document.getElementById('callout-performance-impact'), remarks: document.getElementById('callout-performance-remarks') },
    engagement: { impact: document.getElementById('callout-engagement-impact'), remarks: document.getElementById('callout-engagement-remarks') },
    agenda: { impact: document.getElementById('callout-agenda-impact'), remarks: document.getElementById('callout-agenda-remarks') },
    attendance: { impact: document.getElementById('callout-attendance-impact'), remarks: document.getElementById('callout-attendance-remarks') },
    attrition: { impact: document.getElementById('callout-attrition-impact'), remarks: document.getElementById('callout-attrition-remarks') }
};

let currentDay = 1;
let currentStage = 'CCT';
let currentCampaign = campaignSelect.value; // Initialize from default HTML
let currentClassId = null;
let taskStatus = {};
let classes = {};
const NEW_CLASS_VALUE = "_new";

async function loadTaskData() {
    try {
        const response = await fetch('./data/tasks.json'); // Path relative to HTML file
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        mockTasks = await response.json();
        tasksLoaded = true;
        console.log("Task data loaded successfully from JSON:", mockTasks);
        // Now that data is loaded, initialize the rest of the app that depends on it
        initializeAppLogic();
    } catch (error) {
        console.error("Could not load task data:", error);
        checklistDiv.innerHTML = `<p class="error-message">Error loading task definitions. Please try again later.</p>`;
        // Handle the error appropriately - maybe disable functionality
    }
}

function displayMessage(message, isError = false) {
    appMessage.textContent = message;
    appMessage.style.color = isError ? 'red' : 'green';
    appMessage.style.display = 'block';
    setTimeout(() => { appMessage.style.display = 'none'; }, 4000);
}

// Guarda el estado actual (día, etapa, estado tareas) en localStorage
function saveState() {
    const state = {
        currentDay,
        currentStage,
        currentCampaign, // Save selected campaign
        currentClassId, // Save selected class ID
        taskStatus,
        classes, // Save the dynamically created classes
        selectedCampaign: campaignSelect.value, // Keep this? might be redundant
        selectedStage: stageSelect.value // Save selected stage
    };
    localStorage.setItem('appState', JSON.stringify(state));
    console.log("State saved:", state);
}

// Carga el estado desde localStorage al iniciar
function loadState() {
    const savedState = localStorage.getItem('appState');
    tasksLoaded = false; // Reset flag on load
    if (savedState) {
        try {
            const state = JSON.parse(savedState);
            currentDay = state.currentDay || 1;
            currentStage = state.selectedStage || state.currentStage || 'CCT'; // Prioritize saved selection
            currentCampaign = state.selectedCampaign || state.currentCampaign || campaignSelect.options[0].value;
            currentClassId = state.currentClassId || null;
            taskStatus = state.taskStatus || {};
            classes = state.classes || {}; // Load saved classes

            // Update UI selections based on loaded state
            campaignSelect.value = currentCampaign;
            stageSelect.value = currentStage;
            // Class dropdown population happens *after* campaign value is set

            console.log("State loaded:", state);
        } catch (e) {
            console.error("Error parsing saved state:", e);
            // Reset to defaults if state is corrupted
            currentDay = 1; currentStage = 'CCT'; currentCampaign = campaignSelect.options[0].value; currentClassId = null; taskStatus = {}; classes = {};
        }
    } else {
        // Initialize defaults if no saved state
        currentDay = 1; currentStage = 'CCT'; currentCampaign = campaignSelect.options[0].value; currentClassId = null; taskStatus = {}; classes = {};
    }
    updateDayDisplay();
    // DO NOT render checklist yet, wait for task data and class population
}
function addBusinessDays(startDateStr, durationInBusinessDays) {
    if (!startDateStr || isNaN(durationInBusinessDays) || durationInBusinessDays <= 0) {
        return null; // Invalid input
    }

    try {
        let currentDate = new Date(startDateStr + 'T00:00:00'); // Use T00:00:00 to avoid timezone issues potentially crossing day boundaries
        if (isNaN(currentDate.getTime())) { // Check if date parsing failed
            return null;
        }

        let addedDays = 0;
        // Adjust duration because the start date counts as the first day if it's a business day
        let businessDaysToAdd = durationInBusinessDays;

        // If the start date itself is a weekend, find the next business day to start counting
        while (currentDate.getDay() === 0 || currentDate.getDay() === 6) { // 0=Sun, 6=Sat
            currentDate.setDate(currentDate.getDate() + 1);
        }
        // Now currentDate is the first valid business day

        while (addedDays < businessDaysToAdd - 1) { // We add duration-1 more days
            currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
            const dayOfWeek = currentDate.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) { // If it's not Sunday or Saturday
                addedDays++;
            }
        }

        // Format the final date as YYYY-MM-DD
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
        const day = String(currentDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;

    } catch (e) {
        console.error("Error in addBusinessDays:", e);
        return null;
    }
}
function handleStageStartDateChange(event) {
    const startDateInput = event.target;
    const stage = startDateInput.dataset.stage; // 'CCT', 'PST', or 'Nesting'
    const startDateValue = startDateInput.value;
    let endDateInput;
    let duration = 0;

    // Find the corresponding end date span and get duration
    const campaignLimits = stageDayLimits[currentCampaign] || stageDayLimits._default;
    duration = campaignLimits[stage] || 0;

    if (stage === 'CCT') {
        endDateInput = cctEndDateInput;
    } else if (stage === 'PST') {
        endDateInput = pstEndDateInput;
    } else if (stage === 'Nesting') {
        endDateInput = nestingEndDateInput;
    }

    if (endDateInput && startDateValue && duration > 0) {
        console.log("hola");
        const endDate = addBusinessDays(startDateValue, duration);
        endDateInput.value = endDate; // Display calculated date or default
    } else if (endDateInput) {
        endDateInput.value = ''; // Reset if start date or duration is invalid
    }
}
function populateClassDropdown() {
    const campaignValue = campaignSelect.value;
    const classesForCampaign = classes[campaignValue] || []; // Get classes for current campaign

    // Remember the previously selected class ID for this campaign if possible
    // const previouslySelectedClass = currentClassId; // This needs refinement if switching campaigns resets class

    classSelect.innerHTML = ''; // Clear existing options

    // Add the "New..." option first
    const newOption = document.createElement('option');
    newOption.value = NEW_CLASS_VALUE;
    newOption.textContent = "New...";
    classSelect.appendChild(newOption);

    // Add existing classes for the campaign
    classesForCampaign.forEach(cls => {
        const option = document.createElement('option');
        option.value = cls.id;
        option.textContent = cls.name; // Use name (which might just be ID for now)
        // Try to re-select the previously selected class
        // if (cls.id === previouslySelectedClass) {
        //    option.selected = true;
        // }
        classSelect.appendChild(option);
    });

    // Set the dropdown value based on currentClassId, or default to "New..."
    if (currentClassId && classesForCampaign.some(cls => cls.id === currentClassId)) {
        classSelect.value = currentClassId;
    } else {
        classSelect.value = NEW_CLASS_VALUE; // Default if currentClassId is null or not in list
        currentClassId = null; // Ensure state reflects no class selected if it wasn't found
    }
    handleClassChange(); // Trigger state update based on final selection
    console.log(`Populated classes for campaign ${campaignValue}. Selected: ${classSelect.value}`);
}
function updateDayDisplay() {
    currentDaySpan.textContent = `Day ${currentDay}`;
    prevDayButton.disabled = (currentDay <= 1);
    checkIfMaxDayReached(); // Call the check here as well
}

function getMaxDaysForCurrentSelection() {
    const selectedCampaign = campaignSelect.value;
    const campaignLimits = stageDayLimits[selectedCampaign] || stageDayLimits._default;
    return campaignLimits[currentStage] || 999; // Default to high number if stage missing
}

function checkIfMaxDayReached() {
    const maxDays = getMaxDaysForCurrentSelection();
    const isAtMaxDays = currentDay >= maxDays;

    // Disable nextDayButton if at max days, regardless of task completion
    if (isAtMaxDays) {
        nextDayButton.disabled = true;
        console.log(`Día máximo (${maxDays}) alcanzado para ${currentStage} en ${campaignSelect.value}.`);
    }
    // Return true if max day reached, false otherwise
    return isAtMaxDays;
}

function renderPendingTasks(previousDay, targetElement) {
    const pendingTasks = [];

    // Get task definitions from the *previous* day
    const tasksFromPreviousDay = mockTasks[currentCampaign]?.[currentStage]?.[previousDay] || [];

    tasksFromPreviousDay.forEach(task => {
        const taskIdFull = `${currentStage}_${previousDay}_${task.id}`; // Use previous day in ID

        // Check status: If status doesn't exist or completed is not true, it's pending
        if (taskStatus[taskIdFull]?.completed !== true) {
            // Consider if attendance tasks should be handled differently (e.g., if any attendee unmarked)
            // For now, check the parent task's 'completed' status derived earlier.
            if (!task.isParent) {
                pendingTasks.push(task);
            } // Add the task definition to the list

            // Also check children of regular parent tasks from previous day
            if (task.isParent && task.children && Array.isArray(task.children)) {
                task.children.forEach(childTask => {
                    const childTaskIdFull = `${taskIdFull}_${childTask.id}`; // Use previous day parent ID
                    if (taskStatus[childTaskIdFull]?.completed !== true) {
                        // Add child task with indication of its parent
                        pendingTasks.push({ ...childTask, parentText: task.text });
                    }
                });
            }
            // Note: We are not checking attendees of attendance tasks here,
            // just the overall completion status of the parent attendance task.
        }
    });

    // If pending tasks were found, create and append the section
    if (pendingTasks.length > 0) {
        const pendingSection = document.createElement('div');
        pendingSection.classList.add('pending-tasks-section');

        const header = document.createElement('h3');
        header.textContent = `Pending Tasks from Day ${previousDay}`;
        pendingSection.appendChild(header);

        const list = document.createElement('ul');
        pendingTasks.forEach(task => {
            const li = document.createElement('li');
            li.classList.add('pending-task-item');
            let text = task.text;
            // Add parent context if it's a pending child task
            if (task.parentText) {
                text = `${task.parentText} > ${task.text}`;
            }
            li.textContent = text;
            // Optional: Add link back to the day? data-attribute?
            list.appendChild(li);
        });
        pendingSection.appendChild(list);

        targetElement.appendChild(pendingSection); // Append to the main checklist div
    }
}


function renderChecklist() {
    checklistDiv.innerHTML = ''; // Clear previous list

    // Check if a class is selected
    if (!currentClassId) {
        checklistDiv.innerHTML = '<p>Please select or create a class to see tasks.</p>';
        disableChecklistControls(true); // Disable buttons if no class
        checkAllTasksCompleted(); // Ensure buttons reflect disabled state
        return;
    }
    disableChecklistControls(false); // Enable buttons if class selected
    if (currentDay > 1) {
        renderPendingTasks(currentDay - 1, checklistDiv); // Render pending tasks first
    }
    // Get tasks for the CURRENT stage AND CURRENT day from the loaded data
    const tasksForDay = mockTasks[currentCampaign]?.[currentStage]?.[currentDay] || []; // Added currentCampaign lookup
    const topLevelUl = document.createElement('ul'); // Create the main list container

    console.log(`Rendering tasks for Stage: ${currentStage}, Day: ${currentDay}, Class: ${currentClassId}`, tasksForDay);

    // Handle case where no tasks are defined for the day
    if (currentDay > 1 && tasksForDay.length > 0) {
        const currentDayHeader = document.createElement('h3');
        currentDayHeader.textContent = `Tasks for Day ${currentDay}`;
        currentDayHeader.style.marginTop = '20px'; // Add some space
        checklistDiv.appendChild(currentDayHeader);
    } else if (tasksForDay.length === 0 && currentDay > 1) {
        // If only pending tasks exist, maybe add a message here too
    } else if (tasksForDay.length === 0 && currentDay === 1) {
        checklistDiv.innerHTML += `<p>No tasks defined for Day ${currentDay} of ${currentStage} in ${campaignSelect.options[campaignSelect.selectedIndex].text}.</p>`;
    }


    // Find the current class data (including attendees) from our state
    const currentClassData = classes[currentCampaign]?.find(cls => cls.id === currentClassId);
    const currentAttendees = currentClassData?.attendees || []; // Get attendees or empty array

    // --- Loop through tasks defined for the specific day ---
    tasksForDay.forEach(task => {
        const isParent = task.isParent === true;
        const isAttendance = task.type === 'attendance';
        const isQuiz = task.type === 'quiz';
        const hasLink = task.link != null;
        // Generate the unique ID for this task instance (Stage_Day_TaskID)
        const taskIdFull = `${currentStage}_${currentDay}_${task.id}`;
        // Get the current status object for this task, or create a default one
        const status = taskStatus[taskIdFull] || { completed: false, observation: '' };

        // --- Create List Item (li) ---
        const li = document.createElement('li');
        li.dataset.taskId = task.id; // Store the original task ID from data
        li.dataset.taskIdFull = taskIdFull; // Store the full unique ID
        // Apply completion style based on status (will be updated for attendance below)
        li.classList.toggle('completed', status.completed);

        // --- Create Task Content Div (for alignment) ---
        const taskContentDiv = document.createElement('div');
        taskContentDiv.classList.add('task-content');

        // --- Create Checkbox ---
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `task-${taskIdFull}`; // Unique ID for the checkbox element
        checkbox.checked = status.completed; // Set initial checked state
        checkbox.addEventListener('change', handleTaskCheck); // Attach event listener
        // Disable parent checkbox for attendance task
        if (isAttendance || isQuiz) {
            checkbox.disabled = true;
        }

        // --- Create Label ---
        const label = document.createElement('label');
        label.htmlFor = `task-${taskIdFull}`; // Associate label with checkbox
        label.textContent = task.text; // Set task text
        if (hasLink) {
            console.log("hola");
            const a = document.createElement('a');
            a.classList.add('task-link');
            a.text = "Link";
            a.href = task.link;
            a.target = "_blank";
            label.appendChild(a);
        }

        // --- Create Add Observation Button ---
        const addObsButton = document.createElement('button');
        addObsButton.classList.add('add-observation-btn');
        addObsButton.textContent = '+';
        addObsButton.title = 'Add/View Observation';
        addObsButton.addEventListener('click', toggleObservationBox); // Attach event listener
        // Add 'has-content' class if observation exists
        if (status.observation?.trim()) {
            addObsButton.classList.add('has-content');
        }

        // --- Create Observation Container and Textarea ---
        const obsContainer = document.createElement('div');
        obsContainer.classList.add('observation-container'); // Initially hidden by CSS
        const obsTextarea = document.createElement('textarea');
        obsTextarea.classList.add('observation-textarea');
        obsTextarea.placeholder = `Observation for "${task.text}"...`;
        obsTextarea.value = status.observation || ''; // Set initial text from status
        obsTextarea.dataset.taskIdFull = taskIdFull; // Link textarea back to task ID
        obsTextarea.addEventListener('input', handleObservationInput); // Attach event listener
        obsContainer.appendChild(obsTextarea);


        // --- Handle Different Task Types ---

        if (isAttendance) {
            // --- ATTENDANCE TASK ---
            li.classList.add('attendance-task', 'collapsed'); // Add 'collapsed' class by default
            li.dataset.isAttendance = "true";
            // Re-apply completion style based on potentially updated derived status
            li.classList.toggle('completed', status.completed);

            // --- Add Toggle Button ---
            const toggleSpan = document.createElement('span');
            toggleSpan.classList.add('toggle-children');
            toggleSpan.textContent = '▼'; // Initial collapsed icon
            toggleSpan.title = 'Toggle Attendee List';
            toggleSpan.addEventListener('click', toggleChildrenVisibility); // Reuse same handler

            // Assemble attendance task content: Toggle -> (Checkbox) -> Label -> Add Obs Button
            const allPresentButton = document.createElement('button');
            allPresentButton.classList.add('all-present-btn');
            allPresentButton.textContent = 'All Present';
            allPresentButton.title = 'Mark All Attendees as Present';
            allPresentButton.dataset.parentIdFull = taskIdFull;
            allPresentButton.addEventListener('click', handleAllPresent);
            taskContentDiv.appendChild(toggleSpan);
            taskContentDiv.appendChild(checkbox);
            taskContentDiv.appendChild(label);
            taskContentDiv.appendChild(allPresentButton);
            taskContentDiv.appendChild(addObsButton);
            li.appendChild(taskContentDiv);
            li.appendChild(obsContainer); // Observation for the overall attendance task

            // --- Create and Populate Attendee List (Collapsible) ---
            const attendeeUl = document.createElement('ul');
            // Add BOTH classes for styling and collapse JS
            attendeeUl.classList.add('attendee-list', 'child-task-list');
            if (currentAttendees.length > 0) {
                currentAttendees.forEach(attendee => { // attendee is {id: employeeId, name: employeeName}
                    const attendeeIdFull = `${taskIdFull}_${attendee.id}`; // Uses employee ID
                    const attendeeStatus = taskStatus[attendeeIdFull] || { attendance: null, observation: '' };

                    const attendeeLi = document.createElement('li');
                    attendeeLi.dataset.attendeeId = attendee.id;
                    attendeeLi.dataset.attendeeIdFull = attendeeIdFull;
                    attendeeLi.dataset.parentIdFull = taskIdFull;

                    const attendeeLabel = document.createElement('label');
                    attendeeLabel.textContent = attendee.name;
                    attendeeLabel.htmlFor = `select-${attendeeIdFull}`;

                    const select = document.createElement('select');
                    select.classList.add('attendance-status-select');
                    select.id = `select-${attendeeIdFull}`;
                    select.dataset.attendeeIdFull = attendeeIdFull;
                    select.dataset.parentIdFull = taskIdFull;
                    const options = [{ value: "", text: "--" }, { value: "P", text: "P - Present" }, { value: "L", text: "L - Late" }, { value: "A", text: "A - Absent" }, { value: "T", text: "T - Terminated" }, { value: "O", text: "O - Other" }];
                    options.forEach(opt => { const optionEl = document.createElement('option'); optionEl.value = opt.value; optionEl.textContent = opt.text; if (attendeeStatus.attendance === opt.value) { optionEl.selected = true; } select.appendChild(optionEl); });
                    select.addEventListener('change', handleAttendanceChange);

                    const attendeeAddObsButton = document.createElement('button');
                    attendeeAddObsButton.classList.add('add-observation-btn'); attendeeAddObsButton.textContent = '+'; attendeeAddObsButton.title = `Add/View Observation for ${attendee.name}`; attendeeAddObsButton.addEventListener('click', toggleObservationBox); if (attendeeStatus.observation?.trim()) { attendeeAddObsButton.classList.add('has-content'); }

                    const attendeeObsContainer = document.createElement('div'); attendeeObsContainer.classList.add('observation-container'); const attendeeObsTextarea = document.createElement('textarea'); attendeeObsTextarea.classList.add('observation-textarea'); attendeeObsTextarea.placeholder = `Observation for ${attendee.name}...`; attendeeObsTextarea.value = attendeeStatus.observation || ''; attendeeObsTextarea.dataset.taskIdFull = attendeeIdFull; attendeeObsTextarea.addEventListener('input', handleObservationInput); attendeeObsContainer.appendChild(attendeeObsTextarea);

                    attendeeLi.appendChild(attendeeLabel);
                    attendeeLi.appendChild(select);
                    attendeeLi.appendChild(attendeeAddObsButton);
                    attendeeLi.appendChild(attendeeObsContainer);
                    attendeeUl.appendChild(attendeeLi);
                });
            } else {
                attendeeUl.innerHTML = '<li>No attendees found for this class. Add them via "New Class".</li>';
            }
            li.appendChild(attendeeUl); // Append attendee list


        } else if (isQuiz) {
            // --- REGULAR PARENT TASK ---
            li.classList.add('attendance-task', 'collapsed'); // Add 'collapsed' class by default
            li.dataset.isQuiz = "true";
            // Re-apply completion style based on potentially updated derived status
            li.classList.toggle('completed', status.completed);

            // --- Add Toggle Button ---
            const toggleSpan = document.createElement('span');
            toggleSpan.classList.add('toggle-children');
            toggleSpan.textContent = '▼'; // Initial collapsed icon
            toggleSpan.title = 'Toggle Attendee List';
            toggleSpan.addEventListener('click', toggleChildrenVisibility); // Reuse same handler

            // Assemble attendance task content: Toggle -> (Checkbox) -> Label -> Add Obs Button
            taskContentDiv.appendChild(toggleSpan);
            taskContentDiv.appendChild(checkbox);
            taskContentDiv.appendChild(label);
            taskContentDiv.appendChild(addObsButton);
            li.appendChild(taskContentDiv);
            li.appendChild(obsContainer); // Observation for the overall attendance task

            // --- Create and Populate Attendee List (Collapsible) ---
            const attendeeUl = document.createElement('ul');
            // Add BOTH classes for styling and collapse JS
            attendeeUl.classList.add('attendee-list', 'child-task-list');
            if (currentAttendees.length > 0) {
                currentAttendees.forEach(attendee => { // attendee is {id: employeeId, name: employeeName}
                    const scoreOfAttendeeIdFull = `${taskIdFull}_${attendee.id}`; // Uses employee ID
                    const scoreStatus = taskStatus[scoreOfAttendeeIdFull] || { quizScore: null, observation: '' };

                    const attendeeLi = document.createElement('li');
                    attendeeLi.classList = "quiz-child-item";
                    attendeeLi.dataset.scoreOfAttendeeId = attendee.id;
                    attendeeLi.dataset.scoreOfAttendeeIdFull = scoreOfAttendeeIdFull;
                    attendeeLi.dataset.parentIdFull = taskIdFull;
                    const scoreDiv = document.createElement('div');
                    scoreDiv.classList = "score-div";


                    const attendeeLabel = document.createElement('label');
                    attendeeLabel.textContent = `${attendee.name}`;
                    const scoreLabel = document.createElement('label');
                    scoreLabel.textContent = `Score: `;
                    scoreLabel.htmlFor = `input-${scoreOfAttendeeIdFull}`;
                    const input = document.createElement('input');
                    input.classList.add('attendance-status-select');
                    input.id = `input-${scoreOfAttendeeIdFull}`;
                    input.type = "number";
                    input.min = 0;
                    input.max = 100;
                    input.dataset.scoreOfAttendeeIdFull = scoreOfAttendeeIdFull;
                    input.dataset.parentIdFull = taskIdFull;
                    input.addEventListener('change', handleQuizScoreChange);
                    if (scoreStatus.quizScore !== null) {
                        input.value = scoreStatus.quizScore;
                    }

                    const attendeeAddObsButton = document.createElement('button');
                    attendeeAddObsButton.classList.add('add-observation-btn'); attendeeAddObsButton.textContent = '+'; attendeeAddObsButton.title = `Add/View Observation for ${attendee.name}`; attendeeAddObsButton.addEventListener('click', toggleObservationBox); if (scoreStatus.observation?.trim()) { attendeeAddObsButton.classList.add('has-content'); }

                    const attendeeObsContainer = document.createElement('div'); attendeeObsContainer.classList.add('observation-container'); const attendeeObsTextarea = document.createElement('textarea'); attendeeObsTextarea.classList.add('observation-textarea'); attendeeObsTextarea.placeholder = `Observation for ${attendee.name}...`; attendeeObsTextarea.value = scoreStatus.observation || ''; attendeeObsTextarea.dataset.taskIdFull = scoreOfAttendeeIdFull; attendeeObsTextarea.addEventListener('input', handleObservationInput); attendeeObsContainer.appendChild(attendeeObsTextarea);

                    attendeeLi.appendChild(attendeeLabel);
                    scoreDiv.appendChild(scoreLabel);
                    scoreDiv.appendChild(input);
                    attendeeLi.appendChild(scoreDiv);
                    attendeeLi.appendChild(attendeeAddObsButton);
                    attendeeLi.appendChild(attendeeObsContainer);
                    attendeeUl.appendChild(attendeeLi);
                });
            } else {
                attendeeUl.innerHTML = '<li>No attendees found for this class. Add them via "New Class".</li>';
            }
            li.appendChild(attendeeUl); // Append attendee list

        } else if (isParent) {
            // --- REGULAR PARENT TASK ---
            li.classList.add('parent-task', 'collapsed'); // Add 'collapsed' by default
            li.dataset.isParent = "true";

            // Add Toggle Button
            const toggleSpan = document.createElement('span');
            toggleSpan.classList.add('toggle-children');
            toggleSpan.textContent = '▼';
            toggleSpan.title = 'Toggle Sub-tasks';
            toggleSpan.addEventListener('click', toggleChildrenVisibility);

            // Assemble parent task content: Toggle -> Checkbox -> Label -> Add Obs Button
            taskContentDiv.appendChild(toggleSpan);
            taskContentDiv.appendChild(checkbox);
            taskContentDiv.appendChild(label);
            taskContentDiv.appendChild(addObsButton);
            li.appendChild(taskContentDiv);
            li.appendChild(obsContainer); // Observation for the parent task

            // --- Create and Populate Child Task List (Collapsible) ---
            const childUl = document.createElement('ul');
            childUl.classList.add('child-task-list'); // Class for styling and collapse JS
            if (task.children && Array.isArray(task.children)) {
                task.children.forEach(childTask => {
                    const childTaskIdFull = `${taskIdFull}_${childTask.id}`;
                    const childStatus = taskStatus[childTaskIdFull] || { completed: false, observation: '' };
                    const childHasLink = childTask.link != null;

                    const childLi = document.createElement('li');
                    childLi.dataset.taskId = childTask.id;
                    childLi.dataset.taskIdFull = childTaskIdFull;
                    childLi.dataset.parentIdFull = taskIdFull;
                    childLi.classList.toggle('completed', childStatus.completed);

                    // Child Task Content Div
                    const childTaskContentDiv = document.createElement('div');
                    childTaskContentDiv.classList.add('task-content');
                    // Child Checkbox
                    const childCheckbox = document.createElement('input');
                    childCheckbox.type = 'checkbox'; childCheckbox.id = `task-${childTaskIdFull}`; childCheckbox.checked = childStatus.completed; childCheckbox.addEventListener('change', handleTaskCheck);
                    // Child Label
                    const childLabel = document.createElement('label');
                    childLabel.htmlFor = `task-${childTaskIdFull}`; childLabel.textContent = childTask.text;
                    if (childHasLink) {
                        console.log("hola");
                        const a = document.createElement('a');
                        a.classList.add('task-link');
                        a.text = "Link";
                        a.href = childTask.link;
                        a.target = "_blank";
                        childLabel.appendChild(a);
                    }
                    // Assemble content
                    childTaskContentDiv.appendChild(childCheckbox); childTaskContentDiv.appendChild(childLabel);
                    childLi.appendChild(childTaskContentDiv);

                    // Child Add Observation Button
                    const childAddObsButton = document.createElement('button');
                    childAddObsButton.classList.add('add-observation-btn'); childAddObsButton.textContent = '+'; childAddObsButton.title = 'Add/View Observation'; childAddObsButton.addEventListener('click', toggleObservationBox); if (childStatus.observation?.trim()) { childAddObsButton.classList.add('has-content'); }
                    childLi.appendChild(childAddObsButton);

                    // Child Observation Container
                    const childObsContainer = document.createElement('div');
                    childObsContainer.classList.add('observation-container'); const childObsTextarea = document.createElement('textarea'); childObsTextarea.classList.add('observation-textarea'); childObsTextarea.placeholder = `Observation for "${childTask.text}"...`; childObsTextarea.value = childStatus.observation || ''; childObsTextarea.dataset.taskIdFull = childTaskIdFull; childObsTextarea.addEventListener('input', handleObservationInput); childObsContainer.appendChild(childObsTextarea);
                    childLi.appendChild(childObsContainer);

                    childUl.appendChild(childLi);
                });
            }
            li.appendChild(childUl);

        } else {
            // --- NORMAL TASK ---
            li.classList.add('normal-task');

            // Assemble normal task content: Checkbox -> Label
            taskContentDiv.appendChild(checkbox);
            taskContentDiv.appendChild(label);
            li.appendChild(taskContentDiv); // Add content div to li

            // Add observation button and container directly to li
            li.appendChild(addObsButton);
            li.appendChild(obsContainer);
        }

        // Add the fully constructed list item to the main list
        topLevelUl.appendChild(li);
    });

    // Append the main list to the checklist container div
    checklistDiv.appendChild(topLevelUl);

    // Update completion status for any attendance tasks rendered & check overall
    updateQuizTaskCompletionStates();
    updateAttendanceTaskCompletionStates();
    checkAllTasksCompleted();
}

function handleAllPresent(event) {
    const currentClassData = classes[currentCampaign]?.find(cls => cls.id === currentClassId);
    const currentAttendees = currentClassData?.attendees || [];
    const button = event.target;
    const taskIdFull = button.dataset.parentIdFull;
    const parentLi = button.closest('li[data-is-attendance="true"]');
    console.log(button);
    if (currentAttendees.length > 0) {
        currentAttendees.forEach(attendee => {
            const attendeeIdFull = `${taskIdFull}_${attendee.id}`; // Uses employee ID
            taskStatus[attendeeIdFull] = { attendance: 'P', observation: '' };
        });
    }
    updateParentAttendanceCompletion(taskIdFull);
    saveState();
    checkAllTasksCompleted();
    renderChecklist();
}

function handleAttendanceChange(event) {
    const selectElement = event.target;
    const attendeeIdFull = selectElement.dataset.attendeeIdFull;
    const parentIdFull = selectElement.dataset.parentIdFull;
    const selectedValue = selectElement.value;
    console.log(selectElement);

    console.log(`Attendance change: AttendeeID=${attendeeIdFull}, ParentID=${parentIdFull}, Value=${selectedValue}`);

    // Ensure status object exists for the attendee
    if (!taskStatus[attendeeIdFull]) {
        taskStatus[attendeeIdFull] = { attendance: null, observation: '' };
    }
    // Update attendance status
    taskStatus[attendeeIdFull].attendance = selectedValue || null; // Store null if default "" is selected

    // Update the completion status of the parent attendance task
    updateParentAttendanceCompletion(parentIdFull);

    saveState(); // Save changes
    checkAllTasksCompleted(); // Update overall button states
}

function handleQuizScoreChange(event) {
    const inputElement = event.target;
    const scoreOfAttendeeIdFull = inputElement.dataset.scoreOfAttendeeIdFull;
    const parentIdFull = inputElement.dataset.parentIdFull;
    const selectedValue = inputElement.value;
    console.log(inputElement);

    console.log(`Attendance change: AttendeeID=${scoreOfAttendeeIdFull}, ParentID=${parentIdFull}, Value=${selectedValue}`);

    // Ensure status object exists for the attendee
    if (!taskStatus[scoreOfAttendeeIdFull]) {
        taskStatus[scoreOfAttendeeIdFull] = { quizScore: null, observation: '' };
    }
    // Update attendance status
    taskStatus[scoreOfAttendeeIdFull].quizScore = selectedValue || null; // Store null if default "" is selected

    // Update the completion status of the parent attendance task
    updateParentQuizCompletion(parentIdFull);

    saveState(); // Save changes
    checkAllTasksCompleted(); // Update overall button states
}

function updateParentQuizCompletion(parentIdFull) {
    const parentLi = document.querySelector(`li[data-task-id-full="${parentIdFull}"]`);
    if (!parentLi || parentLi.dataset.isQuiz !== "true") return;

    // Find the current class data to get the expected attendees
    const currentClassData = classes[currentCampaign]?.find(cls => cls.id === currentClassId);
    const expectedAttendees = currentClassData?.attendees || [];

    if (expectedAttendees.length === 0) {
        console.log(`No attendees for class ${currentClassId}, cannot determine attendance completion for ${parentIdFull}`);
        // Decide desired behavior: mark as complete or incomplete? Let's assume incomplete.
        taskStatus[parentIdFull] = { ...(taskStatus[parentIdFull] || {}), completed: false };
        parentLi.classList.remove('completed'); // Ensure not marked complete
        const parentCheckbox = parentLi.querySelector(`.task-content input[type="checkbox"]`);
        if (parentCheckbox) parentCheckbox.checked = false;
        return; // Exit if no attendees defined
    }

    let allScoresRegistered = true;
    expectedAttendees.forEach(attendee => { // attendee is {id: employeeId, name: employeeName}
        const scoreOfAttendeeIdFull = `${parentIdFull}_${attendee.id}`; // Use attendee.id (Employee ID)
        if (!taskStatus[scoreOfAttendeeIdFull] || !taskStatus[scoreOfAttendeeIdFull].quizScore) {
            allScoresRegistered = false;
        }
    });

    console.log(`Updating parent ${parentIdFull} completion. All ${expectedAttendees.length} attendees marked? ${allScoresRegistered}`);

    // Update the parent task's status object
    if (!taskStatus[parentIdFull]) {
        taskStatus[parentIdFull] = { completed: false, observation: '' };
    }
    taskStatus[parentIdFull].completed = allScoresRegistered;

    // Update the parent checkbox and visual style
    const parentCheckbox = parentLi.querySelector(`.task-content input[type="checkbox"]`);
    if (parentCheckbox) parentCheckbox.checked = allScoresRegistered;
    parentLi.classList.toggle('completed', allScoresRegistered);
}

function updateParentAttendanceCompletion(parentIdFull) {
    const parentLi = document.querySelector(`li[data-task-id-full="${parentIdFull}"]`);
    if (!parentLi || parentLi.dataset.isAttendance !== "true") return;

    // Find the current class data to get the expected attendees
    const currentClassData = classes[currentCampaign]?.find(cls => cls.id === currentClassId);
    const expectedAttendees = currentClassData?.attendees || [];

    if (expectedAttendees.length === 0) {
        console.log(`No attendees for class ${currentClassId}, cannot determine attendance completion for ${parentIdFull}`);
        // Decide desired behavior: mark as complete or incomplete? Let's assume incomplete.
        taskStatus[parentIdFull] = { ...(taskStatus[parentIdFull] || {}), completed: false };
        parentLi.classList.remove('completed'); // Ensure not marked complete
        const parentCheckbox = parentLi.querySelector(`.task-content input[type="checkbox"]`);
        if (parentCheckbox) parentCheckbox.checked = false;
        return; // Exit if no attendees defined
    }

    let allAttendeesMarked = true;
    expectedAttendees.forEach(attendee => { // attendee is {id: employeeId, name: employeeName}
        const attendeeIdFull = `${parentIdFull}_${attendee.id}`; // Use attendee.id (Employee ID)
        if (!taskStatus[attendeeIdFull] || !taskStatus[attendeeIdFull].attendance) {
            allAttendeesMarked = false;
        }
    });

    console.log(`Updating parent ${parentIdFull} completion. All ${expectedAttendees.length} attendees marked? ${allAttendeesMarked}`);

    // Update the parent task's status object
    if (!taskStatus[parentIdFull]) {
        taskStatus[parentIdFull] = { completed: false, observation: '' };
    }
    taskStatus[parentIdFull].completed = allAttendeesMarked;

    // Update the parent checkbox and visual style
    const parentCheckbox = parentLi.querySelector(`.task-content input[type="checkbox"]`);
    if (parentCheckbox) parentCheckbox.checked = allAttendeesMarked;
    parentLi.classList.toggle('completed', allAttendeesMarked);
}

function findTaskData(taskIdFull) {
    // Example: taskIdFull = "CCT_1_cct1_attendance"
    const parts = taskIdFull.split('_');
    if (parts.length < 3) return null;
    const stage = parts[0];
    const day = parseInt(parts[1], 10);
    const taskId = parts.slice(2).join('_'); // Handle task IDs that might contain underscores

    const tasksForDay = mockTasks[stage]?.[day];
    if (!tasksForDay) return null;

    return tasksForDay.find(task => task.id === taskId);
}

function updateAttendanceTaskCompletionStates() {
    const attendanceTasks = checklistDiv.querySelectorAll('li[data-is-attendance="true"]');
    attendanceTasks.forEach(li => {
        updateParentAttendanceCompletion(li.dataset.taskIdFull);
    });
}

function updateQuizTaskCompletionStates() {
    const attendanceTasks = checklistDiv.querySelectorAll('li[data-is-quiz="true"]');
    attendanceTasks.forEach(li => {
        updateParentQuizCompletion(li.dataset.taskIdFull);
    });
}

function toggleChildrenVisibility(event) {
    const toggleButton = event.target;
    const parentLi = toggleButton.closest('li.parent-task');
    const attendanceLi = toggleButton.closest('li.attendance-task');
    if (parentLi) {
        parentLi.classList.toggle('collapsed');
        toggleButton.textContent = parentLi.classList.contains('collapsed') ? '▼' : '▼';
    }
    if (attendanceLi) {
        attendanceLi.classList.toggle('collapsed');
        toggleButton.textContent = attendanceLi.classList.contains('collapsed') ? '▼' : '▼';
    }
}

function toggleObservationBox(event) {
    const button = event.target;
    // Find the closest list item (parent or child)
    const listItem = button.closest('li[data-task-id-full]');
    if (listItem) {
        const obsContainer = listItem.querySelector('.observation-container');
        if (obsContainer) {
            obsContainer.classList.toggle('visible');
            // Optional: focus textarea when shown
            if (obsContainer.classList.contains('visible')) {
                obsContainer.querySelector('textarea').focus();
            }
        }
    }
}

function handleObservationInput(event) {
    const textarea = event.target;
    const taskIdFull = textarea.dataset.taskIdFull;
    const observationText = textarea.value;
    const button = textarea.closest('li[data-task-id-full]').querySelector('.add-observation-btn');

    // Ensure status object exists
    if (!taskStatus[taskIdFull]) {
        taskStatus[taskIdFull] = { completed: false, observation: '' };
    }

    // Update observation in state
    taskStatus[taskIdFull].observation = observationText;

    // Update button style based on content
    button.classList.toggle('has-content', observationText.trim() !== '');


    console.log(`Observation updated for ${taskIdFull}: "${observationText}"`);
    saveState(); // Save state whenever observation changes
}


function handleTaskCheck(event) {
    const checkbox = event.target;
    // Ignore if the checkbox is for the main attendance task (which should be disabled)
    const parentLiCheck = checkbox.closest('li[data-is-attendance="true"]');
    if (parentLiCheck && checkbox.id === `task-${parentLiCheck.dataset.taskIdFull}`) {
        console.log("Ignoring click on main attendance task checkbox.");
        event.preventDefault(); // Prevent default change just in case
        return;
    }


    const li = checkbox.closest('li');
    const taskIdFull = li.dataset.taskIdFull;
    const isCompleted = checkbox.checked;
    const isParent = li.dataset.isParent === "true"; // Regular parent, not attendance parent
    const parentIdFull = li.dataset.parentIdFull; // For regular children

    console.log(`Checkbox change: ID=${taskIdFull}, Completed=${isCompleted}, IsParent=${isParent}, ParentID=${parentIdFull}`);

    // Ensure status object exists and update completion
    if (!taskStatus[taskIdFull]) {
        taskStatus[taskIdFull] = { completed: false, observation: '' };
    }
    taskStatus[taskIdFull].completed = isCompleted;

    li.classList.toggle('completed', isCompleted);

    // --- Handle REGULAR Parent/Child Logic (excluding attendance) ---
    if (isParent) {
        // Regular PARENT checkbox clicked
        const childCheckboxes = li.querySelectorAll('.child-task-list input[type="checkbox"]');
        childCheckboxes.forEach(childCheckbox => {
            const childLi = childCheckbox.closest('li');
            const childTaskIdFull = childLi.dataset.taskIdFull;
            childCheckbox.checked = isCompleted;
            childLi.classList.toggle('completed', isCompleted);
            if (!taskStatus[childTaskIdFull]) {
                taskStatus[childTaskIdFull] = { completed: false, observation: '' };
            }
            taskStatus[childTaskIdFull].completed = isCompleted;
        });
        console.log(`Regular Parent ${taskIdFull} clicked. Set ${childCheckboxes.length} children to ${isCompleted}`);

    } else if (parentIdFull) {
        // Regular CHILD checkbox clicked
        // Check if the parent is an attendance task - if so, do nothing here (handled by attendance logic)
        const parentLi = document.querySelector(`li[data-task-id-full="${parentIdFull}"]`);
        if (parentLi && parentLi.dataset.isAttendance !== "true") {
            // It's a regular child of a regular parent
            const childCheckboxes = parentLi.querySelectorAll('.child-task-list input[type="checkbox"]');
            let allChildrenCompleted = true;
            childCheckboxes.forEach(childCheckbox => {
                if (!childCheckbox.checked) {
                    allChildrenCompleted = false;
                }
            });

            // Update parent status object and checkbox
            if (!taskStatus[parentIdFull]) {
                taskStatus[parentIdFull] = { completed: false, observation: '' };
            }
            taskStatus[parentIdFull].completed = allChildrenCompleted;

            const parentCheckbox = parentLi.querySelector(`.task-content input[type="checkbox"]`);
            if (parentCheckbox) { // Check if parent checkbox exists
                parentCheckbox.checked = allChildrenCompleted;
            }
            parentLi.classList.toggle('completed', allChildrenCompleted);
            console.log(`Regular Child ${taskIdFull} clicked. All children of ${parentIdFull} complete? ${allChildrenCompleted}. Parent updated.`);
        }
    }

    saveState();
    checkAllTasksCompleted();
}


function checkAllTasksCompleted() {
    // Check if a class is selected first
    if (!currentClassId) {
        generateReportButton.disabled = true;
        nextDayButton.disabled = true;
        generateAttendanceButton.disabled = true;
        return; // Cannot be complete if no class selected
    }

    const tasksForDay = mockTasks[currentCampaign]?.[currentStage]?.[currentDay] || [];
    let allTopLevelTasksComplete = true;

    if (tasksForDay.length === 0) {
        allTopLevelTasksComplete = true; // Assume day is complete if no tasks defined
    } else {
        tasksForDay.forEach(task => {
            const taskIdFull = `${currentStage}_${currentDay}_${task.id}`;

            if (task.type === 'attendance') {
                if (taskStatus[taskIdFull]?.completed !== true) {
                    allTopLevelTasksComplete = false;
                }
            }
        });
    }

    const maxDayReached = checkIfMaxDayReached();
    generateAttendanceButton.disabled = !allTopLevelTasksComplete || tasksForDay.length === 0;
    generateReportButton.disabled = !allTopLevelTasksComplete || tasksForDay.length === 0;
    nextDayButton.disabled = !allTopLevelTasksComplete || maxDayReached;


    console.log(`Day ${currentDay}: Class ${currentClassId}, TopLevelTasks Complete=${allTopLevelTasksComplete}, Max Day Reached=${maxDayReached}, Next Day Button Disabled=${nextDayButton.disabled}`);
}

// --- NEW: Show/Hide Modal Functions ---
function showNewClassModal() {
    modalErrorP.style.display = 'none';
    newClassNumberInput.value = ''; // Clear class number
    newClassRosterTextarea.value = ''; // Clear roster

    // Clear date fields and calculated end dates
    cctStartDateInput.value = '';
    pstStartDateInput.value = '';
    nestingStartDateInput.value = '';
    cctEndDateInput.textContent = '';
    pstEndDateInput.textContent = '';
    nestingEndDateInput.textContent = '';

    modalBackdrop.style.display = 'block';
    newClassModal.style.display = 'block';
    newClassNumberInput.focus();
}

function hideNewClassModal() {
    modalBackdrop.style.display = 'none';
    newClassModal.style.display = 'none';
}

// --- NEW: Handle Save New Class ---
function handleSaveNewClass() {
    modalErrorP.style.display = 'none';
    const classNumber = newClassNumberInput.value.trim(); // Get the number part
    const rosterText = newClassRosterTextarea.value.trim();
    const cctStart = cctStartDateInput.valueAsDate;
    const pstStart = pstStartDateInput.valueAsDate;
    const nestingStart = nestingStartDateInput.valueAsDate;
    // Get calculated end dates (re-calculate or read from span?) Reading is simpler.
    const cctEnd = cctEndDateInput.value !== '' ? cctEndDateInput.value : null;
    const pstEnd = pstEndDateInput.value !== '' ? pstEndDateInput.value : null;
    const nestingEnd = nestingEndDateInput.value !== '' ? nestingEndDateInput.value : null;
    // --- Validation ---
    if (!classNumber) {
        modalErrorP.textContent = "Class Number cannot be empty.";
        modalErrorP.style.display = 'block';
        return;
    }
    // Basic alphanumeric check (you might want a stricter regex)
    if (!/^[a-zA-Z0-9]+$/.test(classNumber)) {
        modalErrorP.textContent = "Class Number should be alphanumeric.";
        modalErrorP.style.display = 'block';
        return;
    }

    // Construct the full class ID/Name
    const newId = `Wave_${classNumber}`;
    const newName = `Wave ${classNumber}`; // Use the full ID as the display name

    // Check if full class ID already exists for this campaign
    const classesForCampaign = classes[currentCampaign] || [];
    if (classesForCampaign.some(cls => cls.id === newId)) {
        modalErrorP.textContent = `Class "${newName}" already exists for campaign ${currentCampaign}.`;
        modalErrorP.style.display = 'block';
        return;
    }
    if (!cctStart || !pstStart || !nestingStart) {
        modalErrorP.textContent = "Please enter start dates for all stages (CCT, PST, Nesting).";
        modalErrorP.style.display = 'block';
        return;
    }

    if (!rosterText) {
        modalErrorP.textContent = "Roster cannot be empty.";
        modalErrorP.style.display = 'block';
        return;
    }

    // --- Parse Roster (EmployeeID Name per line) ---
    const parsedAttendees = [];
    const lines = rosterText.split('\n');
    const errors = [];
    const seenIds = new Set(); // To check for duplicate IDs in the input

    lines.forEach((line, index) => {
        const trimmedLine = line.trim();
        if (trimmedLine) { // Ignore empty lines
            // Find the first space to separate ID from Name
            const firstSpaceIndex = trimmedLine.indexOf(' ');
            if (firstSpaceIndex === -1 || firstSpaceIndex === 0) {
                // Error: Line doesn't contain a space or starts with a space
                errors.push(`Line ${index + 1}: Invalid format. Use "EmployeeID Name".`);
                return; // Skip this line
            }

            const attendeeId = trimmedLine.substring(0, firstSpaceIndex).trim();
            const attendeeName = trimmedLine.substring(firstSpaceIndex + 1).trim();

            if (!attendeeId) {
                errors.push(`Line ${index + 1}: Missing EmployeeID.`);
                return;
            }
            if (!attendeeName) {
                errors.push(`Line ${index + 1}: Missing Name for ID ${attendeeId}.`);
                return;
            }
            // Check for duplicate IDs within this roster input
            if (seenIds.has(attendeeId)) {
                errors.push(`Line ${index + 1}: Duplicate EmployeeID "${attendeeId}" found in roster.`);
                return;
            }


            seenIds.add(attendeeId);
            parsedAttendees.push({ id: attendeeId, name: attendeeName });
        }
    });

    // Display parsing errors if any occurred
    if (errors.length > 0) {
        modalErrorP.innerHTML = errors.join('<br>'); // Show all errors
        modalErrorP.style.display = 'block';
        return; // Stop saving
    }

    if (parsedAttendees.length === 0) {
        modalErrorP.textContent = "Roster must contain at least one valid entry in 'EmployeeID Name' format.";
        modalErrorP.style.display = 'block';
        return;
    }
    // --- End Roster Parsing ---


    // Add to state
    if (!classes[currentCampaign]) {
        classes[currentCampaign] = [];
    }
    const newClass = {
        id: newId, // Use Wave_# as the unique ID
        name: newName, // Display name is also Wave_#
        attendees: parsedAttendees, // Array of {id: employeeId, name: employeeName}
        initialHC: parsedAttendees.length,
        dates: {
            cctStart: cctStart,
            cctEnd: cctEnd,
            pstStart: pstStart,
            pstEnd: pstEnd,
            nestingStart: nestingStart,
            nestingEnd: nestingEnd
        }
    };
    classes[currentCampaign].push(newClass);

    console.log("New class created:", newClass);

    currentClassId = newId; // Set the new class as the current one

    saveState(); // Save the updated classes list
    populateClassDropdown(); // Repopulate dropdown, which will select the new class
    hideNewClassModal();
    renderChecklist(); // Re-render checklist for the new class
}

// --- NEW: Disable/Enable Checklist Controls ---
function disableChecklistControls(isDisabled) {
    prevDayButton.disabled = isDisabled || currentDay <= 1;
    // Next day button state depends on completion & limits, checked in checkAllTasksCompleted
    // generateReportButton state depends on completion, checked in checkAllTasksCompleted
    // For simplicity, just disable them all if no class, let checkAllTasksCompleted handle enable logic
    if (isDisabled) {
        nextDayButton.disabled = true;
        generateReportButton.disabled = true;
        generateAttendanceButton.disabled = true;
    }
}


function setCurrentDate() {
    const today = new Date();
    currentDateSpan.textContent = today.toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
}

function handleLogout() {
    console.log("Cerrando sesión...");
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('appState'); // Limpia el estado guardado
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

function handleGenerateAttendance() {
    if (generateReportButton.disabled) return;
    if (!currentClassId) {
        displayMessage("Please select a class before generating a report.", true);
        return;
    }
    reportModalError.style.display = 'none';
    const currentClassData = classes[currentCampaign]?.find(cls => cls.id === currentClassId);
    const currentAttendees = currentClassData?.attendees || [];
    const attendanceTaskDef = (mockTasks[currentCampaign]?.[currentStage]?.[currentDay] || []).find(t => t.type === 'attendance');
    let initialStageDate = new Date();
    
    console.log(initialStageDate);
    let date = ''
    let attendanceReportData = [];
    let attendanceTaskFound = false;
    if (attendanceTaskDef) {
        attendanceTaskFound = true;

        currentAttendees.forEach(attendee => {
            let statuses = [];
            if (currentStage == 'CCT') {
                initialStageDate = new Date(Date.parse(currentClassData?.dates.cctStart));
                
            } else if (currentStage == 'PST') {
                initialStageDate = new Date(Date.parse(currentClassData?.dates.pstStart));
            } else if (currentStage == 'Nesting') {
                initialStageDate = new Date(Date.parse(currentClassData?.dates.nestingStart));
            }
            for (let day = 0; day <= currentDay-1; day++) {
                const attendanceTaskIdFull = `${currentStage}_${day+1}_${attendanceTaskDef.id}`;
                const attendeeIdFull = `${attendanceTaskIdFull}_${attendee.id}`;
                const status = taskStatus[attendeeIdFull]?.attendance;
                let dateAndStatus = {};
                do {
                    initialStageDate.setDate(initialStageDate.getDate() + 1);
                    console.log(initialStageDate.getDay());
                } while (initialStageDate.getDay() === 0 || initialStageDate.getDay() === 6);
                console.log("this is the initialStageDate" + initialStageDate.getDate);
                date = initialStageDate.toLocaleDateString('en-US', {
                    month: 'short', day: 'numeric'
                });
                console.log("this is the string date" + date);
                dateAndStatus = {
                    date: date,
                    status: status,
                    statusColor: "White;"
                };
                if (status === 'P') {

                    dateAndStatus.statusColor = "rgb(0,176,80);";
                }
                if (status === 'A') {
                    dateAndStatus.statusColor = "rgb(192,0,0);";
                }
                if (status === 'L') {
                    dateAndStatus.statusColor = "rgb(255,192,0);";
                }
                if (status === 'T') {
                    dateAndStatus.statusColor = "rgb(0, 0, 0);";
                }
                statuses.push(dateAndStatus);
            }
            let attendeeData = {
                name: attendee.name,
                id: attendee.id,
                statuses: statuses
            };
            
            attendanceReportData.push(attendeeData);
        });
        try {
            const formattedAttendanceHTML = formatDataForAttendance(attendanceReportData);
            const formattedReportText = formattedAttendanceHTML.replace(/<[^>]*>/g, '\n').replace(/\n\s*\n/g, '\n').trim();
            handleCopyReport(formattedAttendanceHTML, formattedReportText);
            displayMessage(`Daily Attendance copied to clipboard successfully.`);

        } catch (e) {
            console.error("Error saving or preparing report data for export:", e);
            displayMessage("Error saving report data. Please fill all the necessary information.", true);
        }

    }
}

function handleGenerateReport() {
    if (generateReportButton.disabled) return; // Should be enabled if called
    if (!currentClassId) {
        displayMessage("Please select a class before generating a report.", true);
        return;
    }

    console.log(`Initiating report for Campaign: ${currentCampaign}, Class: ${currentClassId}, Stage: ${currentStage}, Day: ${currentDay}`);
    reportModalError.style.display = 'none'; // Hide previous errors

    // --- 1. Gather known data ---
    const currentClassData = classes[currentCampaign]?.find(cls => cls.id === currentClassId);
    const currentAttendees = currentClassData?.attendees || [];
    const campaignName = campaignSelect.options[campaignSelect.selectedIndex]?.text || currentCampaign;
    const className = currentClassData?.name || currentClassId;


    // Calculate Attendance for *this* day
    let absences = 0;
    let lates = 0;
    let terminated = 0;
    let attendanceTaskFound = false;
    let quizTaskFound = false;
    let quizPassingScoreCount = 0;
    let totalAttendees = 0;
    const attendanceTaskDef = (mockTasks[currentCampaign]?.[currentStage]?.[currentDay] || []).find(t => t.type === 'attendance');
    const quizTaskDef = (mockTasks[currentCampaign]?.[currentStage]?.[currentDay] || []).find(t => t.type === 'quiz');
    if (attendanceTaskDef) {
        attendanceTaskFound = true;
        const attendanceTaskIdFull = `${currentStage}_${currentDay}_${attendanceTaskDef.id}`;
        currentAttendees.forEach(attendee => {
            const attendeeIdFull = `${attendanceTaskIdFull}_${attendee.id}`;
            const status = taskStatus[attendeeIdFull]?.attendance;
            if (status === 'P') {

                totalAttendees++;
            }
            if (status === 'A') {
                absences++;

                totalAttendees++;
            }
            if (status === 'L') {
                lates++;

                totalAttendees++;
            }
            if (status === 'T') {
                terminated++;

            }
        });
    }
    if (quizTaskDef) {
        quizTaskFound = true;
        const quizTaskIdFull = `${currentStage}_${currentDay}_${quizTaskDef.id}`;
        currentAttendees.forEach(attendee => {
            const quizScoreIdFull = `${quizTaskIdFull}_${attendee.id}`;
            const score = taskStatus[quizScoreIdFull]?.quizScore;
            if (score >= 85) {
                quizPassingScoreCount++;
            }
        });
    }


    // Get Completed Topics Covered
    const tasksForDay = mockTasks[currentCampaign]?.[currentStage]?.[currentDay] || [];
    let completedTopics = "";
    let pendingTopics = "";
    let pendingTopicsCont = 0;
    let totalTopicsCont = 0;
    tasksForDay.forEach(task => {
        const taskIdFull = `${currentStage}_${currentDay}_${task.id}`;
        if (task.type === 'attendance') {
            return
        }
        if (task.isParent) {

            if (task.children && Array.isArray(task.children)) {
                let childTaskTempText = "";
                let childCompletedCont = 0;
                task.children.forEach(childTask => {
                    const childTaskIdFull = `${currentStage}_${currentDay}_${task.id}_${childTask.id}`
                    totalTopicsCont++;
                    if (taskStatus[childTaskIdFull]?.completed === true) {
                        childCompletedCont++;
                        if (taskStatus[childTaskIdFull]?.observation !== "") {
                            childTaskTempText += `- ${childTask.text}: ${taskStatus[childTaskIdFull]?.observation}\n`

                        }
                        if (taskStatus[childTaskIdFull]?.observation === "") {
                            childTaskTempText += `- ${childTask.text}.\n`
                        }
                    }
                })
                if (childCompletedCont != 0) {
                    completedTopics += `${task.text}:\n${childTaskTempText}`
                }
            }
        } else {
            totalTopicsCont++;
            if (taskStatus[taskIdFull]?.completed === true) {

                if (taskStatus[taskIdFull]?.observation !== "") {
                    completedTopics += `${task.text}: ${taskStatus[taskIdFull]?.observation}.\n`;
                    return
                }
                completedTopics += `${task.text}.\n`;
            }
        }
    })
    tasksForDay.forEach(task => {
        const taskIdFull = `${currentStage}_${currentDay}_${task.id}`;
        if (task.type === 'attendance') {
            return
        }
        if (task.isParent) {
            if (task.children && Array.isArray(task.children)) {
                let childTaskTempText = "";
                let childNotCompletedCont = 0;
                task.children.forEach(childTask => {
                    const childTaskIdFull = `${currentStage}_${currentDay}_${task.id}_${childTask.id}`
                    if (taskStatus[childTaskIdFull]?.completed !== true) {
                        pendingTopicsCont++;
                        childNotCompletedCont++;
                        if (taskStatus[childTaskIdFull]?.observation !== "") {
                            childTaskTempText += `- ${childTask.text}: ${taskStatus[childTaskIdFull]?.observation || ''}\n`

                        }
                        if (taskStatus[childTaskIdFull]?.observation === "") {
                            childTaskTempText += `- ${childTask.text}.\n`
                        }
                    }
                })
                if (childNotCompletedCont != 0) {
                    pendingTopics += `${task.text}:\n${childTaskTempText}`
                }
            }
        } else {
            if (taskStatus[taskIdFull]?.completed === false) {
                pendingTopicsCont++;

                if (taskStatus[taskIdFull]?.observation !== "") {
                    pendingTopics += `${task.text}: ${taskStatus[taskIdFull]?.observation}.\n`;
                    return
                }
                pendingTopics += `${task.text}.\n`;
            }
        }
    })
    if (pendingTopicsCont == 0) {
        pendingTopics = "No pending items.";
    }

    // Get Pending Items/Takeaways (Incomplete tasks from *this* day)



    // --- 2. Pre-fill Modal ---
    reportModalDay.textContent = currentDay;
    reportModalClass.textContent = className;
    reportModalStage.textContent = currentStage;

    // Class Info (Load from class data if stored, otherwise leave blank/default)
    // TODO: Implement storing/loading Initial HC if needed in class data
    reportInitialHc.value = currentClassData?.initialHC; // Assuming initialHc is stored on class object
    reportCurrentHc.value = currentAttendees.length - terminated;
    reportFinalHc.value = ''; // Usually not known daily
    reportOverallAttrition.value = (1 - ((currentAttendees.length - terminated) / currentClassData?.initialHC)) * 100; // Needs calculation or separate storage

    // Attendance
    reportAbsences.textContent = absences;
    reportLateness.textContent = lates;
    reportEwsRed.max = currentAttendees.length - terminated;
    reportEwsYellow.max = currentAttendees.length - terminated;
    // Daily Info
    reportTopicsTextarea.value = completedTopics; // Pre-fill, user can edit
    reportHighlightsTextarea.value = ''; // Reset daily input

    // Daily Callouts - Reset all inputs/selects
    for (const key in calloutInputs) {
        calloutInputs[key].impact.value = '';
        calloutInputs[key].remarks.value = '';
    }
    // Pre-fill attendance callout remarks if data available
    if (quizTaskFound) {
        if (quizPassingScoreCount / totalAttendees >= 0.75) {
            calloutInputs.performance.impact.value = "Low";
        }
        if (quizPassingScoreCount / totalAttendees > 0.5 && quizPassingScoreCount / totalAttendees < 0.75) {
            calloutInputs.performance.impact.value = "Medium";
        }
        if (quizPassingScoreCount / totalAttendees <= 0.5) {
            calloutInputs.performance.impact.value = "High";
        }
        calloutInputs.performance.remarks.value = `${Math.floor((quizPassingScoreCount / totalAttendees) * 100)}% of the active GCs passed today's quiz/assesment.`
    }
    if (attendanceTaskFound) {
        calloutInputs.attendance.remarks.value = `${absences} Absence(s), ${lates} Late.`;
    }
    if (absences <= 1 && lates < 2) {
        calloutInputs.attendance.impact.value = "Low";
    }
    if (absences > 1 || lates > 2) {
        calloutInputs.attendance.impact.value = "Medium";
    }
    if (absences > 4 || lates > 6) {
        calloutInputs.attendance.impact.value = "High";
    }
    calloutInputs.agenda.remarks.value = `${pendingTopicsCont} pending activities out of ${totalTopicsCont}.`
    if (pendingTopicsCont / totalTopicsCont < 0.15) {
        calloutInputs.agenda.impact.value = "Low";
    }
    if (pendingTopicsCont / totalTopicsCont < 0.45 && pendingTopicsCont / totalTopicsCont > 0.15) {
        calloutInputs.agenda.impact.value = "Medium";
    }
    if (pendingTopicsCont / totalTopicsCont > 0.45) {
        calloutInputs.agenda.impact.value = "High";
    }

    // Actions
    reportPendingTextarea.value = pendingTopics; // Pre-fill, user can edit
    reportActionsTextarea.value = ''; // Reset daily input


    // --- 3. Show Modal ---
    modalBackdrop.style.display = 'block';
    reportModal.style.display = 'block';
}



function downloadAsFile(filename, content, mimeType = 'text/plain') {
    const element = document.createElement('a');
    element.setAttribute('href', `data:${mimeType};charset=utf-8,` + encodeURIComponent(content));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click(); // Simulate click to trigger download

    document.body.removeChild(element); // Clean up
}

function handleSaveReportData() {
    console.log("Saving report data...");

    // --- 1. Collect Data from Modal ---
    const reportData = {
        // Header Info (already known, but capture snapshot)
        reportDate: new Date().toLocaleDateString('en-CA'), // YYYY-MM-DD
        campaign: campaignSelect.options[campaignSelect.selectedIndex]?.text,
        classId: currentClassId,
        className: classes[currentCampaign]?.find(cls => cls.id === currentClassId)?.name || currentClassId,
        cctStart: classes[currentCampaign]?.find(cls => cls.id === currentClassId)?.dates.cctStart || currentClassId,
        pstStart: classes[currentCampaign]?.find(cls => cls.id === currentClassId)?.dates.pstStart || currentClassId,
        nestingStart: classes[currentCampaign]?.find(cls => cls.id === currentClassId)?.dates.nestingStart || currentClassId,
        cctEnd: classes[currentCampaign]?.find(cls => cls.id === currentClassId)?.dates.cctEnd || currentClassId,
        pstEnd: classes[currentCampaign]?.find(cls => cls.id === currentClassId)?.dates.pstEnd || currentClassId,
        nestingEnd: classes[currentCampaign]?.find(cls => cls.id === currentClassId)?.dates.nestingEnd || currentClassId,
        stage: currentStage,
        day: currentDay,
        batchNumber: currentClassId, // Using class ID as batch number for now

        // Overall Class Info (from modal)
        initialHc: reportInitialHc.value ? parseInt(reportInitialHc.value, 10) : null,
        currentHc: parseInt(reportCurrentHc.value, 10), // Known value
        finalHc: reportFinalHc.value ? parseInt(reportFinalHc.value, 10) : null,
        overallAttrition: reportOverallAttrition.value,

        // Daily Attendance (from modal)
        dailyAbsences: parseInt(reportAbsences.textContent, 10), // Get from display span
        dailyLateness: parseInt(reportLateness.textContent, 10), // Get from display span
        ewsYellowCount: reportEwsYellow.value,
        ewsRedCount: reportEwsRed.value,

        // Daily Info (from modal)
        topicsCovered: reportTopicsTextarea.value,
        highlights: reportHighlightsTextarea.value,

        // Daily Callouts (from modal)
        callouts: {}, // Store as nested object

        // Actions (from modal)
        pendingItems: reportPendingTextarea.value,
        actionsTaken: reportActionsTextarea.value,

        // Raw task status data for reference (optional)
        // taskStatusSnapshot: JSON.parse(JSON.stringify(taskStatus)) // Deep copy
    };

    // Populate callouts object
    for (const key in calloutInputs) {
        if (calloutInputs[key].impact.value === "Low") {
            console.log("es low");
            reportData.callouts[key] = {
                impact: calloutInputs[key].impact.value,
                remarks: calloutInputs[key].remarks.value,
                bgColor: 'background:#00B050;'
            };
        }
        if (calloutInputs[key].impact.value === "Medium") {
            console.log("es mid");
            reportData.callouts[key] = {
                impact: calloutInputs[key].impact.value,
                remarks: calloutInputs[key].remarks.value,
                bgColor: 'background:#FFD966;'
            };
        }
        if (calloutInputs[key].impact.value === "High") {
            console.log("es hi");
            reportData.callouts[key] = {
                impact: calloutInputs[key].impact.value,
                remarks: calloutInputs[key].remarks.value,
                bgColor: 'background:#C00000;'
            };
        }
    }

    // --- 2. Process/Store Data ---
    console.log("Collected Report Data:", reportData);

    // Option A: Log to console (as done currently)
    // Option B: Store in localStorage (e.g., keyed by day)
    try {
        let dailyReports = JSON.parse(localStorage.getItem('dailyReports') || '{}');
        // Structure: dailyReports[campaignId][classId][stage][day] = reportData
        if (!dailyReports[currentCampaign]) dailyReports[currentCampaign] = {};
        if (!dailyReports[currentCampaign][currentClassId]) dailyReports[currentCampaign][currentClassId] = {};
        if (!dailyReports[currentCampaign][currentClassId][currentStage]) dailyReports[currentCampaign][currentClassId][currentStage] = {};
        dailyReports[currentCampaign][currentClassId][currentStage][currentDay] = reportData;
        localStorage.setItem('dailyReports', JSON.stringify(dailyReports));
        console.log("Report data saved to localStorage.");

        const formattedReportHTML = formatReportForExport(reportData);
        const formattedReportText = formattedReportHTML.replace(/<[^>]*>/g, '\n').replace(/\n\s*\n/g, '\n').trim();
        reportExportTextarea.value = formattedReportHTML;

        const filename = `Report_${reportData.campaign}_${reportData.classId}_${reportData.stage}_Day${reportData.day}_${reportData.reportDate}.html`; // Change extension
        const newDownloadBtn = downloadReportButton.cloneNode(true);
        downloadReportButton.parentNode.replaceChild(newDownloadBtn, downloadReportButton);
        newDownloadBtn.addEventListener('click', () => {
            downloadAsFile(filename, formattedReportHTML, 'text/html'); // Specify HTML mime type
        });
        const newCopyBtn = copyReportButton.cloneNode(true);
        copyReportButton.parentNode.replaceChild(newCopyBtn, copyReportButton);
        newCopyBtn.addEventListener('click', () => handleCopyReport(formattedReportHTML, formattedReportText));
        reportExportArea.style.display = 'block';
        displayMessage(`Report data for Day ${currentDay} saved successfully.`);
    } catch (e) {
        console.error("Error saving or preparing report data for export:", e);
        displayMessage("Error saving report data. Please fill all the necessary information.", true);
        reportExportArea.style.display = 'none';
    }

    // Option C: Display formatted data (more complex)
    // Option D: Prepare for potential future backend submission

    // --- 3. Hide Modal ---
    hideReportModal();
}

async function handleCopyReport(htmlContent, textContent) {
    try {
        // Create a Blob with HTML content for the clipboard API
        const blobHtml = new Blob([htmlContent], { type: 'text/html' });
        // Create a Blob with plain text content as fallback
        const blobText = new Blob([textContent], { type: 'text/plain' });

        // Create a ClipboardItem with both types
        const clipboardItem = new ClipboardItem({
            'text/html': blobHtml,
            'text/plain': blobText,
        });

        // Write the item to the clipboard
        await navigator.clipboard.write([clipboardItem]);

        displayMessage('Report HTML copied to clipboard!');
        console.log('Report HTML copied.');

    } catch (err) {
        console.error('Failed to copy HTML using ClipboardItem, attempting plain text fallback: ', err);
        // Fallback to copying plain text if HTML fails or API is not fully supported
        try {
            await navigator.clipboard.writeText(textContent);
            displayMessage('Report copied as plain text!');
            console.log('Report plain text copied.');
        } catch (fallbackErr) {
            console.error('Failed to copy plain text: ', fallbackErr);
            displayMessage('Failed to copy report text.', true);
            // Optional: Show the textarea for manual copy as final fallback
            // reportExportTextarea.value = textContent; // Show plain text
            // reportExportTextarea.style.display = 'block';
            // reportExportTextarea.select();
            // reportExportTextarea.setSelectionRange(0, 99999);
        }
    }
}

function hideReportModal() {
    modalBackdrop.style.display = 'none';
    reportModal.style.display = 'none';
}

function goToNextDay() {
    // Double check: Ensure we don't advance if already at max days or button is disabled
    if (nextDayButton.disabled || checkIfMaxDayReached()) {
        console.log("No se puede avanzar al siguiente día (límite alcanzado o tareas incompletas).");
        return;
    }

    currentDay++;
    updateDayDisplay();
    renderChecklist(); // Render checklist for the new day
    saveState();
}

function goToPrevDay() {
    if (currentDay > 1) {
        currentDay--;
        updateDayDisplay();
        renderChecklist(); // Renderiza checklist para el día anterior
        saveState();
    }
}

// --- Inicialización ---
function initApp() {
    loadState(); // Load state (includes campaign, stage, classId, classes)
    setCurrentDate();

    // Setup Listeners
    campaignSelect.addEventListener('change', handleCampaignChange);
    classSelect.addEventListener('change', handleClassChange); // New listener
    stageSelect.addEventListener('change', handleStageChange);
    logoutButton.addEventListener('click', handleLogout);
    generateReportButton.addEventListener('click', handleGenerateReport);
    generateAttendanceButton.addEventListener('click', handleGenerateAttendance);
    nextDayButton.addEventListener('click', goToNextDay);
    prevDayButton.addEventListener('click', goToPrevDay);

    saveNewClassButton.addEventListener('click', handleSaveNewClass);
    cancelNewClassButton.addEventListener('click', hideNewClassModal);
    newClassModal.querySelector('.close-modal-btn').addEventListener('click', hideNewClassModal); // Use querySelector specific to modal
    modalBackdrop.addEventListener('click', () => { // Shared backdrop hide logic
        hideNewClassModal();
        hideReportModal();
    });

    // Modal Listeners
    saveReportButton.addEventListener('click', handleSaveReportData);
    cancelReportButton.addEventListener('click', hideReportModal);
    reportModalCloseBtn.addEventListener('click', hideReportModal);// Close on backdrop click
    cctStartDateInput.addEventListener('input', handleStageStartDateChange);
    pstStartDateInput.addEventListener('input', handleStageStartDateChange);
    nestingStartDateInput.addEventListener('input', handleStageStartDateChange);

    // Load Task Definitions (Async)
    loadTaskData(); // This calls initializeAppLogic when done
}

function initializeAppLogic() {
    if (!tasksLoaded) return;

    console.log("Initializing app logic after tasks loaded.");
    populateClassDropdown(); // Populate based on loaded campaign and classes
    // renderChecklist() will be called by populateClassDropdown via handleClassChange if a class is selected
    // Ensure initial state is checked if a class was automatically selected
    if (currentClassId) {
        renderChecklist();
    } else {
        disableChecklistControls(true);
        checklistDiv.innerHTML = '<p>Please select or create a class to begin.</p>';
    }
}

function handleCampaignChange() {
    if (!tasksLoaded) return; // Don't react if tasks definitions aren't ready
    currentCampaign = campaignSelect.value;
    // Reset class, stage, day when campaign changes? UX Decision. Let's reset class.
    currentClassId = null;
    currentDay = 1; // Reset day
    stageSelect.value = 'CCT'; // Reset stage
    currentStage = stageSelect.value;

    console.log(`Campaign changed to: ${currentCampaign}`);
    populateClassDropdown(); // This will update class selection and trigger render if needed
    saveState();
}

function handleClassChange() {
    if (!tasksLoaded) return;
    const selectedValue = classSelect.value;
    if (selectedValue === NEW_CLASS_VALUE) {
        // Show modal to create new class
        showNewClassModal();
        currentClassId = null; // No class selected while modal is open
    } else {
        // Existing class selected
        currentClassId = selectedValue;
        console.log(`Class changed to: ${currentClassId}`);
        // Reset day/stage when changing class? UX Decision. Let's reset day.
        currentDay = 1;
        stageSelect.value = 'CCT'; // Reset stage
        currentStage = stageSelect.value;
    }
    updateDayDisplay();
    renderChecklist(); // Re-render based on new class (or lack thereof)
    saveState(); // Save the newly selected class ID
}

function handleStageChange() {
    if (!tasksLoaded || !currentClassId) return; // Need tasks and a class
    currentStage = stageSelect.value;
    // Reset day when changing stage? UX Decision. Let's reset day.
    currentDay = 1;
    console.log(`Stage changed to: ${currentStage}`);
    updateDayDisplay();
    renderChecklist(); // Re-render tasks for new stage
    saveState();
}
document.addEventListener('DOMContentLoaded', initApp);