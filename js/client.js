const socket = io('http://localhost:5000');

//getting DOM elements in JS variables
const form = document.getElementById('send-text')
const textInp = document.getElementById('textInp')  //to get the input user has entered

const textContainer = document.querySelector(".container") //to show the textInp given by user

//audio for all receiving texts
var audio = new Audio('mixkit-sci-fi-click-900.mp3')


//function which will append to the container
const append = (text,position) =>{

    const textElement = document.createElement('div')
    textElement.innerText = text
    textElement.classList.add('text')
    textElement.classList.add(position)
    textContainer.append(textElement)
    if(position == 'left'){
        audio.play()
    }



}


//Ask user his/her name
const name = prompt("Enter your name to join")

//if user joins let the server know
socket.emit('new-user-joined',name)

//as new user has joined recive event from the server
socket.on('user-joined',name=>{

    //we want to append this user to textContainer
    append(`${name} joined the chat `,'left')

})


//if server sends a text , recieve it!!
socket.on('recieve',data=>{

    //we want to append this user to textContainer
    append(` ${data.name} : ${data.text} `,'left')

})

//if user leaves the chat , append the info to the container
socket.on('left',name=>{
    append(`${name} left the chat`,'left')

})


//if the form gets submitted , send this info to the server
form.addEventListener('submit',(e)=>{

    e.preventDefault();
    const text = textInp.value
    append(`You : ${text}`,'right')
    socket.emit('send',text) 
    textInp.value=''
})

