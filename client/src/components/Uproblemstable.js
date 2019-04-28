import React , {Component}  from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class UProblemstable extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
          
      }
    }
    
   
  render() {
    const { classes } = this.props;
    console.log(this.props.subdata);
    if(this.props.subdata.length>0)
    {
      return (
      <div>
          <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="center">Site Profile</TableCell>
            <TableCell align="center">Solved Problems</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.subdata.map((row, id) => (
            <TableRow key={id}>
              <TableCell align="center">Codeforces</TableCell>
              <TableCell align="center"><a href={`/problempage/${row.questionID}`}>Problem</a></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
      </div>
    )
          }
          else{
            return (
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
            )
          }
  }
}

UProblemstable.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(UProblemstable)
