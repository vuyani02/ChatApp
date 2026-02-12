import { users, currentUser, activeChat, updateActiveChat, addMessage, messages, syncMessages } from "./dataBase.js";

const usersListEl = document.querySelector(".users-list");
const userPEl = document.querySelector(".user-p");
const formEl = document.querySelector(".form-cont");
const inputEl = document.querySelector(".chat-input");
const chatsContEl = document.querySelector(".chats-cont");
let userEl;

render();


function render() {

    let usersList = "";
    let onlineClass = "";

    users.forEach(({name, img, online}) => {

        if(online) {
            onlineClass = "";
        }

        else {
            onlineClass = "off";
        }

        if(name !== currentUser){   
        usersList += `<div class="user" data-user-name='${name}'>
                    <div class="img-container">
                        <img class="img-1" src=${img} alt="profile image">
                        <div class="online ${onlineClass}"></div>
                    </div>

                    <div class="container-2">
                        <div class="text-conatiner">
                            <h3>${name}</h3>
                            <p>I have it</p>
                        </div>
                        <time datetime="14:30">14:30</time>
                    </div>
                </div>`;
        }
    });

    usersListEl.innerHTML = usersList;

    userEl = document.querySelectorAll(".user");
    let currentBtn = '';
    displayChat(activeChat);

    console.log("ran")
    userEl.forEach((user) => {
        user.addEventListener('click', () => {
            currentBtn = user.dataset.userName;
            updateActiveChat(currentBtn);
            userEl.forEach((user0) => {
                user0.style.background = "transparent";
            })
            user.style.background = "#00003D";

            displayChat(currentBtn);
        })
    })

    formEl.addEventListener('submit', (e) => {
        e.preventDefault();

        const mess = inputEl.value;
        const now = new Date();
        const h = now.getHours();
        const m = now.getMinutes();
        let time =  h + "" === "0" ? h + "0:" : h + ":";
        time +=  m + "" === "0" ? m + "0" : m;

        if(mess){
            addMessage(mess, currentUser, activeChat, time);
        }    

        inputEl.value = "";
        render();
    })

    window.addEventListener('storage', () => {
        syncMessages();
        render();
    })
}




function displayChat(userName){
    userEl.forEach((user0) => {
            let name0 = user0.dataset.userName;
            name0 === activeChat && (user0.style.background = "#00003D");
        })

    users.forEach(({name, img, online}) => {
        if(name === userName){
            userPEl.innerHTML = `<img class="img-1" src="${img}" alt="user-pic">
                                <div class="text-conatiner">
                                 <h3>${name}</h3>
                                 <p>${online ? 'Online' : 'Offline'}</p>
                                </div>`;
        }
    })

    let chatsH = "";

    messages.forEach(({usersId, messagesList}) => {
        if(usersId === currentUser + activeChat || usersId === activeChat + currentUser) {
            messagesList.forEach(({message, time, writer}) => {
                if(writer === currentUser){
                    chatsH += `<div class="my-mess-cont">
                                <div class="my-mess">
                                    <p>${message}</p>
                                    <time datetime="${time}">${time}</time>
                                </div>
                            </div>`;
                }

                else {
                    chatsH += `<div class="them-mess-cont">
                    <div class="them-mess">
                        <p>${message}</p>
                        <time datetime="${time}">${time}</time>
                    </div>
                </div>`;
                }    
            });
        }
    })

    chatsContEl.innerHTML = chatsH;
}