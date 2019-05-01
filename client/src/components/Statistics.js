import React, { Component } from 'react'
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Statistics extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         
      }
    }
    

    render() {
    let submissions = this.props.subdata.tagspie;
    console.log(submissions);
    let datapoints = [];
    let total=0
    for(var key in submissions)
    {
        if(!key.includes('0'))
            total=total+submissions[key];
    }
    for(var key in submissions)
    {
        if(!key.includes('0'))
        {
            var val = submissions[key];
            datapoints.push({y : (submissions[key]*100)/total , label : key})
        }
    }
    let submissions2 = this.props.subdata.verdictspie
    let datapoints2 = [];
    let total2=0
    for(var key in submissions2)
    {
        total2=total2+submissions2[key];
    }
    for(var key in submissions2)
    {
        var val = submissions2[key];
        console.log(key + "  "  + submissions2[key]);
        datapoints2.push({y : (submissions2[key]*100)/total2 , label : key})
    }
    const options = {
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "Tags"
        },
        data: [{
            type: "pie",
            startAngle: 0,
            toolTipContent: "<b>{label}</b>: {y}%",
            // showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: datapoints
        }]
    }
    const options2 = {
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "Verdicts"
        },
        data: [{
            type: "pie",
            startAngle: 0,
            toolTipContent: "<b>{label}</b>: {y}%",
            // showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: datapoints2
        }]
    }
    return (
    <div>
        <CanvasJSChart options = {options}
            /* onRef={ref => this.chart = ref} */
        />
        <br / >
        <CanvasJSChart options = {options2}
            /* onRef={ref => this.chart = ref} */
        />
    </div>
    );
  }
}

export default Statistics
