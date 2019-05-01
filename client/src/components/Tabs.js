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
import UserProblems from './UserProblems.js';
import Heatmap from './Heatmap.js';
import Rating from './Rating.js';

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
        {value === 2 && <TabContainer><Heatmap subdata={this.props.subdata}></Heatmap></TabContainer>}
        {value === 3 && <TabContainer><Rating /></TabContainer>}
        {value === 4 && <TabContainer>Solved Problems<UserProblems subdata={this.props.subdata.solved} /></TabContainer>}
        {value === 5 && <TabContainer>Unsolved Problems<UserProblems subdata={this.props.subdata.unsolved}/></TabContainer>}
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);