/**
 * Created by Dan gleyzer on 02-May-17.
 */

var registered_users = {};
var logged_user;
var idx = 0;

$(document).ready(function () {
$('#Welcome').show();
});

// check the user name and password on log in form
function logClick() {
    var username = document.getElementsByName("logName")[0].value;
    var password = document.getElementsByName("logPassword")[0].value;
    registered_users.a="a";
        if(registered_users[username]== password) {

            logged_user = username;




            //nameOfUser = logged_user ;
            /********settings******/

                // Get the modal
            var SettingsModal = document.getElementById('myModalSettings');
            SettingsModal.style.display = "block";
            /*****end settings****/
            }
        else if(registered_users[username]===undefined){
            alert("The user <"+username+"> doesn`t exist! Please register first. " )

        }
        else
            alert("Wrong password entered! please try again." )

    return;
}

function closeSettings(){
    var SettingsModal = document.getElementById('myModalSettings');
    SettingsModal.style.display="none";

}


/*****About*****/

$(document).mouseup(function (e)
{

// Get the modal
    var modal = document.getElementById('myModal');

// Get the element that opens the modal
    var about = document.getElementById("About");

// Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
    about.onclick = function() {
        modal.style.display = "block";
    }

// When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }


    });


// draws welcome image when page opens
window.ready = function() {
    document.getElementById("det_footer").focus();
    var c=document.getElementById('myCanvas');
    var ctx=c.getContext("2d");
    var img=document.getElementById('bkgdImg');
    ctx.drawImage(img, 0, 0, img.width,img.height,     // source rectangle
        0, 0, canvas.width, canvas.height);
};


/***Tabs***/
function openTab(evt, divName) {
    var i, tabcontent, tablinks;

    document.getElementById("det_footer").style.position ="fixed";
    window.clearInterval(interval);
    canvas.width=canvas.width; //clean board

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(divName).style.display = "block";
    evt.currentTarget.className += " active";


}
function regClick() {
    var username = document.getElementsByName('regName')[0].value;
    var pswd = document.getElementsByName('regPassword')[0].value;
    var confPswd = document.getElementsByName('conf_pswd')[0].value;
    var fname = document.getElementsByName('fname')[0].value;
    var lname = document.getElementsByName('lname')[0].value;
    var email = document.getElementsByName('email')[0].value;
    var dob = document.getElementsByName('dob')[0].value;

    if (username.length < 1 || !username.trim()){
        alert("User name should be at least 1 char!");
    }
    else if (pswd.length < 8 || !(pswd.match(/\d+/g)) || !(pswd.match(/[a-z]/i))){
        alert("Password Length should be 8 characters and should include numbers and letters!")
    }
    else if (confPswd != pswd){
        alert("Password confirmation doesn't match first password!")
    }
    else if ((fname.length < 1) || (fname.match(/\d+/g))){
        alert("First name length should be larger then 1, without numbers!");
    }
    else if ((lname.length < 1) || (lname.match(/\d+/g))){
        alert("Last name length should be larger then 1, without numbers!");
    }
    else if (!email.includes("@") || !email.includes(".")){
        alert("Email is invalid!");
    }
    else if (!dob.match(/\d+/g) || dob.match(/[a-z]/i)){
        alert("Date of birth is invalid!")
    }
    else{
        registered_users[idx] = {};
       // registered_users[idx, 0] = username;
        //registered_users[idx, 1] = pswd;
        registered_users[username]=pswd ;
        idx++;
        alert("User registered successfully!");
        document.getElementsByName('regName')[0].value = "";
        document.getElementsByName('regPassword')[0].value = "";
        document.getElementsByName('conf_pswd')[0].value = "";
        document.getElementsByName('fname')[0].value = "";
        document.getElementsByName('lname')[0].value = "";
        document.getElementsByName('email')[0].value = "example@example.com";
        document.getElementsByName('dob')[0].value = "";
        document.getElementsByName("logName")[0].value = "";
        document.getElementsByName("logPassword")[0].value = "";
        document.getElementById("reg").style.display = "none";
        document.getElementById("log").style.display = "block";
    }



}