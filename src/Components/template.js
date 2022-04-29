import React, {useEffect, useState} from 'react';
import axios from 'axios';
// import '../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries} from 'react-vis';

const Charti = ({coords}) => {
    
    // const [weather, setWeather] = useState([]);
    // const [time, setTime] = useState([])
    // const [dataSet, setDataSet] = useState([])
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
    // useEffect(() => {
    //     axios.get("http://api.weatherapi.com/v1/forecast.json?key=a725b42ab3ce4d768bb15630222304&q=" + coords.latitude + "," + coords.longitude + "&days=2")
    //     .then((res) => {
    //         setWeather(res.data.forecast.forecastday)
    //         const x = weather.map((d) => d.hour.map((x) => x.time));
    //         const y = weather.map((d) => d.day.maxtemp_c);
    //         setChartData({
    //             labels: y,
    //             data:  x
    //         })
    //         console.log(chartData)

    //     })
    //     .catch(err => console.log(err))
    // })
  return (
    <div>
        <h1>Chart</h1>
        <XYPlot height={300} width={300}>
          <LineSeries data={data} />
        </XYPlot>
    </div>
  )
}

export default Charti;