import {useState, useEffect} from 'react';
import Dashboard from './Components/Dashboard';

function App() {
  const [permission, setPermission] = useState('');
  const [coords, setCoords] = useState({});

  useEffect(() => {
    if (navigator.geolocation) {
      setPermission(true)
      navigator.geolocation.getCurrentPosition((res) => setCoords({
          latitude: res.coords.latitude,
          longitude: res.coords.longitude
      }));
    } else { 
      setPermission(false)
    }

  }, [])
  return (
    <div className="App">
      <Dashboard permission={permission} coords={coords}/>
    </div>
  );
}

export default App;
