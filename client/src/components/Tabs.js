import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SimpleTable from './Table.js';
import Tableclass from './Tableclass.js';
import Statistics from './Statistics.js';
// import Heatmap from './Heatmap'
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css';

import UserProblems from './UserProblems.js';

// import './styles.css';
const today = new Date();
const randomValues = getRange(365).map(index => {
  console.log(shiftDate(today,-index));
  return {
    date: shiftDate(today, -index),
    
    count: getRandomInt(1, 3),
  };
});
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class SimpleTabs extends React.Component {
  state = {
    value: 0,
  };
  constructor(props) {
    super(props)
    console.log("From TABS PAGE ");
    // console.log(props);
    
  }
  
  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Recent Submissions" />
            <Tab label="Statistics" />
            <Tab label="HeatMap" />
            <Tab label="Ratings" />
            <Tab label="Solved Problems" />
            <Tab label="Unsolved Problems" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer> <Tableclass subdata={this.props.subdata}/> </TabContainer>}
        {value === 1 && <TabContainer><Statistics subdata={this.props.subdata}/></TabContainer>}
        {value === 2 && <TabContainer><CalendarHeatmap
        startDate={shiftDate(today, -365)}
        endDate={today}
        values={randomValues}
        classForValue={value => {
          if (!value) {
            return 'color-empty';
          }
          return `color-github-${value.count}`;
        }}
        tooltipDataAttrs={value => {
          return {
            'data-tip': `${value.date.toISOString().slice(0, 10)} has count: ${
              value.count
            }`,
          };
        }}
        showWeekdayLabels={true}
        onClick={value => alert(`Clicked on value with count: ${value.count}`)}
      />
      <ReactTooltip />
    }
    
}</TabContainer>}
        {value === 3 && <TabContainer>Ratings</TabContainer>}
        {value === 4 && <TabContainer>Solved Problems<UserProblems subdata={this.props.subdata.solved} /></TabContainer>}
        {value === 5 && <TabContainer>Unsolved Problems<UserProblems subdata={this.props.subdata.unsolved}/></TabContainer>}
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};
function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  // console.log(newDate + " HERE");
  return newDate;
}

function getRange(count) {
  return Array.from({ length: count }, (_, i) => i);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export default withStyles(styles)(SimpleTabs);