const form = document.querySelector("form");
const input = document.querySelector("input");
const message = document.querySelector(".msg");
const list = document.querySelector(".row");

const apiKey = "825a05620926077b02fae8b681a21e2c";

form.addEventListener("submit", e => {
    e.preventDefault();
    let inputValue = input.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`
    fetch(url) 
        .then(response => response.json())
        .then (data => {
            console.log(data);
            const {main, name, sys, weather, wind, } = data;
            const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
            const col = document.createElement("div");
            col.classList.add('col', 'col-sm-12', 'col-md-6', 'col-lg-4', 'mb-5');
            const markup = `
            <div class="card-body bg-light rounded-3">
            <h2 class='city-name' data-name=${name},${sys.country}>
            <span>${name}</span>
            <span><sup>${sys.country}</sup></span>
            </h2>
            <div class='city-temp'>${Math.round(main.temp)}<sup>°C</sup></div>
            <figure>
            <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
            <figcaption>${weather[0]["description"]}</figcaption>
            </figure>
            <div>Wind speed: ${Math.round(wind.speed)} m/s</div>
            <div>Humidity: ${Math.round(main.humidity)}%</div>
            <div>Min temp: ${Math.round(main.temp_min)}</div>
            <div>Max temp: ${Math.round(main.temp_max)}</div>
            </div>
            `;
            col.innerHTML= markup;
            list.appendChild(col);
            message.innerText = "";
        })
        .catch (() => {
            message.innerText = "City not found ";
        })

        input.value = "";
})
