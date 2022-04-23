import React, {useEffect, useState} from 'react'
import axios from 'axios'
const Dashboard = () => {
    const [coords,setCoords] = useState({
        latitude: '',
        longitude: '',
    })

    const [current, setCurrent] = useState([{
        condition: {
            icon: '',
            textAlign: '',
            code: ''
        },
        last_updated: '',
        temp_c: ''
    }])
    const [location, setLocation] = useState({
        name: '',
        country: '',
        region: '',
        tz_id: '',
        localtime: ''
    })
    const {name, country, region, tz_id, localtime} = location;
    
    useEffect(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((res) => setCoords({
              latitude: res.coords.latitude,
              longitude: res.coords.longitude
          }));
        } else { 
          console.log("Geolocation is not supported by this browser.");
        }
        const {latitude, longitude} = coords;

        
        axios.get("http://api.weatherapi.com/v1/forecast.json?key=a725b42ab3ce4d768bb15630222304&q=" + latitude + "," + longitude + "&days=2")
        .then((res) => {            
            setData(res)
        })
        .catch((err) => console.log("error: ",err))
    }, [])

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

        console.log("data", res.data)
    }
    
  return (
    <div style={{textAlign: 'center'}}>
        {}
    </div>
  )
}

export default Dashboard