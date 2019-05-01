import React, { Component } from 'react'
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css';

// import 'react-calendar-heatmap/dist/styles.css';
// import './styles.css';

class Heatmap extends Component {
    
    constructor(props) {
        super(props)
            
        this.state = {
            
        }
    }
    
    render() {
        
        let hg = this.props.subdata.heat_graph;
        let years = ["2018","2019"];
        let data = [];
        for(let yearss in years)
        {
            data.push({
                "year" : years[yearss], 
                "startdate" : years[yearss]+"-01-01T00:00:00Z",
                "enddate" : years[yearss]+"-12-31T00:00:00Z",
                arr : []
            })
        }
        for(let iter in hg)
        {
            for(let i in years)
            {
                if(iter.includes(years[i]))
                {
                   data[i].arr.push({date : new Date(iter) , count : hg[iter]})
                }
        
            }
        }
        console.log(data);
        return (
      <div>
          {data.map((row, id) => (
               <div>  
                <h1> {row.year} </h1>
                <CalendarHeatmap
                startDate={row.startdate}
                endDate={row.enddate}
                values={row.arr}
                classForValue={value => {
                if (!value) {
                    return 'color-empty';
                }
                return `color-github-${value.count}`;
                }}
                tooltipDataAttrs={value => {
                if(value.date)
                {  
                return {
                    'data-tip': `${value.date.toISOString().slice(0, 10)} has submissions: ${
                    value.count
                    }`,
                };
                }
                }}
                showMonthLabels= {true} 
                showWeekdayLabels = {true}
                />
                <ReactTooltip />
                </div>
          ))}
      </div>
    )
  }
}

export default Heatmap
