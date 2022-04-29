import {useState, useEffect} from 'react';
import Dashboard from './Components/Dashboard';
import {XYPlot, LineSeries} from 'react-vis';
import '../node_modules/react-vis/dist/style.css';

function App() {
  const [permission, setPermission] = useState(false);
  const [coords, setCoords] = useState({});
  const data = [
    {x: 0, y: 8},
    {x: 1, y: 5},
    {x: 2, y: 4},
    {x: 3, y: 9},
    {x: 4, y: 1},
    {x: 5, y: 7},
    {x: 6, y: 6},
    {x: 7, y: 3},
    {x: 8, y: 2},
    {x: 9, y: 0}
  ];
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((res) => {
        setCoords({
          latitude: res.coords.latitude,
          longitude: res.coords.longitude
        });
        setPermission(true);
      });
    } else { 
      setPermission(false)
    }

  }, [])
  return (
    <div className="App">
        <Dashboard coords={coords} permission={permission} /> 
        <XYPlot height={300} width={300}>
          <LineSeries data={data} />
        </XYPlot>
    </div>
  );
}

export default App;
