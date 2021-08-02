const morningArray = [];
const afternoonArray = [];
const eveningArray = [];
const dosageArray = [];
const medicineArray = [];
const fromArray = [];
const toArray = [];

var timeVariable;

function setTime() {
    fillName();
    timeVariable = setTimeout(function () {
        window.location = 'landing_page.html';
    }, 300000);
}

document.onclick = function (event) {
    clearTimeout(timeVariable);
    setTime();
};

async function getMedicines() {

    var script = document.createElement('script');
    script.type = 'text/javascript';

    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js';

    document.body.appendChild(script);

    if (document.getElementById("appointmentId").value == "") {
        document.getElementById("h1text").innerHTML = 'No patient id entered.';
        document.getElementById("h1text").style.display = 'block';
        return;
    }

    const url = 'http://localhost:3000/medicine/getByPatient/' + document.getElementById("appointmentId").value;
    const response = await fetch(url);
    const json = await response.json();
    //document.getElementById("h1text").style.display = 'none';

    var paras = document.getElementsByClassName('outerDiv');
    while (paras[0]) {
        paras[0].parentNode.removeChild(paras[0]);
    }

    var paras = document.getElementsByClassName('buttonDiv');
    while (paras[0]) {
        paras[0].parentNode.removeChild(paras[0]);
    }



    if (json.length == 0) {
        console.log("No Medicines Prescribed for this appointment ID");
        document.getElementById("h1text").style.display = 'block';
        document.getElementById("h1text").innerHTML = 'No records found for this patient.';
        return;


    } else {

        document.getElementById("h1text").style.display = 'none';
        
        var sendText = "PRESCRIPTION FOR APPOINTMENT ID = " + json[0].appointmentId + "\n\n";
        localStorage.setItem('appointmentId', json[0].appointmentId);
        for (i = 0; i < json.length; i++) {
            let div1 = document.createElement('div');
            div1.className = "outerDiv";

            let indiv1 = document.createElement('div');
            indiv1.className = "innerDiv";

            let inSubDiv1 = document.createElement('div');
            inSubDiv1.className = "innerSubDiv";
            const newContent1 = document.createElement('h4');
            newContent1.innerHTML = "Appointment ID: " + json[i].appointmentId;


            let inSubDiv2 = document.createElement('div');
            inSubDiv2.className = "innerSubDiv";
            const newContent2 = document.createElement('h4');
            newContent2.innerHTML = "Medicine Name : " + json[i].medicineName;
            sendText = sendText + "\nMedicine Name : " + json[i].medicineName;
            medicineArray.push(json[i].medicineName);


            let indiv2 = document.createElement('div');
            indiv2.className = "innerDiv";

            let inSubDiv3 = document.createElement('div');
            inSubDiv3.className = "innerSubDiv";
            const newContent3 = document.createElement('h4');

            if (json[i].dateFrom != null && json[i].dateTo != null) {
                var date1 = new Date(json[i].dateFrom);
                var date2 = new Date(json[i].dateTo);
                var Difference_In_Time = date2.getTime() - date1.getTime();
                var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                newContent3.innerHTML = "Number of days : " + Difference_In_Days;
                var to = json[i].dateTo;
                k = to.split('T');
                to = k[0];
                dateTo = to.split('-');
                var from = json[i].dateFrom;
                k = from.split('T');
                from = k[0];
                dateFrom = from.split('-');
                //console.log(dateTo[0] + dateTo[1] + dateTo[2]);
                fromArray.push(dateFrom[0] + dateFrom[1] + dateFrom[2]);
                sendText = sendText + "\nStart Date : " + dateFrom[2] + "-" + dateFrom[1] + "-" + dateFrom[0];
                console.log(dateFrom[0] + dateFrom[1] + dateFrom[2]);
                toArray.push(dateTo[0] + dateTo[1] + dateTo[2]);
                sendText = sendText + "\nEnd Date : " + dateTo[2] + "-" + dateTo[1] + "-" + dateTo[0];
            }
            else {
                newContent3.innerHTML = "Number of days : ---";
                fromArray.push("-1");
                toArray.push("-1");
            }
            newContent3.innerHTML = "Number of days : " + Difference_In_Days;
            // sendText = sendText + newContent3.innerHTML;

            let inSubDiv4 = document.createElement('div');
            inSubDiv4.className = "innerSubDiv";
            const newContent4 = document.createElement('h4');

            if (json[i].timingMorning != -1) {
                newContent4.innerHTML = newContent4.innerHTML + "Morning Time : " + timeConvert(json[i].timingMorning);
                sendText = sendText + "\n" + "Morning Time : " + timeConvert(json[i].timingMorning);
                var timing = timings(json[i].timingMorning);
                morningArray.push(timing);
            }
            else {
                newContent4.innerHTML = newContent4.innerHTML + "Morning Time : ---";
                sendText = sendText + "\nMorning Time : ---"
                morningArray.push("-1");
            }

            if (json[i].timingAfternoon != -1) {
                newContent4.innerHTML = newContent4.innerHTML + "\nAfternoon Time : " + timeConvert(json[i].timingAfternoon) + " ";
                sendText = sendText + "\nAfternoon Time : " + timeConvert(json[i].timingAfternoon);
                var timing = timings(json[i].timingAfternoon);
                afternoonArray.push(timing);
            }
            else {
                newContent4.innerHTML = newContent4.innerHTML + "\nAfternoon Time : ---";
                sendText = sendText + "\nAfternoon Time : ---";
                afternoonArray.push("-1");
            }

            if (json[i].timingEvening != -1) {
                newContent4.innerHTML = newContent4.innerHTML + "Evening Time : " + timeConvert(json[i].timingEvening);
                sendText = sendText + "\nEvening Time : " + timeConvert(json[i].timingEvening);
                var timing = timings(json[i].timingEvening);
                eveningArray.push(timing);
            }
            else {
                newContent4.innerHTML = newContent4.innerHTML + "Evening Time : ---";
                sendText = sendText + "\nEvening Time : ---";
                eveningArray.push("-1");
            }

            // sendText = sendText + newContent4.innerHTML + "\n" + newContent3.innerHTML + "\n" + newContent4.innerHTML + "\n\n";
            //console.log(sendText);

            let indiv3 = document.createElement('div');
            indiv3.className = "innerDiv";

            let inSubDiv5 = document.createElement('div');
            inSubDiv5.className = "innerSubDiv";
            const newContent5 = document.createElement('h4');
            newContent5.innerHTML = "Dosage: " + json[i].dosage;
            dosageArray.push(json[i].dosage);


            inSubDiv1.appendChild(newContent1);
            inSubDiv2.appendChild(newContent2);
            indiv1.appendChild(inSubDiv1);
            indiv1.appendChild(inSubDiv2);
            div1.appendChild(indiv1);

            inSubDiv3.appendChild(newContent3);
            inSubDiv4.appendChild(newContent4);
            indiv2.appendChild(inSubDiv3);
            indiv2.appendChild(inSubDiv4);
            div1.appendChild(indiv2);

            inSubDiv5.appendChild(newContent5);
            indiv3.appendChild(inSubDiv5);
            div1.appendChild(indiv3);

            document.body.appendChild(div1);

            sendText = sendText + "\n\n";
        }
        //console.log(sendText);
        //console.log(toArray);
        console.log(morningArray);
        var str = Math.max.apply(Math, morningArray);
        console.log(str);
        console.log(str.toString().length);




    }

    let indiv1 = document.createElement('div');
    indiv1.className = "buttonDiv";
    indiv1.innerHTML = "<a href=\"\" onclick=\"makePDF()\" type=\"button\" class=\"downloadFile editButton\" ><i class=\"fa fa-download\" aria-hidden=\"true\" style=\"font-size:32px\"></i></a>";
    let new1 = document.createElement('div');
    new1.className = "hideDownload";
    new1.innerHTML = "Click here to Download Prescription"


    let indiv2 = document.createElement('div');
    indiv2.className = "buttonDiv";

    indiv2.innerHTML = "<a class=\"editButton\" onclick=\"getDetails()\"><i class=\"fa fa-bell\" aria-hidden=\"true\" style=\"font-size:32px\"></i></a>";

    document.body.appendChild(indiv1);
    document.body.appendChild(indiv2);
    document.body.appendChild(new1);

    localStorage.setItem('sendText', sendText);

}

function makePDF() {
    var doc = new jsPDF();
    var sendText = localStorage.getItem('sendText');
    doc.text(20, 20, sendText);
    var name = "Appointment ID - " + localStorage.getItem('appointmentId') + '.pdf';
    // doc.output(dataurlnewwindow);
    doc.save(name);
    document.getElementById("appointmentId").value = localStorage.getItem('appointmentId');
    getMedicines();
}

function timeConvert(n) {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + ":" + rminutes;
}

function timings(n) {
    var hrs = n / 60;
    var rhrs = Math.floor(hrs);
    var min = n % 60;
    var rmin = Math.floor(min);
    var sec = "00";
    if (rhrs < 10) { rhrs = "0" + rhrs; }
    if (rmin < 10) { rmin = "0" + rmin; }
    var time = rhrs.toString() + rmin.toString() + sec.toString();
    return time;
}


async function getDetails() {
    console.log(medicineArray + dosageArray + morningArray + afternoonArray + eveningArray + fromArray + toArray);
    var dataMorning = "Morning: ";
    var dataAfternoon = "Afternoon: ";
    var dataEvening = "Evening: "
    for (i = 0; i < medicineArray.length; i++) {
        if (morningArray[i] != -1) {
            dataMorning = dataMorning +
                medicineArray[i] + " " + dosageArray[i] + " At: " + morningArray[i];
        }
    }
    for (i = 0; i < medicineArray.length; i++) {
        if (afternoonArray[i] != -1) {
            dataAfternoon = dataAfternoon +
                medicineArray[i] + " " + dosageArray[i] + " At: " + afternoonArray[i];
        }
    }
    for (i = 0; i < medicineArray.length; i++) {
        if (eveningArray[i] != -1) {
            dataEvening = dataEvening +
                medicineArray[i] + " " + dosageArray[i] + " At: " + eveningArray[i];
        }
    }
    var minD = Math.min.apply(Math, fromArray);
    var maxD = Math.max.apply(Math, toArray);
    var k = 10000;

    var minMtime = Math.min.apply(Math, morningArray);
    if (minMtime.toString().length < 6) {
        minMtime = "0" + minMtime;
    }
    var maxMtime = Math.min.apply(Math, morningArray);
    if (maxMtime.toString().length < 6) {
        maxMtime = "0" + maxMtime;
    }
    if (minMtime == maxMtime) {
        maxMtime = parseInt(minMtime) + k;
    }

    sendMail(minD, maxD, minMtime, maxMtime, dataMorning);

    var minAtime = Math.min.apply(Math, afternoonArray);
    if (minAtime.toString().length < 6) {
        minAtime = "0" + minAtime;
    }
    var maxAtime = Math.min.apply(Math, afternoonArray);
    if (maxAtime.toString().length < 6) {
        maxAtime = "0" + maxAtime;
    }
    if (minAtime == maxAtime) {
        maxAtime = parseInt(minAtime) + k;
    }

    sendMail(minD, maxD, minAtime, maxAtime, dataAfternoon);

    var minEtime = Math.min.apply(Math, eveningArray);
    if (minEtime.toString().length < 6) {
        minEtime = "0" + minEtime;
    }
    var maxEtime = Math.min.apply(Math, eveningArray);
    if (maxEtime.toString().length < 6) {
        maxEtime = "0" + maxEtime;
    }
    if (minEtime == maxEtime) {
        maxEtime = parseInt(minEtime) + k;
    }

    sendMail(minD, maxD, minEtime, maxEtime, dataEvening);

    alert('Calendar invite has been sent to your mail.');


}

async function sendMail(minD, maxD, minMtime, maxMtime, data) {
    // console.log(time+"...time");
    var retrievedObject = localStorage.getItem('patient');
    patient = JSON.parse(retrievedObject);
    console.log("mail..." + patient.contactMail);
    var data = {
        "mail": patient.contactMail,
        "time": "T" + minMtime,
        "timeTo": "T" + maxMtime,
        "toDate": maxD,
        "fromDate": minD,
        "medicineName": data
    }
    console.log(data);
    const url1 = "http://localhost:3000/medicine/sendCalendarInvite";
    const response1 = await fetch(url1, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    // const json1 = await response1.json();

    // 
    // console.log(json1);
}


async function download() {
    const url = 'http://localhost:3000/medicine/getByPatient/' + document.getElementById("appointmentId").value;
    const response = await fetch(url);
    const json = await response.json();

    if (json.length == 0) {
        console.log("No Prescriptions");
    } else {

        var text = json;
        name = 'Prescription.txt';
        type = 'text/plain';
        var downloadFile = document.getElementsByClassName("downloadFile")[0];
        var file = new Blob([text], { type: type });
        downloadFile.href = URL.createObjectURL(file);
        downloadFile.download = name;
    }
}