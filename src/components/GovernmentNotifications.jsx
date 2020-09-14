import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios';
import { Table,Grid, TableBody, TableCell, TableContainer,
         TablePagination, TableRow, Paper,
         Typography, TableHead} from '@material-ui/core';

import {apiEndpoints} from '../helpers/endpoints'

const useStyles = makeStyles(theme => ({
    grid : {
        width: '100%',
    }, 
    paper: {
        padding: theme.spacing(3)
    },
    root: {
        width: '100%',
      },
    container: {
        maxHeight: 600,
        },
}));

const columns = [
    { id: 'date', label: 'Date', minWidth: 100 },
    { id: 'title', label: 'Report Title', minWidth: 170 },
];
  
export default function GovernmentNotifications()  {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [notificationList, notificationListChange] = useState([]);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    useEffect(() => {
        async function getNotificationList() {
        const notificationApiResponse = await axios.get(apiEndpoints.NOTIFICATIONS);    
        notificationListChange(notificationApiResponse.data.data.notifications);
        }
        getNotificationList();
    },[]);
    console.log(notificationList);
    const validNotificationList = notificationList.filter(({title, link}) => {
        const date = title.slice(0,title.indexOf(" "));
        return !isNaN(Date.parse(date)) && date.length > 5;
    }).map(({title, link}) => {
        const separationIndex = title.indexOf(" ");
        return {
            id: title,
            link,
            date: title.slice(0, separationIndex),
            title: title.slice(separationIndex),
        }
    });
    
    return (
        <Grid container spacing={4} direction="column" alignItems="center" className={classes.grid}>
            <Grid item xs={12}>
                <Typography variant="h1">
                    Latest Reports
                </Typography>
            </Grid>
            <Grid item>
            <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="center"
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {validNotificationList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(({id, link, title, date}) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1}  component="a" href={link} target="_blank">
                        <TableCell  align="center">
                          {date}
                        </TableCell>
                        <TableCell  align="center">
                          {title}
                        </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={validNotificationList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </Paper>
            </Grid>
        </Grid>
        );
}
