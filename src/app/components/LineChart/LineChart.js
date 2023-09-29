import React from "react";
import {CategoryScale} from 'chart.js';
import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";



function LineChart(props) {

    const lineChartData = {
        // labels: ["2016", "2017", "2018", "2019", "2020", "2023", "2025"],
        datasets: [
            {
                label: "Users Gained",
                data:props.chartData,
                // data: [0, 20,  40, 160, 20, 100, 120, 140, 160, 180], // Y-axis data points
                borderColor: "rgba(75, 192, 192, 1)", // Line color
                // fill: true,
                // tension: 0.1
            },
        ],
    };


    return (
        <div className="chart-container">
            {/*<h2 style={{ textAlign: "center" }}>Line Chart</h2>*/}
            <Line
                data={lineChartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            // text: "Users Gained between 2016-2020"
                        },
                        legend: {
                            display: false
                        }
                    }
                }}
            />
        </div>
    );
}
export default LineChart;