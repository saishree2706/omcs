function fillName(){
    var retrievedObject = localStorage.getItem('patient');
    patient = JSON.parse(retrievedObject);
    var name = patient.firstName;
    //name = "SaiShree";
    var letter = name.charAt(0);
    letter = letter+" ";
    document.getElementById("patientName").innerHTML = " <span class=\"letter\" >"+letter+"</span>";
}