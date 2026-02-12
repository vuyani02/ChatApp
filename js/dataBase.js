export let users = JSON.parse(localStorage.getItem('users')) || [];
export let currentUser = JSON.parse(sessionStorage.getItem('currentUser')) || '';
export let messages = JSON.parse(localStorage.getItem('messages')) || [];
export let activeChat = JSON.parse(sessionStorage.getItem('activeChat')) || '';

// users functions

export const addUser = (user) => {
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
};

export const logOut = (user) => {
    users.forEach(element => {
        user === element.name && (element.online = false);
    });
    
    localStorage.setItem('users', JSON.stringify(users));
}

export const logIn = (user) => {
    users.forEach(element => {
        user === element.name && (element.online = true);
    });
    
    localStorage.setItem('users', JSON.stringify(users));
}




// currentUser functions

export const updateCurrentUser = (username) => {
    currentUser = username;
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
}




// activeChat functions

export const updateActiveChat = (username) => {
    activeChat = username;
    sessionStorage.setItem('activeChat', JSON.stringify(activeChat));
}




// messages functions

export function syncData() {
    
    messages = JSON.parse(localStorage.getItem("messages")) || [];
    users = JSON.parse(localStorage.getItem('users')) || [];
}

export const addMessage = (message, user1, user2, time) => {
    
    let newChat = true;
    for(let i = 0; i < messages.length; i++) {
        if(messages.usersId === user1 + user2 || messages.usersId === user2 + user1){
            newChat = false;
            messages.messagesList.push({
                message,
                time,
                writer: user1
            });
            localStorage.setItem('messages', JSON.stringify(messages));
            break;
        }
    }

    if(newChat){
        messages.push({
        usersId: user1 + user2,
        messagesList: [
            {
                message,
                time,
                writer: user1
            }
        ]
    });
    localStorage.setItem('messages', JSON.stringify(messages));
    }
    
}