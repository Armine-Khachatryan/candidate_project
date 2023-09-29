import React from 'react';
import { Bar } from 'react-chartjs-2';
import classes from './BarChart.module.css';

const BarChart = (props) => {

    const barChartData ={
        labels: ['18-24', '25-34', '35-44', '45-54', '55-64'],
        datasets: [
            {
                label: 'Users by age',
                data: props.chartData,
                backgroundColor: '#1DB9CC', // Bar color
                borderColor: 'rgba(75, 192, 192, 1)', // Border color
                borderWidth: 1,
            },
        ],
    }

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const value = context.parsed.y;
                        const total = Object.values(context.chart.data.datasets[0].data).reduce((a, b) => a + b, 0)
                        const percentage = ((value / total) * 100).toFixed(2) + "%";
                        return percentage;
                    },
                },
            },
        },
    };

    return (
        <div className={classes.barStyling}>
            <h2 className={classes.barTitle}>Users by age</h2>
            <Bar data={barChartData} options={options} />
        </div>
    );
};

export default BarChart;
