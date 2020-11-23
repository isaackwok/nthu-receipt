// Message Receiver
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    switch (request.action) {
        case "submit":
            fillandsubmit(request);
            break;
    }
});

function fillandsubmit(data) {
    let count = 0;
    console.log(data);
    let { days, month, planNo, totalHours, workingTime } = data
    let today = new Date();
    let hours = totalHours;
    for (let day of days) {
        for (let time of workingTime) {
            setTimeout(() => {
                if (hours <= 0){
                    return;
                }
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
                inputEndHour.value = String(time + (hours >= 4 ? 4 : hours)).padStart(2, 0);
                console.log(time);
                console.log(time + (hours >= 4 ? 4 : hours));
                submitBtn.click();
                hours -= (hours >= 4 ? 4 : hours);

            }, 5000 * count);
            count ++;
        }
    }
}