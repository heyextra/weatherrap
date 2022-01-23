import React, { useState } from 'react';






const api = { 
  key: "36d482a7a9c845e73c6ca8ab30a7eae0",
  base: "https://api.openweathermap.org/data/2.5/"
}

const apiRap = {
  base: "https://public.opendatasoft.com/api/records/1.0/search/?dataset=rapworld&q=",
  end: "&facet=location_city&facet=location_neighborhood&facet=name&refine.location_city="
}
function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [rapper, setRapper] = useState({});
  const [randomRapper, setRandomRapper] = useState(0)
  
  const a = (max) => {
    const min = 0;
    return Math.floor(Math.random() * (max-min) + min)
    
  }
 


  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
         
        })
      fetch(`${apiRap.base}${query}`)
      .then(result2 => result2.json())
      .then(data => {
        setRapper(data);
        setQuery('')
      })
      setRandomRapper(a(rapper.records.length))
     }
   
  }
 
  // const rapperMatch = evt => {
  //   if (evt.key === "Enter"){
  //     const city = query.replaceAll("\\s", "-");
  //   const response = fetch(`${apiRap.base}${city}${apiRap.end}`)
  //     .then(result => result.json())
  //     .then(data => {
  //       setRapper(data);
  //       console.log(data);
  //     })
  // }}

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }



  return (
    <div className={(typeof weather.main != "undefined")
    ? ((weather.main.temp < 50) ? 'app cold' : 'app') : 'app'}>
     <main>
       <div className="search-box">
         <input 
         type="text"
        className="search-bar"
        placeholder="Search..."
        onChange={e => setQuery(e.target.value)}
        value={query}
        onKeyPress={search}
        
        />
       </div>
       {(typeof weather.main != "undefined" ?(
         <div>
       <div className="location-box">
         <div className="location">{weather.name}, {weather.sys.country}</div>
         <div className="date">{dateBuilder(new Date())}</div> 
       </div>
       <div className="weather-box">
         <div className="weather">{weather.weather[0].main}</div>
          <div className="temperature">
           {Math.round(weather.main.temp)}°f
          </div>
       </div>
       </div>
       ) : (''))}
       {(typeof rapper.records != "undefined" ?(
         <div>
       <div className="rapper-box">
         <div className="rapper">
         {(typeof rapper.records[0] != "undefined") ?( rapper.records[randomRapper].fields.name ) : ('Yall dont have any rappers')} 
         </div>
          <div className="neighborhood">
          {(typeof rapper.records[0] != "undefined") ?( rapper.records[randomRapper].fields.location_neighborhood ) : ('')} 
           </div>
       </div>
       </div>
       ) : (''))}

     </main>
    </div>
  );
}

export default App;
