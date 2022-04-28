import {useState, useEffect} from 'react';
// import Dashboard from './Components/Dashboard';
import axios from 'axios';
function App() {
  // const [permission, setPermission] = useState(false);
  const [coords, setCoords] = useState({});
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((res) => {
        // setPermission(true);
        setCoords({
          latitude: res.coords.latitude,
          longitude: res.coords.longitude
        });
        
        axios.get("http://api.weatherapi.com/v1/forecast.json?key=a725b42ab3ce4d768bb15630222304&q=" + coords.latitude + "," + coords.longitude + "&days=2")
        .then((res) => {            
            // setData(res)
            console.log("rrr", res.data)
        })
        .catch((err) => console.log("error: ",err))
      });
    } else { 
      // setPermission(false)
    }
  }, [coords])
  return (
    <div className="App">
        {/* <Dashboard coords={coords} permission={permission}/> :  */}
        
        <h1>TEST</h1>
    </div>
  );
}

export default App;
