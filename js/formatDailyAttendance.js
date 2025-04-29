function formatDataForAttendance(reportData, date) {
    let output = ``;
    output += `<html>
    <body>
    <table style="width:314pt; box-sizing:border-box; border-collapse:collapse; border-spacing:0px"
    class="x_elementToProof">
    <tbody>
    <tr>
            <td style="width:84pt; height:38.25pt; text-align:center; white-space:nowrap; border-top:0.5pt solid rgb(217,217,217); border-bottom:0.5pt solid rgb(217,217,217); padding-top:1px; padding-right:1px; padding-left:1px; vertical-align:middle"
                class="x_elementToProof">
                <div style="text-align:center; white-space:nowrap; font-family:Aptos,Aptos_EmbeddedFont,Aptos_MSFontService,Calibri,Helvetica,sans-serif; font-size:12pt; color:rgb(0,0,0)"
                    class="x_elementToProof"><span style="font-weight:700">Employee ID</span></div>
            </td>
            <td style="width:183pt; height:54px; text-align:center; white-space:nowrap; border-top:0.5pt solid rgb(217,217,217); border-bottom:0.5pt solid rgb(217,217,217); padding-top:1px; padding-right:1px; padding-left:1px; vertical-align:middle"
                class="x_elementToProof">
                <div style="text-align:center; white-space:nowrap; font-family:Aptos,Aptos_EmbeddedFont,Aptos_MSFontService,Calibri,Helvetica,sans-serif; font-size:12pt; color:rgb(0,0,0)"
                    class="x_elementToProof"><span style="font-weight:700">Employee Full Name</span></div>
            </td>
            <td style="width:47pt; height:54px; text-align:center; white-space:nowrap; border-bottom:1pt solid rgb(217,217,217); background-color:white; padding-top:1px; padding-right:1px; padding-left:1px; vertical-align:middle"
                class="x_elementToProof">
                <div style="text-align:center; white-space:nowrap; font-family:Aptos,Aptos_EmbeddedFont,Aptos_MSFontService,Calibri,Helvetica,sans-serif; font-size:12pt; color:rgb(0,0,0)"
                    class="x_elementToProof"><span style="font-weight:700">${date}</span></div>
            </td>
        </tr>`;
    reportData.forEach(attendee => {
        output += `<tr>
            <td style="width:112px; height:16.5pt; text-align:center; white-space:nowrap; border-top:1pt solid rgb(217,217,217); border-bottom:0.5pt solid rgb(217,217,217); background-color:white; padding-top:1px; padding-right:1px; padding-left:9px; vertical-align:middle"
                class="x_elementToProof">
                <div style="text-align:center; white-space:nowrap; font-family:Aptos,Aptos_EmbeddedFont,Aptos_MSFontService,Calibri,Helvetica,sans-serif; font-size:12pt; color:rgb(0,0,0)"
                    class="x_elementToProof">${attendee.id}</div>
            </td>
            <td style="width:244px; height:25px; text-align:center; white-space:nowrap; border-top:1pt solid rgb(217,217,217); border-bottom:0.5pt solid rgb(217,217,217); background-color:white; padding-top:1px; padding-right:1px; padding-left:9px; vertical-align:middle"
                class="x_elementToProof">
                <div style="text-align:center; white-space:nowrap; font-family:Aptos,Aptos_EmbeddedFont,Aptos_MSFontService,Calibri,Helvetica,sans-serif; font-size:12pt; color:rgb(0,0,0)"
                    class="x_elementToProof">${attendee.name}</div>
            </td>
            <td style="width:62.667px; height:25px; text-align:center; white-space:nowrap; border-top:1pt solid rgb(217,217,217); border-bottom:0.5pt solid rgb(217,217,217); background-color:${attendee.statusColor} padding-top:1px; padding-right:1px; padding-left:1px; vertical-align:middle"
                class="x_elementToProof">
                <div style="text-align:center; white-space:nowrap; font-family:Aptos,Aptos_EmbeddedFont,Aptos_MSFontService,Calibri,Helvetica,sans-serif; font-size:12pt; color:rgb(0,0,0)"
                    class="x_elementToProof"><span style="font-weight:700">${attendee.status}</span></div>
            </td>
        </tr>`;
    });
    output += `</tbody>
</table>
</body>
</html>`;
    return output;
}

export {formatDataForAttendance};