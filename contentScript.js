// Message Receiver
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    switch (request.action) {
        case "submit":
            fillandsubmit(request);
            sendResponse({
                // text: window.getSelection().toString().trim()
            });
            break;
    }
});

function fillandsubmit(data) {
    let count = 1;
    console.log(data);
    let { days, month, planNo, totalHours, workingTime } = data
    let today = new Date();

    for (let day of days) {
        for (let time of workingTime) {
            if (totalHours <= 0){
                return;
            }
            setTimeout(() => {
                // Get document and form in main frame
                let mainDoc = document.getElementsByName('main')[0].contentWindow.document;
                let insForm = mainDoc.querySelector('form#insForm');
                
                // Get all inputs
                let inputYear = mainDoc.querySelector('select[name="I_TASK_DT_Year"]');
                let inputMonth = mainDoc.querySelector('select[name="I_TASK_DT_Month"]');
                let inputDay = mainDoc.querySelector('select[name="I_TASK_DT_Day"]');
                let inputStartHour = mainDoc.querySelector('select[name="I_TASK_A_TM_Hour"]');
                let inputStartMinute = mainDoc.querySelector('select[name="I_TASK_A_TM_Minute"]');
                let inputEndHour = mainDoc.querySelector('select[name="I_TASK_Z_TM_Hour"]');
                let inputEndMinute = mainDoc.querySelector('select[name="I_TASK_Z_TM_Minute"]');
                let inputPlan = mainDoc.querySelector(`input[name="I_LAB_SERIAL"][value="${planNo}"]`);
                let inputDepartment = mainDoc.querySelector(`select#I_SRV_ID`);
                let inputWorkNote = mainDoc.querySelector(`input#I_TASK_NOTE`);
                let submitBtn = mainDoc.querySelector('input#S_SUBMIT');
    
                // Fill Date
                inputYear.value = today.getFullYear();
                inputMonth.value = month;
                inputDay.value = day.padStart(2, 0);
    
                // Fill Plan Info
                inputPlan.checked = true;
                inputDepartment.value = 'DS0B';
                inputWorkNote.value = '協助計劃進行';
    
                // Fill working hours
                inputStartHour.value = String(time).padStart(2, 0);
                inputEndHour.value = String(time + (totalHours >= 4 ? 4 : totalHours)).padStart(2, 0);
                console.log(time);
                console.log(time + (totalHours >= 4 ? 4 : totalHours));
                submitBtn.click();
                totalHours -= (totalHours >= 4 ? 4 : totalHours);

            }, 5000 * count);
            count ++;
        }
    }
}