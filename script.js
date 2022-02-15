const form = document.querySelector("form");
const input = document.querySelector("input");
const message = document.querySelector(".msg");
const list = document.querySelector(".cities");


const apiKey = "825a05620926077b02fae8b681a21e2c";

form.addEventListener("submit", e => {
    e.preventDefault();
    let inputValue = input.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`
    fetch(url) 
        .then(response => response.json())
        .then (data => {
            console.log(data);
            const {main, name, sys, weather} = data;
            const li = document.createElement("li");
            li.classList.add("city");
            const markup = `
            <h2 class='city-name' data-name=${name},${sys.country}>
            <span>${name}</span>
            <span>${sys.country}</span>
            </h2>
            <div class='city-temp'>${Math.round(main.temp)}</div>
        
            `;
            li.innerHTML=markup;
            list.appendChild(li);
            message.innerText = "";
        })
        .catch (() => {
            message.innerText = "City not found ";
        })

        input.value = "";
})
