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

class UserProblems extends Component {

    constructor(props) {
      super(props)
        console.log("COnstructor")
    }
   
  render() {
    const { classes } = this.props;
    console.log(this.props.subdata.submissions);
    if(this.props.subdata.length>0)
    {
      return (
      <div>
          <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="center">Site Profile</TableCell>
            <TableCell align="center">Problem Name</TableCell>
            <TableCell align="center">Problem Link</TableCell>
            <TableCell align="center">Tags</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.subdata.map((row, id) => (
            <TableRow key={id}>
              <TableCell align="center">CodeChef</TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center"><a href={row.link}>{row.link}</a></TableCell>
              <TableCell align="center">{row.tags[0]}</TableCell>
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

UserProblems.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(UserProblems)
