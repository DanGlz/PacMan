/**
 * Created by Dan gleyzer on 02-May-17.
 */

var registered_users = {};
var logged_user;

$(document).ready(function () {
$('#Welcome').show();
});

// check the user name and password on log in form
function logClick() {

    var username = document.getElementsByName("logName")[0].value;
    var password = document.getElementsByName("logPassword")[0].value;

    registered_users.a="a";
    var dan ="dan";
    var pass= "12345"
    registered_users[dan]= pass;

        if(registered_users[username]== password) {
            alert("User: " + username + " logged in successfully!" + "\n\nEnjoy ! ")
            logged_user = username;
            openTab(event, 'PacMan');
        }
        else if(registered_users[username]===undefined){
            alert("The user <"+username+"> doesn`t exist! Please register first. " )
        }
        else
            alert("Wrong password entered! please try again." )

    return;
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
window.onload = function() {
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
