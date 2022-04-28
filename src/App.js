import {useState, useEffect} from 'react';
import Dashboard from './Components/Dashboard';

function App() {
  const [permission, setPermission] = useState(false);
  const [coords, setCoords] = useState({});
  useEffect(() => {
    console.log('helllo')
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((res) => {
        setPermission(true);
        setCoords({
          latitude: res.coords.latitude,
          longitude: res.coords.longitude
        });
        console.log("2. ",coords)
      });
    } else { 
      setPermission(false)
    }
    console.log("1. ",coords)
  }, [])
  return (
    <div className="App">
        {/* <Dashboard coords={coords} permission={permission}/> :  */}
        
        <h1>TEST</h1>
    </div>
  );
}

export default App;
