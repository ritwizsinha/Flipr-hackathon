import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {makeStyles} from '@material-ui/core/styles';
import {apiEndpoints} from '../helpers/endpoints';
import { Grid, Typography, Paper, Table,
        TableContainer, TableCell, TableRow, TablePagination,
        FormControl, FormHelperText, NativeSelect,InputLabel,
        TableBody, TableHead} from '@material-ui/core';

const hospitalColumns = [
    {id: 'state', label: 'State', minWidth:100},
    {id: 'ruralBeds', label: 'Rural Beds', minWidth:100},
    {id: 'ruralHospitals', label: 'Rural Hospitals', minWidth:100},
    {id: 'urbanBeds', label: 'Urban Beds', minWidth:100},
    {id: 'urbanHospitals', label: 'Urban Hospitals', minWidth:100},
    {id: 'totalBeds', label: 'Total Beds', minWidth:100},
    {id: 'totalHospitals', label: 'Total Hospitals', minWidth:100},
];

const medicalCollegeColumns = [
    {id: 'name', label: 'Institute Name', minWidth:100},
    {id: 'state', label: 'State', minWidth: 100},
    {id: 'city', label: 'City', minWidth: 100},
    {id: 'ownership', label: 'Ownership', minWidth: 100},
    {id: 'admissionCapacity', label: 'Capacity', minWidth: 100},
    {id: 'hospitalBeds', label: 'Beds', minWidth: 100}
]
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
    typographyPadding: {
        padding: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
}));

const states = [ "Andhra Pradesh",
                "Arunachal Pradesh",
                "Assam",
                "Bihar",
                "Chhattisgarh",
                "Goa",
                "Gujarat",
                "Haryana",
                "Himachal Pradesh",
                "Jammu and Kashmir",
                "Jharkhand",
                "Karnataka",
                "Kerala",
                "Madhya Pradesh",
                "Maharashtra",
                "Manipur",
                "Meghalaya",
                "Mizoram",
                "Nagaland",
                "Odisha",
                "Punjab",
                "Rajasthan",
                "Sikkim",
                "Tamil Nadu",
                "Telangana",
                "Tripura",
                "Uttarakhand",
                "Uttar Pradesh",
                "West Bengal",
                "Andaman and Nicobar Islands",
                "Chandigarh",
                "Dadra and Nagar Haveli",
                "Daman and Diu",
                "Delhi",
                "Lakshadweep",
                "Puducherry"]

const ownerships = [
                "Govt.",
                "Trust",
                "Society",
                "University",
                "Govt-Society",
                "Private"
];

export default function HospitalBeds() {
    const classes = useStyles();
    const [hospitalBeds, hospitalBedsChange] = useState([]);
    const [totalMedicalCollegeBeds, totalMedicalCollegeBedsChange] = useState([]);
    const [totalHospitalBeds, totalHospitalBedsChange] = useState([]);
    const [medicalCollegeBeds, medicalCollegeBedsChange] = useState([]);
    const [hospitalpage, hospitalsetPage] = useState(0);
    const [hospitalrowsPerPage, hospitalsetRowsPerPage] = useState(10);
    const [medicalCollegePage, medicalCollegeSetPage] = useState(0);
    const [medicalCollegeRowsPerPage, medicalCollegeSetRowsPerPage] = useState(10);
    const [searchTerm, searchTermSet] = useState('all');
    const [ownership, ownershipSet] = useState('all');
    
    const handleChangeSearchTerm = (event) => {
        const state = event.target.value;
        medicalCollegeBedsChange(totalMedicalCollegeBeds.filter(item => filterOnOwnerShipAndState(state,ownership,item)));
        hospitalBedsChange(totalHospitalBeds.filter(item=> item.state === state || state === "all"));
        searchTermSet(state);
    };
    const filterOnOwnerShipAndState = (curState, curOwnerShip, item) => {
            if(curOwnerShip=== "all" && curState === "all") return true;
            if(curOwnerShip=== "all") {
                if(curState === item.state) return true;
                return false;
            } 
            if(curState === "all") {
                if(curOwnerShip=== item.ownership) return true;
                return false;
            }
            if(curState === item.state && curOwnerShip=== item.ownership) return true; 
            return false;
    }
    const handleOwnershipSet = (event) => {
        const ownership = event.target.value;
        medicalCollegeBedsChange(totalMedicalCollegeBeds.filter(item => 
            filterOnOwnerShipAndState(searchTerm, ownership, item)
        ));
        ownershipSet(ownership);
        window.scrollTo(0,document.body.scrollHeight);
    }
  
    const hospitalhandleChangePage = (newPage) => {
      hospitalsetPage(newPage);
    };
  
    const hospitalhandleChangeRowsPerPage = (event) => {
      hospitalsetRowsPerPage(+event.target.value);
      hospitalsetPage(0);
    };
    const medicalCollegeHandleChangePage = (event, newPage) => {
        medicalCollegeSetPage(newPage);
      };
    
    const medicalCollegeHandleChangeRowsPerPage = (event) => {
        medicalCollegeSetRowsPerPage(+event.target.value);
        medicalCollegeSetPage(0);
    };

    useEffect(() => {
        async function getBedDist() {
            const hospitalBeds = await axios.get(apiEndpoints.HOSPITAL_BEDS);
            const medicalCollegeBeds = await axios.get(apiEndpoints.MEDICAL_COLLEGES_BEDS);
            hospitalBedsChange(hospitalBeds.data.data.regional);
            medicalCollegeBedsChange(medicalCollegeBeds.data.data.medicalColleges);
            totalHospitalBedsChange(hospitalBeds.data.data.regional);
            totalMedicalCollegeBedsChange(medicalCollegeBeds.data.data.medicalColleges);
        }
        getBedDist();
    },[]);
        return (
            <Grid container spacing={4} direction="column" alignItems="center" alignContent="center">
                <Grid item xs={12}>
                    <Typography variant="h1">
                        Hospital Statistics
                    </Typography>
                </Grid>
                <Grid container item xs={12} alignItems="center">
                    <Grid item xs={1} />
                    <Grid item xs={5} >
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="state-native-helper">State Name</InputLabel>
                            <NativeSelect
                                value={searchTerm} 
                                onChange={handleChangeSearchTerm}
                                inputProps={{ 
                                    name: 'state',
                                    id: 'state-native-helper',
                                }}    
                            >
                                <option aria-label="None" value="all">All</option>
                                {states.map((state) => (<option id={state}>{state}</option>))}
                            </NativeSelect>
                            <FormHelperText>Select a state </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={5} >
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="ownership-native-helper">Ownership </InputLabel>
                            <NativeSelect
                                value={ownership} 
                                onChange={handleOwnershipSet}
                                inputProps={{ 
                                    name: 'ownership',
                                    id: 'ownership-native-helper',
                                }}    
                            >
                                <option aria-label="None" value="all">All</option>
                                {ownerships.map((ownership) => (<option id={ownership}>{ownership}</option>))}
                            </NativeSelect>
                            <FormHelperText>Select an ownership </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={1} />
                </Grid>
                <Grid item xs={12} alignItems="center">
                <Paper>
                    <Typography variant="h3" align="center" className={classes.typographyPadding}>
                        State Hospitals
                    </Typography>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {hospitalColumns.map((column) => (
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
                                {hospitalBeds.slice(hospitalpage * hospitalrowsPerPage, hospitalpage * hospitalrowsPerPage + hospitalrowsPerPage).map((item) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1}>
                                                {hospitalColumns.map((column) => {
                                                    return (
                                                        <TableCell align="center">
                                                            {item[column.id]}   
                                                        </TableCell>
                                                    );
                                                }   
                                                )}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={hospitalBeds.length}
                        rowsPerPage={hospitalrowsPerPage}
                        page={hospitalpage}
                        onChangePage={hospitalhandleChangePage}
                        onChangeRowsPerPage={hospitalhandleChangeRowsPerPage}
                    />
                </Paper>
            </Grid>
            <Grid item xs={12} alignItems="center">
                <Paper>
                    <Typography variant="h3" align="center" className={classes.typographyPadding}>
                        Medical College Hospitals
                    </Typography>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {medicalCollegeColumns.map((column) => (
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
                                {medicalCollegeBeds.slice(medicalCollegePage * medicalCollegeRowsPerPage, medicalCollegePage * medicalCollegeRowsPerPage + medicalCollegeRowsPerPage).map((item) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1}>
                                                {medicalCollegeColumns.map((column) => {
                                                    return (
                                                        <TableCell align="center">
                                                            {item[column.id]}   
                                                        </TableCell>
                                                    );
                                                }   
                                                )}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={medicalCollegeBeds.length}
                        rowsPerPage={medicalCollegeRowsPerPage}
                        page={medicalCollegePage}
                        onChangePage={medicalCollegeHandleChangePage}
                        onChangeRowsPerPage={medicalCollegeHandleChangeRowsPerPage}
                    />
                </Paper>
            </Grid>
        </Grid>
    );
}