import React, {Fragment, useEffect, useState} from 'react';
import axios from 'axios';
import moment from 'moment';
import icon from '../Images/icon.jpg';

const Dashboard = ({coords}) => {
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
            axios.get("https://api.weatherapi.com/v1/forecast.json?key=a725b42ab3ce4d768bb15630222304&q=" + latitude + "," + longitude + "&days=2")
            .then((res) => setData(res))
            .catch(err => console.log(err))
        }
    }, [latitude,longitude]);

    const getWeather =  (latitude, longitude) => {
        axios.get("https://api.weatherapi.com/v1/forecast.json?key=a725b42ab3ce4d768bb15630222304&q=" + latitude + "," + longitude + "&days=2")
        .then((res) => setData(res))
        .catch(err => console.log(err))
    }

    if(place.length > 0) {
        axios.get("https://api.weatherapi.com/v1/forecast.json?key=a725b42ab3ce4d768bb15630222304&q=" + place + "&days=2")
        .then((res) => {setData(res)})
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
    }

    return (
        <div className="container" >
            {forecast.length > 0 ? 
                <div>                
                    <div style={{textAlign: 'center', marginTop:'2em'}}>
                        {/* <input type="button" class="w3-button w3-orange inline-border text-white" value={place} onClick={searchWeather} placeholder="Search city"/> */}
                        <input type="text" placeholder="Search city" className="w3-input" value={place} onChange={(e) => setPlace(e.target.value)} style={{margin:'auto',display: 'inline-block', width: '45%',paddingLeft: '1em', paddingTop:'0.4em',marginBottom:'1em', backgroundColor: '#F1F3F4', borderRadius:'50px'}}/>
                    </div>
                    <div className="card" style={{textAlign: 'center',margin:'auto', marginTop:'2em',width: '60%'}}>
                        <h1 >
                            {name}, {country.indexOf(' ') > 0  ? country.match(/(\b\S)?/g).join("").toUpperCase().slice(0, 3) : country.slice(0, 3)}
                        </h1>
                        <h4>{moment(localtime).format('dddd, h:mma')}</h4>    
                        <p style={{fontSize:'55px', textAlign:'center', marginTop:'-0.5em', color:'orange'}}>
                            <img src={forecast.length > 1 && forecast[0].day.condition.icon} alt="Avatar" className="" style={{width:"10%"}} />
                            {temp_c}°C
                        </p>
                    </div>
                    <div>
                        {forecast.length > 0 && forecast.map((f) => (
                            <Fragment>
                            <div style={{textAlign: 'center', backgroundColor: 'black', opacity:'0.5'}}>
                                <h2>{moment(f.date).format('dddd')}</h2>
                                max<h1 style={{display: 'inline-block', color:'orange'}}> 
                                    {f.day.maxtemp_c}°C
                                </h1>
                                <div>
                                    Rain: <h4 style={{display: 'inline-block', color:'orange'}}>
                                        {f.day.daily_chance_of_rain}%
                                    </h4>
                                </div>
                                <div>
                                    Wind: <h4 style={{display: 'inline-block', color:'orange'}}>
                                        {f.day.maxwind_kph} kph
                                    </h4>
                                </div>
                            </div>
                            </Fragment>
                        ))}
                    </div> 
                </div> :
                <div>
                    <div className="card" style={{textAlign: 'center', marginTop:'2em'}}>
                        <div>
                            <input type="text" placeholder="Search city" className="w3-input" value={place} onChange={(e) => setPlace(e.target.value)} style={{display: 'inline-block',paddingLeft: '1em', paddingTop:'0.4em',width:'45%',marginBottom:'1em',  backgroundColor: '#F1F3F4', borderRadius: '50px'}}/>
                        </div>
                        <h3 style={{fontSize:'80px', textColor: 'red'}}>
                            Instant React Weather
                        </h3>
                        <p style={{fontSize:'55px', textAlign:'center', marginTop:'-0.5em'}}>
                            <img src={icon} alt="Avatar" className="" style={{width:"10%"}} />
                            {temp_c}°C
                        </p>
                    </div>
                </div>
            }
        </div>
    )
}


export default Dashboard;