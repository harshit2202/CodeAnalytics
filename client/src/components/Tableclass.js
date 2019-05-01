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

class Tableclass extends Component {

    constructor(props) {
      super(props)
        console.log("COnstructor")
    }
   
  render() {
    const { classes } = this.props;
    console.log(this.props.subdata.submissions);
    if(this.props.subdata.submissions.length>0)
    {
      return (
      <div>
          <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="center"><b>Site Profile</b></TableCell>
            <TableCell align="center"><b>Time Of Submission</b></TableCell>
            <TableCell align="center"><b>Problem </b></TableCell>
            <TableCell align="center"><b>Language</b></TableCell>
            <TableCell align="center"><b>Status</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.subdata.submissions.map((row, id) => (
            <TableRow key={id}>
              <TableCell align="center">Codeforces</TableCell>
              <TableCell align="center">{row.time}</TableCell>
              <TableCell align="center"><a href={row.problem.link}>{row.problem.name}</a></TableCell>
              <TableCell align="center">{row.language}</TableCell>
              <TableCell align="center">{row.verdict}</TableCell>
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

Tableclass.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(Tableclass)
