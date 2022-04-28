import React, {useEffect, useState} from 'react';
// import { Doughnut, Line, Bar } from 'react-chartjs-2';
import axios from 'axios';

const Chart = ({coords}) => {
    
    const [data, setData] = useState([]);
    const [time, setTime] = useState([])
    const [dataSet, setDataSet] = useState([])
    const [chartData, setChartData] = useState({
        labels: []
    })
    useEffect(() => {
        axios.get("http://api.weatherapi.com/v1/forecast.json?key=a725b42ab3ce4d768bb15630222304&q=" + coords.latitude + "," + coords.longitude + "&days=2")
        .then((res) => {
            setData(res.data.forecast.forecastday)
            console.log(data.map((d) => d.hour.map((x) => x.time)))
        })
        .catch(err => console.log(err))
    }, [])
  return (
    <div>Chart
        
    </div>
  )
}

export default Chart;