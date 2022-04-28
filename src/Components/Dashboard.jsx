import React, {useEffect, useState} from 'react';
import axios from 'axios';
import moment from 'moment';
import icon from '../Images/icon.jpg'
const Dashboard = ({coords, permission}) => {
    const {latitude, longitude} = coords;
    const [place, setPlace] = useState('')
    const [forecast, setForecast] = useState({});

    const [current, setCurrent] = useState([{
        condition: {
            icon: '',
            textAlign: '',
            code: ''
        },
        last_updated: '',
        temp_c: ''
    }]);
    const {temp_c} = current;

    const [location, setLocation] = useState({
        name: '',
        country: '',
        region: '',
        tz_id: '',
        localtime: ''
    });
    const {name, country, localtime} = location;

    
    useEffect((permission) => {
        
        if(permission === true){
            getWeather(); 
        }
    });

    const getWeather = (latitude, longitude) => {
        axios.get("http://api.weatherapi.com/v1/forecast.json?key=a725b42ab3ce4d768bb15630222304&q=" + latitude + "," + longitude + "&days=2")
        .then((res) => {            
            setData(res)
            console.log("rrr", res.data)
        })
        .catch((err) => console.log("error: ",err))
    }
    
    if(place.length > 0) {
        axios.get("http://api.weatherapi.com/v1/forecast.json?key=a725b42ab3ce4d768bb15630222304&q=" + place + "&days=2")
        .then((res) => {            
            setData(res)
        })
        .catch((err) => console.log("error: ",err));
    }
    else { getWeather(latitude, longitude) };

    const setData = (res) => {
        const {name, region, country, tz_id, localtime} = res.data.location;
        const {temp_c, last_updated, current_condition} = res.data.current
        setLocation({
            name,
            region,
            country,
            tz_id,
            localtime
        })
        setCurrent({
            temp_c, last_updated, current_condition
        })
        setForecast(res.data.forecast.forecastday)
        console.log("xx",res.data)
    }


    const searchWeather = (place) => {
        axios.get("http://api.weatherapi.com/v1/forecast.json?key=a725b42ab3ce4d768bb15630222304&q=" + place + "&days=2")
        .then((res) => {            
            setData(res)
        })
        .catch((err) => console.log("error: ",err));
    }
    return (
        <div className="container" >
            {forecast.length > 0 ? 
                <div>                
                    <div className="card" style={{textAlign: 'center', marginTop:'2em'}}>
                        <div>
                            <input type="button" class="w3-button w3-orange inline-border text-white" value={place} onClick={searchWeather}/>aa
                            <input type="text" placeholder="Search city" className="w3-input" value={place} onChange={(e) => setPlace(e.target.value)} style={{display: 'inline-block',paddingLeft: '1em', paddingTop:'0.4em',width:'30%',marginBottom:'1em', marginLeft:'.5em', backgroundColor: '#F1F3F4',}}/>
                        </div>
                        <h4>{moment(localtime).format('dddd, h:mma')}</h4>    
                        <h3 style={{fontSize:'80px'}}>
                            {name}, {country.indexOf(' ') > 0  ? country.match(/(\b\S)?/g).join("").toUpperCase().slice(0, 3) : country.slice(0, 3)}
                        </h3>
                        <p style={{fontSize:'55px', textAlign:'center', marginTop:'-0.5em'}}>
                            <img src={forecast.length > 1 && forecast[0].day.condition.icon} alt="Avatar" className="" style={{width:"10%"}} />
                            {temp_c}°C
                        </p>
                    </div>
                    <div style={userStyle}>
                        { forecast.length > 0 && forecast.map((f) => (
                            <div style={{textAlign: 'center'}}>
                                <h4>{moment(f.date).format('dddd')}</h4>
                                <h1>max {f.day.maxtemp_c}°C</h1>
                                <h6>
                                    Rain: {f.day.daily_chance_of_rain}%
                                </h6>
                                <h6>
                                    Wind: {f.day.maxwind_kph} kph
                                    {/* {f.day.condition.text} */}
                                </h6>
                            </div>
                        ))}
                    </div> 
                </div> :
                <div>
                    <div>                
                    <div className="card" style={{textAlign: 'center', marginTop:'2em'}}>
                        <div>
                            <input type="text" placeholder="Search city" className="w3-input" value={place} onChange={(e) => setPlace(e.target.value)} style={{display: 'inline-block',paddingLeft: '1em', paddingTop:'0.4em',width:'30%',marginBottom:'1em', marginLeft:'.5em', backgroundColor: '#F1F3F4',}}/>
                        </div>
                        <h3 style={{fontSize:'80px', textColor: 'red'}}>
                            Insta Weather
                        </h3>
                        <p style={{fontSize:'55px', textAlign:'center', marginTop:'-0.5em'}}>
                            <img src={icon} alt="Avatar" className="" style={{width:"10%"}} />
                            {temp_c}°C
                        </p>
                    </div>
                    
                </div>
                </div>
            }
                
        </div>
        
        
    )
}

const userStyle = {
    width: '50%',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridColumnGap: '1em',
    marginTop: '5em', 
    margin: 'auto'
}
export default Dashboard