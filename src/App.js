import {useState, useEffect} from 'react';
import Dashboard from './Components/Dashboard';

function App() {
  const [permission, setPermission] = useState(false);
  const [coords, setCoords] = useState({});
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((res) => {
        setPermission(true);
        setCoords({
          latitude: res.coords.latitude,
          longitude: res.coords.longitude
        });
        
      });
    } else { 
      setPermission(false)
    }

  }, [])
  return (
    <div className="App">
        <Dashboard coords={coords} permission={permission}/> : 
        
        
    </div>
  );
}

export default App;
