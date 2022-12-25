const container = document.querySelector(".main-container");
const form = document.querySelector("form");
const search = document.querySelector('input[type="text"]');
const loader = document.querySelector(".loading-bar");
const errorImg = document.querySelector("#error");
const windowLoad=document.querySelector("wrapper")



async function FetchData(value) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${value}?include=fcst%2Cobs%2Chistfcst%2Cstats%2Cdays%2Chours%2Ccurrent%2Calerts&key=HTY5DXXLDXYJ2LX56KL22C3P7&options=beta&contentType=json`
    );
    const data = await response.json();
    console.log(data);
    getData(data);
  } catch (err) {
    console.log(err);
    errorImg.removeAttribute("hidden");
    loader.classList.add("active");
  }
}
function getData(resData) {
  const changeHtml = `
    <div class="city">
    <h1>
       ${resData.address}
    </h1>
    <p> ${new Date().toDateString()}</p>
</div>
<div class="data-container grid">
    <div class="condition flex">
        <div class="weather-img ">
            <img src="${getIcon(resData.days[0].icon)}" alt="">

        </div>
        <div class="temp text-center">
            <h2>${changeFtoC(resData.days[0].temp)} °C</h2>
            <p>${resData.days[0].conditions}</p>
        </div>
    </div>
    <div class="other-details text-center">
        <div class="others">
            <h4>${changeFtoC(resData.days[0].feelslike)} °C</h4>
            <span>Feels Like</span>
        </div>
        <div class="others">
            <h4>${changeFtoC(resData.days[0].tempmax)} °C</h4>
            <span>Max Temp.</span>
        </div>
        <div class="others">
            <h4>${changeFtoC(resData.days[0].tempmin)} °C</h4>
            <span>Min Temp.</span>
        </div>
        <div class="others">
            <h4>${resData.days[0].uvindex}</h4>
            <span>UV Index</span>
        </div>
        <div class="others">
            <h4>${resData.days[0].visibility}</h4>
            <span>Visibility</span>
        </div>
        <div class="others">
            <h4>${resData.days[0].windspeed}k/h</h4>
            <span>Wind Speed</span>
        </div>
    </div>
</div>

<div class="forcast">
    <p class="text-center">Next 7 Days Forcast</p>
    <div class="forcast-days-container">
        <div class="days flex text-center">
            <span>${changeIntoDay(resData.days[1].datetime)}</span>
            <img src="${getIcon(resData.days[1].icon)}" alt="">
            <h4>${changeFtoC(resData.days[1].temp)} °C</h4>
        </div>
        <div class="days flex text-center">
            <span>${changeIntoDay(resData.days[2].datetime)}</span>
            <img src="${getIcon(resData.days[2].icon)}" alt="">
            <h4>${changeFtoC(resData.days[2].temp)} °C</h4>
        </div>
        <div class="days flex text-center">
            <span>${changeIntoDay(resData.days[3].datetime)}</span>
            <img src="${getIcon(resData.days[3].icon)}" alt="">
            <h4>${changeFtoC(resData.days[3].temp)} °C</h4>
        </div>
        <div class="days flex text-center">
            <span>${changeIntoDay(resData.days[4].datetime)}</span>
            <img src="${getIcon(resData.days[4].icon)}" alt="">
            <h4>${changeFtoC(resData.days[4].temp)} °C</h4>
        </div>
        <div class="days flex text-center">
            <span>${changeIntoDay(resData.days[5].datetime)}</span>
            <img src="${getIcon(resData.days[5].icon)}" alt="">
            <h4>${changeFtoC(resData.days[5].temp)} °C</h4>
        </div>
        <div class="days flex text-center">
            <span>${changeIntoDay(resData.days[6].datetime)}</span>
            <img src="${getIcon(resData.days[6].icon)}" alt="">
            <h4>${changeFtoC(resData.days[6].temp)} °C</h4>
        </div>
    </div>
</div>
    
    `;

  function changeIntoDay(date) {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let exectDay = new Date(date).getDay();
    return weekday[exectDay];
  }
  function getIcon(value) {
    if (value === "clear-day") {
      return "weatherIcon/icon1.png";
    }
    if (value === "rain") {
      return "weatherIcon/Icon 12.png";
    }
    if (value === "cloudy") {
      return "weatherIcon/Icon 17.png";
    }
    if (value === "partly-cloudy-day") {
      return "weatherIcon/Icon 19.png";
    }
    if (value === "partly-cloudy-night") {
      console.log("partly-cloudy-night");
      return "weatherIcon/2.png";
    }
    if (value === "clear-night") {
      return "weatherIcon/Icon 07.png";
    }
    if (value === "rain") {
      return "images/3.png";
    }
    if (value === "wind") {
      return "images/Wind.png";
    }
    if (value === "snow-showers-day") {
      return "images/clouds-snow.png";
    }
    if (value === "showers-day") {
      return "images/5.png";
    }
    if (value === "showers-night") {
      return "images/Icon 09.png";
    }
    if (value === "thunder-showers-day") {
      return "images/Icon 15.png";
    }
    if (value === "snow") {
      return "images/Snowy.png";
    }
    if (value === "wind") {
      return "images/Wind.png";
    }
    if (value === "wind") {
      return "images/Wind.png";
    }
    if (value === "wind") {
      return "images/Wind.png";
    } else {
      return "https://www.freeiconspng.com/img/25243";
    }
  }
  loader.classList.add("active");
  container.style.display = "block";
  container.innerHTML = changeHtml;
}

form,
  addEventListener("submit", (e) => {
    e.preventDefault();
    errorImg.setAttribute("hidden", "");

    container.style.display = "none";
    loader.classList.remove("active");
    FetchData(search.value);

    search.value = "";
  });

function changeFtoC(value) {
  let inNum = Number(value);
  let FtoC = inNum - 32;
  let newTemp = FtoC * 0.5556;
  return newTemp.toFixed(1);
}
