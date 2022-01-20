import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
const socket = io("http://localhost:5005/");
const form = document.querySelector('.form');
const wrapper = document.querySelector('.wrapper');
const input = document.querySelector('.input');
const name = prompt('Your name please:');
let isMade = true;


if(name){
    let h3 = document.createElement('h3');
    h3.textContent = "You are joined";
    wrapper.appendChild(h3);
}


socket.emit('name', {name});
socket.on('nameIsCame', data=>{
    let h3 = document.createElement('h3');
    wrapper.appendChild(h3);
    h3.textContent = `${data.name} is joined`;
    
})
 
form.addEventListener('submit', e=>{
    e.preventDefault();
    let value = input.value;
    socket.emit('submit', {value, name});
    let pArray =[... wrapper.querySelectorAll('p')]
    let last = pArray.at(-1);
    last.textContent = `YOU: ${value}`;
    isMade =true
})

input.addEventListener('keyup', async (e)=>{
    let value = await e.target.value;
    socket.emit('change', {value, name});
    if(isMade){
        let text = document.createElement('p');
        wrapper.appendChild(text);
        text.textContent = value;
        isMade = false;
    }else{
        let pArray =[... wrapper.querySelectorAll('p')]
        let last = pArray.at(-1);
        last.textContent = `YOU ARE WRITING: ${value}`
    }
})

socket.on('changed', (data)=>{
    if(isMade){
        let text = document.createElement('p');
        wrapper.appendChild(text);
        text.textContent = data.message;
        isMade = false;
    }else{
        let pArray =[... wrapper.querySelectorAll('p')]
        let last = pArray.at(-1);
        last.textContent = `${data.name} IS WRITING: ${data.message}`
    }
    
})
socket.on('submitted', data=>{
    let pArray =[... wrapper.querySelectorAll('p')]
    let last = pArray.at(-1);
    last.textContent = `${data.name} : ${data.message}`;
})