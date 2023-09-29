import React from "react";
import {CategoryScale} from 'chart.js';
import Chart from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
import classes from './PieChart.module.css';


const PieChart =(props) => {
    let labels =[];
    let values=[];
    let arr=props.chartData;
    for(let i=0; i<arr.length; i++){
        labels.push( ... Object.keys(arr[i]))
        values.push(...Object.values(arr[i]))
    }


    // for (let [key, value] of Object.entries(props.chartData)) {
    //     labels.push(value)
    // }

    const pieChartData = {
        labels: labels,
        datasets: [
            {
                // label:labels,
                data: values,
                backgroundColor: ['#ED6BB4', '#1790A6', '#EC873F', '#1DB9CC', '#5F9EA0','#556B2F'],
                hoverBackgroundColor: ['#ED6BB4', '#1790A6', '#EC873F', '#1DB9CC', '#5F9EA0', '#556B2F'],
            },
        ],
    };

    const tooltipCallback = (tooltipItem) => {
        const dataset = pieChartData.datasets[tooltipItem.datasetIndex];
        const total = dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue);
        const currentValue = dataset.data[tooltipItem.dataIndex];
        const percentage = ((currentValue / total) * 100).toFixed(2);
        return ` ${percentage}%`;
    };

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: tooltipCallback,
                },
            },
        },
    };

    return (
        <div className={classes.pieStyle}>
            <h2 className={classes.pieTitle}>Users by gender</h2>
            <Pie data={pieChartData}
                 options={options}
            />
        </div>
    );
};

export default PieChart;