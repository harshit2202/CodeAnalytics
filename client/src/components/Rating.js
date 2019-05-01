import React, { Component } from 'react'
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Rating extends Component {

  
  render() {
        let data = this.props.subdata.rating_graph;
        let datapoints = []
        let c=1;
        console.log(data);
        for(let i=0;i<data.length-1;i++)
        {
            console.log(i);
            console.log(data[i]);
            datapoints.push({x : i+1,y : parseInt(data[i], 10)});
            c=c+1;
        }
        console.log(datapoints);
        const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "ligh1", // "light1", "dark1", "dark2"
        title:{
            text: "Contest Ratings"
        },
        axisY: {
            title: "Rating",
            includeZero: false,
            suffix: ""
        },
        axisX: {
            title: "Contest Number",
            prefix: "C",
            interval: 1
        },
        data: [{
            type: "line",
            toolTipContent: "Contest {x}: {y}",
            dataPoints: datapoints
        }]
    }
    return (
    <div>
        <CanvasJSChart options = {options}
            /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
    );
  }
}

export default Rating
