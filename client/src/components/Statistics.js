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
    
    let submissions = this.props.subdata;
    let datapoints = [];
    var map = new Map();
    console.log(submissions);
    for(let i=0;i<submissions.length;i++)
    {
        if(map.has(submissions[i].submissionStatus))
        {
            var pval = map.get(submissions[i].submissionStatus);
            map.set(submissions[i].submissionStatus,pval+1);      
        }
        else
        {
            map.set(submissions[i].submissionStatus,1);
        }
        console.log(submissions[i].submissionStatus);
    }
    console.log(map);
    var total=submissions.length;
    var c=0;
    for(var ke of map.keys())
    {
        // datapoints.push("hello");
        console.log((map.get(ke)*100)/total);
        datapoints.push({y : (map.get(ke)*100)/total , label : ke});
    }
    console.log(datapoints);
    const options = {
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "Verdicts"
        },
        data: [{
            type: "pie",
            startAngle: 0,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: datapoints
        }]
    }
    return (
    <div>
        <CanvasJSChart options = {options}
            /* onRef={ref => this.chart = ref} */
        />
        
    </div>
    );
  }
}

export default Statistics
