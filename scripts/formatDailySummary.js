function formatReportForExport(reportData) {
    // Basic inline styles for compatibility - avoid complex CSS
    const tableStyle = `style="border-collapse: collapse; width: 100%; margin-bottom: 15px;"`;
    const thStyle = `style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2; font-size: 0.9em;"`;
    const tdStyle = `style="border: 1px solid #ddd; padding: 8px; font-size: 0.9em;"`;
    const sectionHeaderStyle = `style="color: #16162D; margin-top: 20px; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px;"`;
    const strongStyle = `style="font-weight: bold;"`;
    let output = `<html>
    <body>
        <table style="width:648.05pt; margin-left:41.25pt; border-collapse:collapse" width="864" cellpadding="0" cellspacing="0"
    border="0" class="x_MsoNormalTable">
    <tbody>
        <tr style="height:6.75pt">
            <td style="width:42.7pt; background:black; padding:.75pt 5.4pt .75pt 5.4pt; height:6.75pt" nowrap=""
                width="57">
                <p style="text-align:center" align="center" class="x_MsoNormal"><span
                        style="font-size:11.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">#SPILL!</span>
                </p>
            </td>
            <td style="width:594.25pt; background:#222B35; padding:.75pt 5.4pt .75pt 5.4pt; height:6.75pt" colspan="7"
                nowrap="" width="792"></td>
            <td style="width:11.1pt; background:black; padding:.75pt 5.4pt .75pt 5.4pt; height:6.75pt" nowrap=""
                width="15"></td>
        </tr>
        <tr style="height:15.0pt">
            <td style="width:42.7pt; background:black; padding:.75pt 5.4pt .75pt 5.4pt; height:15.0pt" nowrap=""
                width="57"></td>
            <td style="width:594.25pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.0pt" colspan="7" nowrap=""
                width="792">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:11.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">OVERALL
                            STATUS</span></b></p>
            </td>
            <td style="width:11.1pt; background:black; padding:.75pt 5.4pt .75pt 5.4pt; height:15.0pt" nowrap=""
                width="15"></td>
        </tr>
        <tr style="height:4.5pt">
            <td style="width:42.7pt; background:#222B35; padding:.75pt 5.4pt .75pt 5.4pt; height:4.5pt" rowspan="29"
                nowrap="" width="57"></td>
            <td style="width:594.25pt; border:none; border-bottom:solid #BFBFBF 1.0pt; background:#222B35; padding:.75pt 5.4pt .75pt 5.4pt; height:4.5pt"
                colspan="7" nowrap="" width="792"></td>
            <td style="width:11.1pt; background:#222B35; padding:.75pt 5.4pt .75pt 5.4pt; height:4.5pt" rowspan="29"
                nowrap="" width="15"></td>
        </tr>
        <tr style="height:15.0pt">
            <td style="width:93.3pt; border:solid #BFBFBF 1.0pt; border-top:none; background:#44546A; padding:.75pt 5.4pt .75pt 5.4pt; height:15.0pt"
                nowrap="" width="124">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:11.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:white">Batch
                            Number</span></b></p>
            </td>
            <td style="width:157.65pt; border:solid #BFBFBF 1.0pt; border-left:none; padding:.75pt 5.4pt .75pt 5.4pt; height:15.0pt"
                nowrap="" width="210">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:10.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">${reportData.className}</span></b>
                </p>
            </td>
            <td style="width:343.3pt; border-top:solid #BFBFBF 1.0pt; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:none; background:#44546A; padding:.75pt 5.4pt .75pt 5.4pt; height:15.0pt"
                colspan="5" nowrap="" width="458">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:11.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:white">Training
                            Room</span></b></p>
            </td>
        </tr>
        <tr style="height:15.0pt">
            <td style="width:93.3pt; border:solid #BFBFBF 1.0pt; border-top:none; background:#44546A; padding:.75pt 5.4pt .75pt 5.4pt; height:15.0pt"
                nowrap="" width="124">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:11.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:white">Date</span></b>
                </p>
            </td>
            <td style="width:157.65pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.0pt"
                nowrap="" width="210">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:10.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">${reportData.reportDate}</span></b></p>
            </td>
            <td style="width:343.3pt; border:none; border-bottom:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.0pt"
                colspan="5" nowrap="" width="458">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:10.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">CLASSROOM
                            TRAINING</span></b></p>
            </td>
        </tr>
        <tr style="height:9.75pt">
            <td style="width:594.25pt; border-top:none; border-left:solid #BFBFBF 1.0pt; border-bottom:solid #BFBFBF 1.0pt; border-right:none; background:#222B35; padding:.75pt 5.4pt .75pt 5.4pt; height:9.75pt"
                colspan="7" nowrap="" width="792"></td>
        </tr>
        <tr style="height:15.0pt">
            <td style="width:250.95pt; border-top:none; border-left:solid #BFBFBF 1.0pt; border-bottom:solid #BFBFBF 1.0pt; border-right:none; background:#F2F2F2; padding:.75pt 5.4pt .75pt 5.4pt; height:15.0pt"
                colspan="2" nowrap="" width="335"></td>
            <td style="width:63.5pt; border:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.0pt"
                nowrap="" width="85">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:10.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">Start
                            Date</span></b></p>
            </td>
            <td style="width:63.5pt; border:solid #BFBFBF 1.0pt; border-left:none; background:white; padding:.75pt 5.4pt .75pt 5.4pt; height:15.0pt"
                nowrap="" width="85">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:10.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">End
                            Date</span></b></p>
            </td>
            <td style="width:100.3pt; border:solid #BFBFBF 1.0pt; border-left:none; padding:.75pt 5.4pt .75pt 5.4pt; height:15.0pt"
                nowrap="" width="134">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:10.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">Initial
                            HC</span></b></p>
            </td>
            <td style="width:49.85pt; border:solid #BFBFBF 1.0pt; border-left:none; padding:.75pt 5.4pt .75pt 5.4pt; height:15.0pt"
                nowrap="" width="66">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:10.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">Final
                            HC</span></b></p>
            </td>
            <td style="width:66.15pt; border:solid #BFBFBF 1.0pt; border-left:none; background:#C00000; padding:.75pt 5.4pt .75pt 5.4pt; height:15.0pt"
                nowrap="" width="88">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:10.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:white">Attrition
                            %</span></b></p>
            </td>
        </tr>
        <tr style="height:15.75pt">
            <td style="width:93.3pt; border:solid #BFBFBF 1.0pt; border-top:none; padding:.75pt 5.4pt .75pt 5.4pt; height:15.75pt"
                nowrap="" width="124">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:11.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">TRAINING
                            STAGE</span></b></p>
            </td>
            <td style="width:157.65pt; border:solid #BFBFBF 1.0pt; border-left:none; padding:.75pt 5.4pt .75pt 5.4pt; height:15.75pt"
                nowrap="" width="210">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:10.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">CET</span></b>
                </p>
            </td>
            <td style="width:63.5pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.75pt"
                nowrap="" width="85">
                <p style="text-align:center" align="center" class="x_MsoNormal"><span
                        style="font-size:9.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:#595959">${reportData.cctStart}</span></p>
            </td>
            <td style="width:63.5pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.75pt"
                nowrap="" width="85">
                <p style="text-align:center" align="center" class="x_MsoNormal"><span
                        style="font-size:9.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:#595959">${reportData.cctEnd}</span></p>
            </td>
            <td style="width:100.3pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.75pt"
                nowrap="" width="134">
                <p style="text-align:center" align="center" class="x_MsoNormal"><span
                        style="font-size:9.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">${reportData.initialHc ?? 'N/A'}</span></p>
            </td>
            <td style="width:49.85pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.75pt"
                nowrap="" width="66">
                <p style="text-align:center" align="center" class="x_MsoNormal"><span
                        style="font-size:9.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">20</span></p>
            </td>
            <td style="width:66.15pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.75pt"
                nowrap="" width="88">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-family:&quot;Calibri&quot;,sans-serif; color:black">0.0%</span></b></p>
            </td>
        </tr>
        <tr style="height:15.75pt">
            <td style="width:93.3pt; border:solid #BFBFBF 1.0pt; border-top:none; padding:.75pt 5.4pt .75pt 5.4pt; height:15.75pt"
                nowrap="" width="124"></td>
            <td style="width:157.65pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.75pt"
                nowrap="" width="210">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:10.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">PST</span></b>
                </p>
            </td>
            <td style="width:63.5pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.75pt"
                nowrap="" width="85">
                <p style="text-align:center" align="center" class="x_MsoNormal"><span
                        style="font-size:9.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:#595959">${reportData.pstStart}</span></p>
            </td>
            <td style="width:63.5pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.75pt"
                nowrap="" width="85">
                <p style="text-align:center" align="center" class="x_MsoNormal"><span
                        style="font-size:9.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:#595959">${reportData.pstEnd}</span></p>
            </td>
            <td style="width:100.3pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.75pt"
                nowrap="" width="134">
                <p style="text-align:center" align="center" class="x_MsoNormal"><span
                        style="font-size:9.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">${reportData.initialHc ?? 'N/A'}</span></p>
            </td>
            <td style="width:49.85pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.75pt"
                nowrap="" width="66">
                <p style="text-align:center" align="center" class="x_MsoNormal"><span
                        style="font-size:9.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">xx</span></p>
            </td>
            <td style="width:66.15pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.75pt"
                nowrap="" width="88">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-family:&quot;Calibri&quot;,sans-serif; color:black">-</span></b></p>
            </td>
        </tr>
        <tr style="height:15.75pt">
            <td style="width:93.3pt; border:solid #BFBFBF 1.0pt; border-top:none; padding:.75pt 5.4pt .75pt 5.4pt; height:15.75pt"
                nowrap="" width="124"></td>
            <td style="width:157.65pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.75pt"
                nowrap="" width="210">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:10.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">NST</span></b>
                </p>
            </td>
            <td style="width:63.5pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.75pt"
                nowrap="" width="85">
                <p style="text-align:center" align="center" class="x_MsoNormal"><span
                        style="font-size:9.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:#595959">${reportData.nestingStart}</span></p>
            </td>
            <td style="width:63.5pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.75pt"
                nowrap="" width="85">
                <p style="text-align:center" align="center" class="x_MsoNormal"><span
                        style="font-size:9.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:#595959">${reportData.nestingEnd}</span></p>
            </td>
            <td style="width:100.3pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.75pt"
                nowrap="" width="134">
                <p style="text-align:center" align="center" class="x_MsoNormal"><span
                        style="font-size:9.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">${reportData.initialHc ?? 'N/A'}</span></p>
            </td>
            <td style="width:49.85pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.75pt"
                nowrap="" width="66">
                <p style="text-align:center" align="center" class="x_MsoNormal"><span
                        style="font-size:9.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">XX</span></p>
            </td>
            <td style="width:66.15pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.75pt"
                nowrap="" width="88">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-family:&quot;Calibri&quot;,sans-serif; color:black">-</span></b></p>
            </td>
        </tr>
        <tr style="height:15.75pt">
            <td style="width:93.3pt; border:solid #BFBFBF 1.0pt; border-top:none; padding:.75pt 5.4pt .75pt 5.4pt; height:15.75pt"
                nowrap="" width="124"></td>
            <td style="width:157.65pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.75pt"
                nowrap="" width="210">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:10.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">Production</span></b>
                </p>
            </td>
            <td style="width:63.5pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.75pt"
                nowrap="" width="85">
                <p style="text-align:center" align="center" class="x_MsoNormal"><span
                        style="font-size:9.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:#595959">${reportData.nestingEnd}</span></p>
            </td>
            <td style="width:63.5pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.75pt"
                nowrap="" width="85">
                <p style="text-align:center" align="center" class="x_MsoNormal"></p>
            </td>
            <td style="width:100.3pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.75pt"
                nowrap="" width="134">
                <p style="text-align:center" align="center" class="x_MsoNormal"><span
                        style="font-size:9.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">${reportData.finalHc ?? 'N/A'}</span></p>
            </td>
            <td style="width:49.85pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.75pt"
                nowrap="" width="66"></td>
            <td style="width:66.15pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.75pt"
                nowrap="" width="88">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-family:&quot;Calibri&quot;,sans-serif; color:black">-</span></b></p>
            </td>
        </tr>
        <tr style="height:7.5pt">
            <td style="width:93.3pt; border-top:none; border-left:solid #BFBFBF 1.0pt; border-bottom:solid #BFBFBF 1.0pt; border-right:none; background:#222B35; padding:.75pt 5.4pt .75pt 5.4pt; height:7.5pt"
                nowrap="" width="124"></td>
            <td style="width:157.65pt; border:none; border-bottom:solid #BFBFBF 1.0pt; background:#222B35; padding:.75pt 5.4pt .75pt 5.4pt; height:7.5pt"
                nowrap="" width="210"></td>
            <td style="width:63.5pt; border:none; border-bottom:solid #BFBFBF 1.0pt; background:#222B35; padding:.75pt 5.4pt .75pt 5.4pt; height:7.5pt"
                nowrap="" width="85"></td>
            <td style="width:63.5pt; border:none; border-bottom:solid #BFBFBF 1.0pt; background:#222B35; padding:.75pt 5.4pt .75pt 5.4pt; height:7.5pt"
                nowrap="" width="85"></td>
            <td style="width:100.3pt; border:none; border-bottom:solid #BFBFBF 1.0pt; background:#222B35; padding:.75pt 5.4pt .75pt 5.4pt; height:7.5pt"
                nowrap="" width="134"></td>
            <td style="width:49.85pt; border:none; border-bottom:solid #BFBFBF 1.0pt; background:#222B35; padding:.75pt 5.4pt .75pt 5.4pt; height:7.5pt"
                nowrap="" width="66"></td>
            <td style="width:66.15pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; background:#222B35; padding:.75pt 5.4pt .75pt 5.4pt; height:7.5pt"
                nowrap="" width="88"></td>
        </tr>
        <tr style="height:14.25pt">
            <td style="width:93.3pt; border-top:none; border-left:solid #BFBFBF 1.0pt; border-bottom:none; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:14.25pt"
                rowspan="3" nowrap="" width="124">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:11.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">ATTENDANCE</span></b>
                </p>
            </td>
            <td style="width:157.65pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:14.25pt"
                nowrap="" width="210">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:10.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">Absences</span></b>
                </p>
            </td>
            <td style="width:127.0pt; border:none; border-bottom:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:14.25pt"
                colspan="2" nowrap="" width="169">
                <p style="text-align:center" align="center" class="x_MsoNormal"><span
                        style="font-size:9.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">${reportData.dailyAbsences}</span></p>
            </td>
            <td style="width:100.3pt; border:solid #BFBFBF 1.0pt; border-top:none; padding:.75pt 5.4pt .75pt 5.4pt; height:14.25pt"
                nowrap="" width="134">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:10.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">Lateness</span></b>
                </p>
            </td>
            <td style="width:116.0pt; border:none; border-bottom:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:14.25pt"
                colspan="2" nowrap="" width="155">
                <p style="text-align:center" align="center" class="x_MsoNormal"><span
                        style="font-size:9.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">${reportData.dailyLateness}</span></p>
            </td>
        </tr>
        <tr style="height:15.0pt">
            <td style="width:157.65pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.0pt"
                nowrap="" width="210">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:10.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">Current
                            EWS Status</span></b></p>
            </td>
            <td style="width:63.5pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; background:#FFD966; padding:.75pt 5.4pt .75pt 5.4pt; height:15.0pt"
                nowrap="" width="85">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:9.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">Yellow</span></b>
                </p>
            </td>
            <td style="width:63.5pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.0pt" nowrap="" width="85">
                <p style="text-align:center" align="center" class="x_MsoNormal"><span
                        style="font-size:11.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:#444444">${reportData.ewsYellowCount || 'Not Set'}</span></p>
            </td>
            <td style="width:100.3pt; border:solid #BFBFBF 1.0pt; border-top:none; background:#C00000; padding:.75pt 5.4pt .75pt 5.4pt; height:15.0pt"
                nowrap="" width="134">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:9.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:white">Red</span></b>
                </p>
            </td>
            <td style="width:116.0pt; border:none; border-bottom:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.0pt"
                colspan="2" nowrap="" width="155">
                <p style="text-align:center" align="center" class="x_MsoNormal"><span
                        style="font-size:9.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">${reportData.ewsRedCount || 'Not Set'}</span></p>
            </td>
        </tr>
        <tr style="height:15.75pt">
            <td style="width:157.65pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.75pt"
                nowrap="" width="210">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:10.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">Overall
                            Attrition %</span></b></p>
            </td>
            <td style="width:63.5pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.75pt"
                nowrap="" width="85">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-family:&quot;Calibri&quot;,sans-serif; color:black">${reportData.overallAttrition || 'N/A'}</span></b></p>
            </td>
            <td style="width:163.8pt; border:none; border-bottom:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.75pt"
                colspan="2" nowrap="" width="218">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:10.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">Current
                            Head Count </span></b></p>
            </td>
            <td style="width:116.0pt; border-top:none; border-left:solid #BFBFBF 1.0pt; border-bottom:solid #BFBFBF 1.0pt; border-right:none; padding:.75pt 5.4pt .75pt 5.4pt; height:15.75pt"
                colspan="2" nowrap="" width="155">
                <p style="text-align:center" align="center" class="x_MsoNormal"><span
                        style="font-size:9.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">${reportData.currentHc}</span></p>
            </td>
        </tr>
        <tr style="height:9.0pt">
            <td style="width:93.3pt; border:solid #BFBFBF 1.0pt; border-right:none; background:#222B35; padding:.75pt 5.4pt .75pt 5.4pt; height:9.0pt"
                nowrap="" width="124"></td>
            <td style="width:157.65pt; border:none; border-bottom:solid #BFBFBF 1.0pt; background:#222B35; padding:.75pt 5.4pt .75pt 5.4pt; height:9.0pt"
                nowrap="" width="210"></td>
            <td style="width:63.5pt; border:none; border-bottom:solid #BFBFBF 1.0pt; background:#222B35; padding:.75pt 5.4pt .75pt 5.4pt; height:9.0pt"
                nowrap="" width="85"></td>
            <td style="width:63.5pt; border:none; border-bottom:solid #BFBFBF 1.0pt; background:#222B35; padding:.75pt 5.4pt .75pt 5.4pt; height:9.0pt"
                nowrap="" width="85"></td>
            <td style="width:100.3pt; border:none; border-bottom:solid #BFBFBF 1.0pt; background:#222B35; padding:.75pt 5.4pt .75pt 5.4pt; height:9.0pt"
                nowrap="" width="134"></td>
            <td style="width:49.85pt; border:none; border-bottom:solid #BFBFBF 1.0pt; background:#222B35; padding:.75pt 5.4pt .75pt 5.4pt; height:9.0pt"
                nowrap="" width="66"></td>
            <td style="width:66.15pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; background:#222B35; padding:.75pt 5.4pt .75pt 5.4pt; height:9.0pt"
                nowrap="" width="88"></td>
        </tr>
        <tr style="height:165.75pt">
            <td style="width:93.3pt; border-top:none; border-left:solid #BFBFBF 1.0pt; border-bottom:none; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:165.75pt"
                rowspan="2" nowrap="" width="124">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:11.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">DAILY
                            INFO</span></b></p>
            </td>
            <td style="width:157.65pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:165.75pt"
                nowrap="" width="210">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:10.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">Avtivities Covered</span></b></p>
            </td>
            <td style="width:343.3pt; border:none; border-bottom:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:165.75pt"
                colspan="5" width="458">
                <p  class="x_MsoNormal"><span
                        style="font-size:9.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">${reportData.topicsCovered?.replace(/\n/g, '<br>') || 'None specified'}</span></p>
            </td>
        </tr>
        <tr style="height:15.0pt">
            <td style="width:157.65pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.0pt"
                nowrap="" width="210">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:10.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">Highlights</span></b>
                </p>
            </td>
            <td style="width:343.3pt; border:none; border-bottom:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.0pt"
                colspan="5" width="458">
                <p style="text-align:center" align="center" class="x_MsoNormal"><span
                        style="font-size:9.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">${reportData.highlights?.replace(/\n/g, '<br>') || 'None specified'}</span></p>
            </td>
        </tr>
        <tr style="height:15.0pt">
            <td style="width:93.3pt; border:solid #BFBFBF 1.0pt; border-right:none; background:#222B35; padding:.75pt 5.4pt .75pt 5.4pt; height:15.0pt"
                nowrap="" width="124"></td>
            <td style="width:157.65pt; border:none; border-bottom:solid #BFBFBF 1.0pt; background:#222B35; padding:.75pt 5.4pt .75pt 5.4pt; height:15.0pt"
                nowrap="" width="210"></td>
            <td style="width:63.5pt; border:none; border-bottom:solid #BFBFBF 1.0pt; background:#222B35; padding:.75pt 5.4pt .75pt 5.4pt; height:15.0pt"
                nowrap="" width="85"></td>
            <td style="width:63.5pt; border:none; border-bottom:solid #BFBFBF 1.0pt; background:#222B35; padding:.75pt 5.4pt .75pt 5.4pt; height:15.0pt"
                nowrap="" width="85"></td>
            <td style="width:100.3pt; border:none; border-bottom:solid #BFBFBF 1.0pt; background:#222B35; padding:.75pt 5.4pt .75pt 5.4pt; height:15.0pt"
                nowrap="" width="134"></td>
            <td style="width:49.85pt; border:none; border-bottom:solid #BFBFBF 1.0pt; background:#222B35; padding:.75pt 5.4pt .75pt 5.4pt; height:15.0pt"
                nowrap="" width="66"></td>
            <td style="width:66.15pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; background:#222B35; padding:.75pt 5.4pt .75pt 5.4pt; height:15.0pt"
                nowrap="" width="88"></td>
        </tr>
        <tr style="height:14.25pt">
            <td style="width:93.3pt; border:solid #BFBFBF 1.0pt; border-top:none; background:#F2F2F2; padding:.75pt 5.4pt .75pt 5.4pt; height:14.25pt"
                nowrap="" width="124"></td>
            <td style="width:157.65pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; background:#F2F2F2; padding:.75pt 5.4pt .75pt 5.4pt; height:14.25pt"
                nowrap="" width="210"></td>
            <td style="width:63.5pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:14.25pt"
                nowrap="" width="85">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:9.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">Impact</span></b>
                </p>
            </td>
            <td style="width:279.8pt; border:none; border-bottom:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:14.25pt"
                colspan="4" nowrap="" width="373">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:9.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">Remarks</span></b>
                </p>
            </td>
        </tr>
        <tr style="height:15.0pt">
            <td style="width:93.3pt; border-top:none; border-left:solid #BFBFBF 1.0pt; border-bottom:none; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.0pt"
                rowspan="7" nowrap="" width="124">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:11.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">DAILY
                            CALLOUTS</span></b></p>
            </td>
            <td style="width:157.65pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.0pt"
                nowrap="" width="210">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:10.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">Facilities</span></b>
                </p>
            </td>
            <td style="width:63.5pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; ${reportData.callouts["facilities"].bgColor || 'background:#FFFFFF;'} padding:.75pt 5.4pt .75pt 5.4pt; height:15.0pt"
                nowrap="" width="85">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:9.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">${reportData.callouts["facilities"].impact || 'Not Set'}</span></b>
                </p>
            </td>
            <td style="width:279.8pt; border:none; border-bottom:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.0pt"
                colspan="4" width="373">
                <p style="text-align:center" align="center" class="x_MsoNormal"><span
                        style="font-size:9.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">${reportData.callouts["facilities"].remarks || 'N/A'}</span></p>
            </td>
        </tr>
        <tr style="height:56.25pt">
            <td style="width:157.65pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:56.25pt"
                nowrap="" width="210">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:10.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">Equipment
                            / Accesses</span></b></p>
            </td>
            <td style="width:63.5pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; ${reportData.callouts["equipment"].bgColor || 'background:#FFFFFF;'} padding:.75pt 5.4pt .75pt 5.4pt; height:56.25pt"
                nowrap="" width="85">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:9.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">${reportData.callouts["equipment"].impact || 'Not Set'}</span></b>
                </p>
            </td>
            <td style="width:279.8pt; border:none; border-bottom:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:56.25pt"
                colspan="4" width="373">
                <p style="text-align:center" align="center" class="x_MsoNormal"><span
                        style="font-size:9.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">${reportData.callouts["equipment"].remarks || 'N/A'}</span></p>
            </td>
        </tr>
        <tr style="height:95.25pt">
            <td style="width:157.65pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:95.25pt"
                nowrap="" width="210">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:10.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">Performance</span></b>
                </p>
            </td>
            <td style="width:63.5pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; ${reportData.callouts["performance"].bgColor || 'background:#FFFFFF;'} padding:.75pt 5.4pt .75pt 5.4pt; height:95.25pt"
                nowrap="" width="85">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:9.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">${reportData.callouts["performance"].impact || 'Not Set'}</span></b>
                </p>
            </td>
            <td style="width:279.8pt; border:none; border-bottom:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:95.25pt"
                colspan="4" width="373">
                <p style="text-align:center" align="center" class="x_MsoNormal"><span
                        style="font-size:9.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">${reportData.callouts["performance"].remarks || 'N/A'}</span></p>
            </td>
        </tr>
        <tr style="height:42.0pt">
            <td style="width:157.65pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:42.0pt"
                nowrap="" width="210">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:10.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">People
                            Engagement</span></b></p>
            </td>
            <td style="width:63.5pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; ${reportData.callouts["engagement"].bgColor || 'background:#FFFFFF;'} padding:.75pt 5.4pt .75pt 5.4pt; height:42.0pt"
                nowrap="" width="85">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:9.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">${reportData.callouts["engagement"].impact || 'Not Set'}</span></b>
                </p>
            </td>
            <td style="width:279.8pt; border:none; border-bottom:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:42.0pt"
                colspan="4" width="373">
                <p style="text-align:center" align="center" class="x_MsoNormal"><span
                        style="font-size:9.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">${reportData.callouts["engagement"].remarks || 'N/A'}</span></p>
            </td>
        </tr>
        <tr style="height:15.0pt">
            <td style="width:157.65pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.0pt"
                nowrap="" width="210">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:10.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">Agenda
                            Adherence</span></b></p>
            </td>
            <td style="width:63.5pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; ${reportData.callouts["agenda"].bgColor || 'background:#FFFFFF;'} padding:.75pt 5.4pt .75pt 5.4pt; height:15.0pt"
                nowrap="" width="85">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:9.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">${reportData.callouts["agenda"].impact || 'Not Set'}</span></b>
                </p>
            </td>
            <td style="width:279.8pt; border:none; border-bottom:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.0pt"
                colspan="4" width="373">
                <p style="text-align:center" align="center" class="x_MsoNormal"><span
                        style="font-size:9.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">${reportData.callouts["agenda"].remarks || 'N/A'}</span></p>
            </td>
        </tr>
        <tr style="height:40.5pt">
            <td style="width:157.65pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:40.5pt"
                nowrap="" width="210">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:10.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">Attendance</span></b>
                </p>
            </td>
            <td style="width:63.5pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; ${reportData.callouts["attendance"].bgColor || 'background:#FFFFFF;'} padding:.75pt 5.4pt .75pt 5.4pt; height:40.5pt"
                nowrap="" width="85">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:9.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">${reportData.callouts["attendance"].impact || 'Not Set'}</span></b>
                </p>
            </td>
            <td style="width:279.8pt; border:none; border-bottom:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:40.5pt"
                colspan="4" width="373">
                <p style="text-align:center" align="center" class="x_MsoNormal"><span
                        style="font-size:9.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">${reportData.callouts["attendance"].remarks || 'N/A'}</span></p>
            </td>
        </tr>
        <tr style="height:15.0pt">
            <td style="width:157.65pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.0pt"
                nowrap="" width="210">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:10.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">Attrition</span></b>
                </p>
            </td>
            <td style="width:63.5pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; ${reportData.callouts["attrition"].bgColor || 'background:#FFFFFF;'} padding:.75pt 5.4pt .75pt 5.4pt; height:15.0pt"
                nowrap="" width="85">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:9.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">${reportData.callouts["attrition"].impact || 'Not Set'}</span></b>
                </p>
            </td>
            <td style="width:279.8pt; border:none; border-bottom:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:15.0pt"
                colspan="4" width="373">
                <p style="text-align:center" align="center" class="x_MsoNormal"><span
                        style="font-size:9.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">${reportData.callouts["attrition"].remarks || 'N/A'}</span></p>
            </td>
        </tr>
        <tr style="height:9.75pt">
            <td style="width:93.3pt; border:solid #BFBFBF 1.0pt; border-right:none; background:#222B35; padding:.75pt 5.4pt .75pt 5.4pt; height:9.75pt"
                nowrap="" width="124"></td>
            <td style="width:157.65pt; border:none; border-bottom:solid #BFBFBF 1.0pt; background:#222B35; padding:.75pt 5.4pt .75pt 5.4pt; height:9.75pt"
                nowrap="" width="210"></td>
            <td style="width:63.5pt; border:none; border-bottom:solid #BFBFBF 1.0pt; background:#222B35; padding:.75pt 5.4pt .75pt 5.4pt; height:9.75pt"
                nowrap="" width="85"></td>
            <td style="width:63.5pt; border:none; border-bottom:solid #BFBFBF 1.0pt; background:#222B35; padding:.75pt 5.4pt .75pt 5.4pt; height:9.75pt"
                nowrap="" width="85"></td>
            <td style="width:100.3pt; border:none; border-bottom:solid #BFBFBF 1.0pt; background:#222B35; padding:.75pt 5.4pt .75pt 5.4pt; height:9.75pt"
                nowrap="" width="134"></td>
            <td style="width:49.85pt; border:none; border-bottom:solid #BFBFBF 1.0pt; background:#222B35; padding:.75pt 5.4pt .75pt 5.4pt; height:9.75pt"
                nowrap="" width="66"></td>
            <td style="width:66.15pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; background:#222B35; padding:.75pt 5.4pt .75pt 5.4pt; height:9.75pt"
                nowrap="" width="88"></td>
        </tr>
        <tr style="height:81.75pt">
            <td style="width:93.3pt; border-top:none; border-left:solid #BFBFBF 1.0pt; border-bottom:none; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:81.75pt"
                rowspan="2" nowrap="" width="124">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:11.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">ACTIONS</span></b>
                </p>
            </td>
            <td style="width:157.65pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:81.75pt"
                nowrap="" width="210">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:10.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">Pending
                            Items / Takeaways</span></b></p>
            </td>
            <td style="width:343.3pt; border:none; border-bottom:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:81.75pt"
                colspan="5" width="458">
                <p   class="x_MsoNormal"><span
                        style="font-size:9.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">${reportData.pendingItems?.replace(/\n/g, '<br>') || 'None'}</span></p>
            </td>
        </tr>
        <tr style="height:1.25in">
            <td style="width:157.65pt; border-top:none; border-left:none; border-bottom:solid #BFBFBF 1.0pt; border-right:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:1.25in"
                nowrap="" width="210">
                <p style="text-align:center" align="center" class="x_MsoNormal"><b><span
                            style="font-size:10.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">Actions
                            Taken</span></b></p>
            </td>
            <td style="width:343.3pt; border:none; border-bottom:solid #BFBFBF 1.0pt; padding:.75pt 5.4pt .75pt 5.4pt; height:1.25in"
                colspan="5" width="458">
                <p style="text-align:center" align="center" class="x_MsoNormal"><span
                        style="font-size:9.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:black">${reportData.actionsTaken?.replace(/\n/g, '<br>') || 'None specified'}</span></p>
            </td>
        </tr>
        <tr style="height:10.5pt">
            <td style="width:93.3pt; border:none; border-bottom:solid windowtext 1.0pt; background:#222B35; padding:.75pt 5.4pt .75pt 5.4pt; height:10.5pt"
                nowrap="" width="124"></td>
            <td style="width:157.65pt; border:none; border-bottom:solid windowtext 1.0pt; background:#222B35; padding:.75pt 5.4pt .75pt 5.4pt; height:10.5pt"
                nowrap="" width="210"></td>
            <td style="width:63.5pt; border:none; border-bottom:solid windowtext 1.0pt; background:#222B35; padding:.75pt 5.4pt .75pt 5.4pt; height:10.5pt"
                nowrap="" width="85"></td>
            <td style="width:63.5pt; border:none; border-bottom:solid windowtext 1.0pt; background:#222B35; padding:.75pt 5.4pt .75pt 5.4pt; height:10.5pt"
                nowrap="" width="85"></td>
            <td style="width:100.3pt; border:none; border-bottom:solid windowtext 1.0pt; background:#222B35; padding:.75pt 5.4pt .75pt 5.4pt; height:10.5pt"
                nowrap="" width="134"></td>
            <td style="width:49.85pt; border:none; border-bottom:solid windowtext 1.0pt; background:#222B35; padding:.75pt 5.4pt .75pt 5.4pt; height:10.5pt"
                nowrap="" width="66"></td>
            <td style="width:66.15pt; border:none; border-bottom:solid windowtext 1.0pt; background:#222B35; padding:.75pt 5.4pt .75pt 5.4pt; height:10.5pt"
                nowrap="" width="88"></td>
        </tr>
    </tbody>
</table>
    </body>
</html>`;






    return output;
}

export { formatReportForExport };