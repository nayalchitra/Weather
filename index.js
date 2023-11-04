const api_id ='58b6952a05470d5ce0af9b0a0dff0275';
 const API = 'https://api.openweathermap.org/data/2.5/weather?q=';



const btn = document.querySelector(".search-weather");

function emptyDOMElements(){
        document.querySelector(".city").innerHTML = "";
        document.querySelector(".temp").innerHTML = "";
        document.querySelector(".pressure").innerHTML = "";
        document.querySelector(".wind-speed").innerHTML = "";
        document.querySelector(".wind-deg").innerHTML = "";
        document.querySelector(".humidity").innerHTML = "";
        document.querySelector(".humidity-img").src = "";
        document.querySelector(".wind").src = "";
        document.querySelector(".weather-img").src="";
}

async function getWeather(){
    const city = document.querySelector("#location-input").value;
    if(city.length == 0)
    {    document.querySelector(".error-msg").innerHTML = "Please enter city name";
         emptyDOMElements();
         return;
    }
    else{
        document.querySelector(".error-msg").innerHTML="";
        
       
    }
    const response = await fetch(API + city + `&appid=${api_id}`);
    const data = await response.json();
    console.log(data); 
    if(data.cod == 400 || data.cod == 404)
    {
        document.querySelector(".error-msg").innerHTML = `No records available for city ${city}`;
        emptyDOMElements();
    }
    else{
        document.querySelector("#weather-data").style.display = "flex";

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = data.main.temp + ` \u00B0C`;
        document.querySelector(".pressure").innerHTML = data.main.pressure + " atm";
        document.querySelector(".wind-speed").innerHTML = data.wind.speed + " km/h";
        document.querySelector(".wind-deg").innerHTML = data.wind.deg + ' \u00B0';
        document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
        document.querySelector(".humidity-img").src = "./public/humidity.png";
        document.querySelector(".wind").src = "./public/wind.png";

        const img = document.querySelector(".weather-img");
        const weatherType = data.weather[0].main;
        if(weatherType=="Clouds"){console.log('cloud');
            img.src = "./public/clouds.png";
    }
        else if(weatherType == "Rain")
            img.src = "./public/rain.png";
        else if(weatherType == "Snow")
            img.src = "./public/snow.png";
        else if(weatherType == "Clear")
            img.src ="./public/clear.png";
        else if(weatherType == "Drizzle")
            img.src = "./public/drizzle.png";
        else if(weatherType == "Mist")
            img.src ="./public/mist.png";
    }
}


btn.addEventListener("click", ()=>{
   
    getWeather();
});
