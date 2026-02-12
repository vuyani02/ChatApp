import {users, addUser, updateCurrentUser} from "./dataBase.js";

const formEl = document.querySelector("#form");
const nameEl = document.querySelector("#username");
const passwordEl = document.querySelector("#password");
const  errorEl = document.querySelector(".error");
const  errorEl2 = document.querySelector(".error-2");

formEl.addEventListener("submit", (e) => {
    e.preventDefault();

    const vName = nameEl.value.trim();
    const vpassword = passwordEl.value.trim();
    let   taken = false;

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
            errorEl.textContent = "Username already taken.";
            taken =true;
        }
    });

    if(taken) return;

    addUser({
        name: vName,
        password: vpassword,
        about: "",
        img: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png",
        online: true,
    });

    updateCurrentUser(vName);

    nameEl.value = "";
    passwordEl.value = "";

    window.location.href = "../pages/chat.html";
})