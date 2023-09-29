// import React, { useEffect, useRef } from 'react';
// import * as d3 from "d3";
//
//
// export const Chart = () => {
//
//     const data= [
//         {
//             date: "12-23-2023",
//             value: 100
//         },
//         {
//             date: "10-10-2023",
//             value: 500
//         },
//         {
//             date: "11-20-2023",
//             value: 800
//         },
//         {
//             date: "05-09-2023",
//             value: 200
//         },
//         {
//             date: "08-22-2023",
//             value: 800
//         }
//     ];
//     console.log(data)
//
//     const svgRef= useRef();
//
//     useEffect(()=>{
//         // Setting up svg
//         console.log(data)
//         const margin ={ top:20, right:20, bottom:70, left:40},
//             width = 700 - margin.left - margin.right,
//             height = 350 - margin.top - margin.bottom;
//         var parseData=d3.timeParse("%m-%d-%Y");
//         // // "%-m"
//
//         // var month=parseData.getMonth()
//         // var month=data.date.getMonth();
//         // console.log(month)
//
//         //xscales
//         var x= d3.scaleUtc()
//             .rangeRound([0, width])
//             .domain(d3.extent(data, function(d) { return d.date; }));
//
//         //Yscales
//         var y = d3.scaleLinear()
//             .rangeRound([height,0])
//             .domain([0, d3.max(data, function(d) { return d.value; })]);
//
//         data.forEach(function(d){
//             if (parseData(d.date)!=null){
//                 console.log(d.date);
//                 console.log(parseData(d.date));
//                 d.date = parseData(d.date);
//                 d.value = +d.value;
//             };
//         });
//
//         const svg = d3.select(svgRef.current)
//             // .append("svg")
//             //     .attr('width', width + margin.left + margin.right)
//             //     .attr('height', height + margin.top + margin.bottom)
//             //     .style('font-size', '15px')
//             .append('g')
//             .attr('transform',"translate("+ margin.left +","+margin.top+")");
//
//         svg.append('g')
//             .attr('transform',"translate(0," + height + ")")
//             .call(d3.axisBottom(x))
//
//         //Eje Vertical
//         svg.append('g')
//             .call(d3.axisLeft(y))
//         svg.append('text')
//             .attr('fill', '#000')
//             .attr("transform", "rotate(-90)")
//             .attr("y", 6)
//             .attr("dy", "0.71em")
//             .attr("text-anchor", "end")
//             .text("Cantidad");
//
//         //Dibujo de linea  -------------------------//
//
//         const line = d3.line()
//             .x(function(d) { return x(d.date); })
//             .y(function(d) { return y(d.value); })
//             .curve(d3.curveMonotoneX);
//
//         svg.append('path')
//             .datum(data)
//             .attr('fill', 'none')
//             .attr('stroke', "steelblue")
//             .attr("stroke-linejoin", "round")
//             .attr('strokeWidth', 4)
//             .attr("d", line);
//     },[data]);
//
//     return(
//         // <div className="diagram">
//         <svg width="700" height="350" margin="0" id="chart" ref={svgRef}></svg>
//         // </div>
//     );
// }
// export default Chart;
