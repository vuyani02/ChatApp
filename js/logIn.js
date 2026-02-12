import {users, updateCurrentUser, logIn, updateActiveChat} from "./dataBase.js";

const formEl = document.querySelector("#form");
const nameEl = document.querySelector("#username");
const passwordEl = document.querySelector("#password");
const  errorEl = document.querySelector(".error");
const  errorEl2 = document.querySelector(".error-2");

formEl.addEventListener("submit", (e) => {
    e.preventDefault();

    const vName = nameEl.value.trim();
    const vpassword = passwordEl.value.trim();
    let   allow = false;

    if(!vName) {
        errorEl.textContent = "Username is required.";
        nameEl.style.border = "2px solid #ff2727";
        return;
    }

    if(!vpassword) {
        errorEl2.textContent = "Password is required.";
        passwordEl.style.border = "2px solid #ff2727";
        return;
    }

    users.forEach(element => {
        if(element.name === vName){
            if(vpassword === element.password) allow = true;
        }
    });

    if(!allow) {
        errorEl2.textContent = "Username or password incorrect.";
        passwordEl.value = "";
        return
    }

    if(users.length > 1) {
        for(let i = 0; i < users.length; i++) {
            if(users[i].name !== vName) {
                updateActiveChat(users[i].name);
                break;
            }
        }
    }

    updateCurrentUser(vName);
    logIn(vName);

    window.location.href = "../pages/chat.html";
})