// const state = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura", "Uttarakhand", "Uttar Pradesh", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Puducherry" ];
const states = [ ["Andhra Pradesh", "AP"], ["Arunachal Pradesh", "AR"], ["Assam", "AS"], ["Bihar", "BR"], ["Chhattisgarh", "CG"], ["Goa", "GA"], ["Gujarat", "GJ"], ["Haryana", "HR"], ["Himachal Pradesh", "HP"], ["Jammu and Kashmir", "JK"], ["Jharkhand", "JH"], ["Karnataka", "KA"], ["Kerala", "KL"], ["Madhya Pradesh", "MP"], ["Maharashtra", "MH"], ["Manipur", "MN"], ["Meghalaya", "ML"], ["Mizoram", "MZ"], ["Nagaland", "NL"], ["Odisha", "OD"], ["Punjab", "PB"], ["Rajasthan", "RJ"], ["Sikkim", "SK"], ["Tamil Nadu", "TN"], ["Tripura", "TR"], ["Uttarakhand", "UK"], ["Uttar Pradesh", "UP"], ["West Bengal", "WB"], ["Andaman and Nicobar Islands", "AN"], ["Chandigarh", "CH"], ["Dadra and Nagar Haveli", "DN"], ["Daman and Diu", "DD"], ["Delhi", "DL"], ["Puducherry", "PY"] ];

const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
const displayWeather = document.querySelector('.user-info-container');
displayWeather.classList.add('hide');
var prevSelected = null;

const dropdownContent = document.querySelector('.dropdown-content');
dropdownContent.classList.add('hide');
for(let i=0;i<states.length;i++){
    const childElem = document.createElement('a');
    // console.log("hello");
    childElem.textContent=states[i][0];
    childElem.className=states[i][1];
    childElem.setAttribute('href', '');
    dropdownContent.appendChild(childElem);
}
const loadingScreen = document.querySelector('.loading');
loadingScreen.classList.add('hide');
const anchors = document.querySelectorAll('a');
function addEventListenersToAnchors(){
    anchors.forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            loadingScreen.classList.remove('hide');
            dropdownContent.classList.add('hide');
            // displayWeather.classList.remove('hide');
            
            if(prevSelected) {
                prevSelected.classList.remove('selected');
            }
            anchor.classList.add('selected');
            prevSelected = anchor;
            //anchors.forEach(a => a != anchor ? a.classList.remove('selected') : a.classList.add('selected'));
            
            weather(anchor.textContent);
            // console.log(anchor);
        })
    });
}
addEventListenersToAnchors();

// console.log(dropdownContent);
const dropMain = document.querySelector('.dropdown');
dropMain.addEventListener('mouseenter',()=>{
    dropdownContent.classList.remove('hide');
})

dropMain.addEventListener('mouseleave',()=>{
    dropdownContent.classList.add('hide');
})

async function weather(city){
    try{
        console.log(city);
        // url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        // console.log("fetching data using url " + url);
        // const response = await fetch(url);
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        separate(data);
    }
    catch(err){
        console.log(err);
    }
}

async function separate(data){
    const cityName = document.querySelector('#citynaam');
    const countryIcon = document.querySelector('#countryicon');
    const desc = document.querySelector("#weatherdesc");
    const weatherIcon = document.querySelector("#weathericon");
    const temp = document.querySelector("#temperature");
    const windspeed = document.querySelector("#windspeed");
    const humidity = document.querySelector("#humidity");
    const cloudiness = document.querySelector("#cloudiness");

    // console.log(data);

    //fetch values from weatherINfo object and put it UI elements
    cityName.innerText = data?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
    desc.innerText = data?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`;
    temp.innerText = `${data?.main?.temp} °C`;
    windspeed.innerText = `${data?.wind?.speed} m/s`;
    humidity.innerText = `${data?.main?.humidity}%`;
    cloudiness.innerText = `${data?.clouds?.all}%`;

    loadingScreen.classList.add('hide');
    displayWeather.classList.remove('hide');
}