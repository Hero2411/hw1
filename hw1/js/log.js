const loginbtn = document.getElementById("login")
const regbtn = document.getElementById("reg")
const username = document.getElementById("username")
const pwd = document.getElementById("password")

const usernameRegex = /^[a-zA-Z0-9\.]{5,}$/g
const pwdRegex = /^[a-zA-Z0-9\.\!\$\%\&\?\*\:\#\@]{8,}$/g

loginbtn.addEventListener("click", performlogin)
regbtn.addEventListener("click", performreg)

function isDataValid() {
    let username_text = username.value;
    let password_text = pwd.value;
    let errors = ""
    username_success = username_text.match(usernameRegex)
    password_success = password_text.match(pwdRegex)
    if ( username_success && password_success) {
        return true
    }
    else {
        if (!username_success) {
            errors += "Username can contain characters and numbers. The only special character allowed is '.'. It must be a 5 or greater characters length\n"
        }
        if (!password_success)  {
            errors += "Password can contain characters. numbers and the following special characters [. ! $ % & ? * : @ #]. It must be a 8 or greater characters length\n"
        }
    }
    alert(errors)
    return false
}

async function performlogin() {
    if (isDataValid()) {
            const response = await fetch('./backend/login.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
            },
            body: JSON.stringify({"username": username.value, "password": password.value})
          });
        var jsonData = await response.json();
        if (jsonData["data"] == undefined) {
            alert(`Unable to login due to: ${jsonData["error"]}`)
            return
        }
        else {
            jsonData = jsonData["data"]
        }
        setCookie("token", jsonData["token"])
        alert("Logged successfull, redirecting to home!");
        window.location.href = "hw1.php"
    }
}


async function performreg() {
    if (isDataValid()) {
        const response = await fetch('./backend/register.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: JSON.stringify({"username": username.value, "password": password.value})
      });
    var jsonData = await response.json();
    if (jsonData["data"] == undefined) {
        alert(`Unable to register due to: ${jsonData["error"]}`)
        return
    }
    else {
        jsonData = jsonData["data"]
    }
    alert("Registration successfull, please log-in!");
    window.location.href = "hw1.php"
}
    
}

if (getCookie("token")!="") {
    setCookie("token", "");
    alert("Logged out successfully!")
    window.location.href = "./hw1.php";
}