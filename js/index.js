/**
 * Created by Dan gleyzer on 02-May-17.
 */

var registered_users = {};
var logged_user;




function logClick() {

    var username = document.getElementsByName("logName")[0].value;
    var password = document.getElementsByName("logPassword")[0].value;

    registered_users.a="a";
   //  registered_users[dan]= "aaa";

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
