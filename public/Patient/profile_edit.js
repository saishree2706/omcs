//alert("Connected!!!");

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

function autoFill() {
    setTime();
    fillName();
    var retrievedObject = localStorage.getItem('patient');
    patient = JSON.parse(retrievedObject);
    document.getElementById("myForm").style.display = "block";
    console.log("autofill..." + patient);
    document.getElementsByName("firstName")[0].value = patient.firstName;
    document.getElementsByName("lastName")[0].value = patient.lastName;
    document.getElementsByName("contactEmail")[0].value = patient.contactMail;
    document.getElementsByName("accntPassword")[0].value = patient.accntPassword;
    document.getElementsByName("address")[0].value=patient.address;
    var date = new Date(patient.dateOfBirth);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var dt = date.getDate();
    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }
    console.log(year + "-" + month + "-" + dt);
    document.getElementsByName("dateOfBirth")[0].value = year + "-" + month + "-" + dt;

    closeForm();
}

function openForm() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    document.getElementsByClassName("btn")[0].style.display = "block";
    document.getElementsByClassName("btn cancel")[0].style.display = "block";
    document.getElementsByName("firstName")[0].disabled = false;
    document.getElementsByName("firstName")[0].focus();
    document.getElementsByName("lastName")[0].disabled = false;
    document.getElementsByName("contactEmail")[0].disabled = false;
    document.getElementsByName("accntPassword")[0].disabled = false;
    document.getElementsByName("address")[0].disabled=false;
}

async function update() {
    inputs =
    {
        "firstName": document.getElementsByName("firstName")[0].value,
        "lastName": document.getElementsByName("lastName")[0].value,
        "dateOfBirth": patient.dateOfBirth,
        "sex": patient.gender,
        "phoneNumber": patient.phoneNumber,
        "address": document.getElementsByName("address")[0].value,
        "contactMail": document.getElementsByName("contactEmail")[0].value,
        "accntPassword": document.getElementsByName("accntPassword")[0].value,
        "created_timestamp": patient.created_timestamp,
        "insuranceId": patient.insuranceId,
        "modified_timestamp": new Date().toISOString

    };
    const url = 'https://omcs-miniproject.herokuapp.com/patient/update/' + patient.phoneNumber;
    fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs)
    });

    change();
    async function change() {

        var response = await fetch('https://omcs-miniproject.herokuapp.com/patient/getByPhoneNumber/' +
            patient.phoneNumber);
        var json = await response.json();
        patient = json;
        console.log(patient);

        localStorage.removeItem('patient');
        localStorage.setItem('patient', JSON.stringify(json[0]));
    }
    closeForm();

}

function closeForm() {
    document.getElementsByClassName("btn")[0].style.display = "none";
    document.getElementsByClassName("btn cancel")[0].style.display = "none";
    document.getElementsByName("firstName")[0].disabled = true;
    document.getElementsByName("lastName")[0].disabled = true;
    document.getElementsByName("contactEmail")[0].disabled = true;
    document.getElementsByName("accntPassword")[0].disabled = true;
    document.getElementsByName("address")[0].disabled=true;
    document.documentElement.scrollTop = 0;
}
