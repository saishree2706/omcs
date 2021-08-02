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

async function fun() {

    if (myfun() == false)
        return;

    yourUrl = 'https://omcs-miniproject.herokuapp.com/patient/getByPhoneNumber/' +
        document.getElementById("id").value;
    const response = await fetch(yourUrl);
    const json = await response.json();

    if (json.length == 0) {
        document.getElementById("errorLabel").innerHTML = 'No such user found.';
        document.getElementById("errorLabel").style.display = 'block';
        alert("User not found!");
    }
    else {
        console.log(json);
        console.log("length=" + json.length);
        var enteredPswd = document.getElementById("password").value;
        if (json[0].accntPassword != enteredPswd) {
            document.getElementById("errorLabel").innerHTML = 'Incorrect password.';
            document.getElementById("errorLabel").style.display = 'block';
            document.getElementById("errorLabel").style.color = 'white';

            alert("INCORRECT PASSWORD!");
        }
        else {
            localStorage.setItem('patient', JSON.stringify(json[0]));
            window.location = 'patient_homepage.html';
        }
    }

}

async function forgot() {
    // document.getElementById("password").style.visibility = 'hidden';
    // document.getElementById("submit").value = 'Reset Password';


    yourUrl = 'https://omcs-miniproject.herokuapp.com/patient/getByPhoneNumber/' + document.getElementById("id").value;
    const response = await fetch(yourUrl);
    const json = await response.json();

    if (json.length == 0) {
        document.getElementById("errorLabel").innerHTML = 'No such user found.';
        document.getElementById("errorLabel").style.display = 'visible';
    }

    else {
        const url = 'https://omcs-miniproject.herokuapp.com/patient/forgotPassword/' + document.getElementById("id").value;
        const response = await fetch(url);
        const json = await response.json();
        alert("Password has been mailed to your email ID.");
    }

}
function myfun() {
    var a = document.getElementById("id").value;
    if (isNaN(a)) {
        document.getElementById("messages").innerHTML = "Enter valid phone number";
        return false;
    }
    if (a.length < 10) {
        document.getElementById("messages").innerHTML = "Mobile number must be 10 digits";
        return false;
    }
    if (a.length > 10) {
        document.getElementById("messages").innerHTML = "Mobile number must be 10 digits";
        return false;
    }
    return true;
}

