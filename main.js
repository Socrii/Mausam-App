const apiKey = "b4c0dec6166135cf340f60a239729d50";
const weatherpics = document.querySelector(".weatherpics");

const fetchdata = async () => 
{
    try 
    {
        const citydata = document.getElementById("citybox").value.trim();
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${citydata}&appid=${apiKey}`
       
        const response = await fetch(url);
        if (!response.ok) 
        {    
            console.log('fucked up');
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";            
            throw new Error('Network error');
        }
        else 
        {
            const data = await response.json();
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.floor(data.main.temp-273.15) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + "kmph";
            const mausam = data.weather[0].main;
            if (mausam == "Clouds") {
                weatherpics.src = "clouds.png";
            } else if (mausam == "Rain") {
                weatherpics.src = "rain.png";
            } else if (mausam == "Clear") {
                weatherpics.src = "clear.png";
            } else if (mausam == "Drizzle") {
                weatherpics.src = "drizzle.png";
            } else if (mausam == "Mist") {
                weatherpics.src = "mist.png";
            }
            document.querySelector(".weather").style.display = "block";   
            document.querySelector(".error").style.display = "none";   
        }
    } 
    catch(error) 
    {
        console.log('fucked up again');
        console.error('Error fetching data:', error);        
    }
};

document.getElementById("searchbtn").addEventListener("click", fetchdata);
