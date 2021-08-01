async function fillName(){
    var url = 'http://localhost:3000/doctor/getByPhoneNumber/' + localStorage.getItem('doctorId');
            console.log(url);
            var response = await fetch(url);
            var json = await response.json();
            var doctor = json[0];
    // var retrievedObject = localStorage.getItem('doctorId');
    // doctor = JSON.parse(retrievedObject);
    var name = doctor.firstName;
    //name = "SaiShree";
    var letter = name.charAt(0);
    letter = letter+" ";
    document.getElementById("patientName").innerHTML = " <span class=\"letter\" >"+letter+"</span>";
}