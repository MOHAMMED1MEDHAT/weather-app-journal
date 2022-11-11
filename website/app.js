/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


let baseUrl="https://api.openweathermap.org/data/2.5/weather?zip=";
// Personal API Key for OpenWeatherMap API
let apiKey="&appid=fec1ab7764243ae3f4ea7366ba0e5322&units=imperial";
let query="";

document.querySelector(".rectangle-5-1").addEventListener("click",(e)=>{
    query=document.getElementById("zip").value;
    setTimeout(viewData(),3000);
    console.log("generated");
    console.log(`zip code is :${query}`);
});

function drawWeather(data,newDate) {
	var celsius = Math.round(parseFloat(data.main.temp)-273.15);
	var fahrenheit = Math.round(((parseFloat(data.main.temp)-273.15)*1.8)+32);
	document.getElementById('description').innerHTML = data.weather[0].description;
	document.getElementById('temp').innerHTML = celsius + '&deg;';
	document.getElementById('location').innerHTML = data.name;
	document.getElementById('Date').innerHTML =newDate;
}

function viewData(){
    getData(baseUrl,apiKey,query)
        .then(()=>{
            updateUi()
            .then((data)=>{
                drawWeather(data,newDate)
            })
        });
};

const getData=async(baseUrl,apiKey,query)=>{
    const response= await fetch(baseUrl+query+apiKey)
    try{
        const data=await response.json();
        console.log(data);
        postData("/addData",data);
    } catch(error){
        console.log("error:",error);
    }
};

const postData = async ( url = '', data = {})=>{
    console.log(data);
    const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error) {
    console.log("error", error);
    }
};

const updateUi=async()=>{
    const response=await fetch("/all")
    try{
        const allData=await response.json();
        return allData;
    }catch(error){
        console.log("error",error);
    }
};
