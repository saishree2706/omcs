var a = 11;
console.log(a);
options = {
    method: "get",
    headers: { "ContentType": "application/json" },
};

var timeVariable;

function setTime() {
    timeVariable = setTimeout(function () {
        window.location = '../landing_page.html';
    }, 300000);
}

document.onclick = function (event) {
    clearTimeout(timeVariable);
    setTime();
};

async function getAppointments() {

    setTime();
    fillName();
    
    var b = 15;
    console.log(b);
    var retrievedObject = localStorage.getItem('patient');
    console.log(retrievedObject);
    patient = JSON.parse(retrievedObject);
    console.log(patient);

    const yourUrl = 'https://omcs-miniproject.herokuapp.com/appointment/getByPatient/' + patient.phoneNumber;
    const response = await fetch(yourUrl);
    const json = await response.json();
    const jsonArray = [];

    if (json.length == 0) {
        document.getElementById("h1text").innerHTML = 'No appointments found.';
        document.getElementById("h1text").style.display = 'block';

    } else {
        document.getElementById("h1text").style.display = 'none';
        for (i = 0; i < json.length; i++) {
            jsonArray.push(json[i]);
        }

        const urlDoctor = 'https://omcs-miniproject.herokuapp.com/doctor/all';
        const responseDoctor = await fetch(urlDoctor);
        const jsonDoctor = await responseDoctor.json();

        console.log(jsonDoctor);

        for (i = 0; i < jsonArray.length; i++) {

            if (jsonArray[i].appointmentId && jsonArray[i].doctorId) {
                let div1 = document.createElement('div');
                div1.className = "outerDiv";

                let indiv1 = document.createElement('div');
                indiv1.className = "innerDiv";

                let inSubDiv1 = document.createElement('div');
                inSubDiv1.className = "innerSubDiv";
                const newContent1 = document.createElement('h4');
                newContent1.innerHTML = "Appointment ID : " + jsonArray[i].appointmentId;

                let inSubDiv2 = document.createElement('div');
                inSubDiv2.className = "innerSubDiv";
                const newContent2 = document.createElement('h4');
                for (j = 0; j < jsonDoctor.length; j++) {

                    if (jsonDoctor[j].phoneNumber == jsonArray[i].doctorId) {
                        console.log(jsonDoctor[j].firstName + " " + jsonDoctor[j].lastName + "    " + jsonDoctor[j].phoneNumber);
                        newContent2.innerHTML = "Doctor Name : Dr. " + jsonDoctor[j].firstName + " " + jsonDoctor[j].lastName;
                        break;
                    }
                }


                let indiv2 = document.createElement('div');
                indiv2.className = "innerDiv";

                let inSubDiv3 = document.createElement('div');
                inSubDiv3.className = "innerSubDiv";
                const newContent3 = document.createElement('h4');

                var date = new Date(jsonArray[i].appointmentDate);
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var dt = date.getDate();
                const time = new Date(json[i].appointmentDate).toLocaleTimeString('en',
                    { timeStyle: 'short', hour12: false, timeZone: 'UTC' });
                console.log(time);

                newContent3.innerHTML = "Date and Time : " + dt + "-" + month + "-" + year + "           " + time;

                let inSubDiv4 = document.createElement('div');
                inSubDiv4.className = "innerSubDiv";
                const newContent4 = document.createElement('h4');
                newContent4.innerHTML = "Problem : " + jsonArray[i].problem;


                let indiv3 = document.createElement('div');
                indiv3.className = "innerDiv";

                let inSubDiv5 = document.createElement('div');
                inSubDiv5.className = "innerSubDiv";
                const newContent5 = document.createElement('h4');
                console.log(jsonArray[i].isActive);
                if (jsonArray[i].isAccepted == true) {
                    newContent5.className = "accepted";
                    newContent5.innerHTML = "Status : Accepted";
                } else {
                    if (jsonArray[i].isActive == true) {
                        newContent5.className = "notAccepted";
                        newContent5.innerHTML = "Status : Not Yet Accepted";
                    } else {
                        newContent5.className = "notActive";
                        var date = new Date(jsonArray[i].appointmentDate);
                        var year = date.getFullYear();
                        var month = date.getMonth() + 1;
                        var dt = date.getDate();
                        const time = new Date(json[i].appointmentDate).toLocaleTimeString('en',
                            { timeStyle: 'short', hour12: false, timeZone: 'UTC' });
                        console.log(time);

                        newContent3.innerHTML = "Date and Time : " + dt + "-" + month + "-" + year + "   " + time;
                        newContent5.innerHTML = "Message : " + jsonArray[i].status.split('T')[0];
                    }

                }

                let inSubDiv6 = document.createElement('div');
                inSubDiv6.className = "innerSubDiv";
                const newContent6 = document.createElement('h4');
                newContent6.innerHTML = "Consultation Fee : ₹ " + jsonArray[i].consultationFee;

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
                inSubDiv6.appendChild(newContent6);
                indiv3.appendChild(inSubDiv6);
                indiv3.appendChild(inSubDiv5);
                div1.appendChild(indiv3);

                document.body.appendChild(div1);
            } else {
                console.log(i + "=>undefined");
            }

        }

    }



}
