import React, { useState, useEffect } from 'react'
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "./useTable";
import { Link } from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import Controls from "./controls/Controls";
import { Search } from "@material-ui/icons";
import { getUsers, addUser, editUser, deleteUser } from '../Service/api';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import AddIcon from '@material-ui/icons/Add';
import Popup from "./Popup";
import EmployeeForm from "./AddUser"
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from "./Notification";
import ConfirmDialog from "./ConfirmDialog";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))


const headCells = [
    { id: 'fullName', label: 'Employee Name' },
    { id: 'email', label: 'Email Address (Personal)' },
    { id: 'mobile', label: 'Mobile Number' },
    { id: 'department', label: 'Department', disableSorting: true },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function AllUsers() {

    const classes = useStyles();
    // const [records, setRecords] = useState(employeeService.getAllEmployees())
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [records, setRecords] = useState([]);

    const [recordForEdit, setRecordForEdit] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    useEffect(() => {
        getAllUsers();
    }, []);

    //     const deleteUserData = async (id) => {
    //         await deleteUser(id);
    //         getAllUsers();
    //     }

    const getAllUsers = async () => {
        let response = await getUsers();
        setRecords(response.data);
    }

    const addOrEdit = (employee, resetForm) => {
        if (employee.id == 0) {
            addUser(employee);
            //employeeService.insertEmployee(employee);
        } else {
            editUser(employee.id, employee);
            //employeeService.updateEmployee(employee);
        }
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        getAllUsers();
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success'
        })

    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        //employeeService.deleteEmployee(id);
        // setRecords(employeeService.getAllEmployees());
        deleteUser(id);
        getAllUsers();
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.fullName.toLowerCase().includes(target.value))
            }
        })
    }

    return (
        <>
            <Grid container justifyContent="space-between" style={{ borderBottom: '1px solid #dee2e6', height: 50 }}>
                <Grid item  >
                    {/* <Title style={{ fontFamily: 'Inter', fontSize: 20, marginTop: 12, marginLeft: 20 }}
                        level={2}>Menu 1</Title> */}
                    <Typography variant="h6" align="left" mt={'12px'} ml={'20px'} gutterBottom component="div">
                        Menu 1
                    </Typography>
                </Grid>
                <Grid item >
                    <Button variant="contained" style={{ marginRight: 20, marginTop: 6, backgroundColor: "#095dff" }}
                        component={Link} to={`/add`} disabled>Add User</Button>
                </Grid>
            </Grid>
            <Paper className={classes.pageContent}>
                {/* <EmployeeForm /> */}
                <Toolbar>
                    <Controls.Input
                        label="Search Employees"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                    <Controls.Button
                        text="Add New"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                            (<TableRow key={item.id}>
                                <TableCell>{item.fullName}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.mobile}</TableCell>
                                <TableCell>{item.department}</TableCell>
                                <TableCell>
                                    <Controls.ActionButton
                                        color="primary"
                                        onClick={() => { openInPopup(item) }}>
                                        <EditOutlinedIcon fontSize="small" />
                                    </Controls.ActionButton>
                                    <Controls.ActionButton
                                        color="secondary"
                                        onClick={() => {
                                            setConfirmDialog({
                                                isOpen: true,
                                                title: 'Are you sure to delete this record?',
                                                subTitle: "You can't undo this operation",
                                                onConfirm: () => { onDelete(item.id) }
                                            })
                                        }}>
                                        <CloseIcon fontSize="small" />
                                    </Controls.ActionButton>
                                </TableCell>
                            </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Popup
                title="Employee Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >

                <EmployeeForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>

            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}






// import { useState, useEffect } from 'react';

// import { Table, TableHead, TableCell, TableRow, TableBody, Button, styled } from '@mui/material'
// import { getUsers, deleteUser } from '../Service/api';
// import { Link } from 'react-router-dom';
// import React from 'react';

// import Title from 'antd/lib/typography/Title';
// import Grid from "@material-ui/core/Grid";

// const StyledTable = styled(Table)`
//     width: 90%;
//     margin: 50px 0 0 50px;
// `;

// const THead = styled(TableRow)`
//     & > th {
//         font-size: 20px;
//         background: darkslateblue;
//         color: #FFFFFF;
//     }
// `;

// const TRow = styled(TableRow)`
//     & > td{
//         font-size: 18px
//     }
// `;


// const AllUsers = () => {
//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         getAllUsers();
//     }, []);

//     const deleteUserData = async (id) => {
//         await deleteUser(id);
//         getAllUsers();
//     }

//     const getAllUsers = async () => {
//         let response = await getUsers();
//         setUsers(response.data);
//     }

//     return (

//         <>
//             <Grid container justifyContent="space-between" style={{ borderBottom: '1px solid #dee2e6', height: 50 }}>
//                 <Grid item  >
//                     <Title style={{ fontFamily: 'Inter', fontSize: 20, marginTop: 12, marginLeft: 20 }}
//                         level={2}>Menu 1</Title>
//                 </Grid>
//                 <Grid item >
//                     <Button variant="contained" style={{ marginRight: 20, marginTop: 6, backgroundColor: "#095dff" }}
//                     component={Link} to={`/add`}>Add User</Button>
//                 </Grid>
//             </Grid>
//             <StyledTable>
//                 <TableHead>
//                     <THead>
//                         {/* <TableCell>Id</TableCell> */}
//                         <TableCell>Employee Name</TableCell>
//                         {/* <TableCell>Username</TableCell> */}
//                         <TableCell>Email</TableCell>
//                         <TableCell>Mobile Number</TableCell>
//                         <TableCell>Department</TableCell>
//                         <TableCell>City</TableCell>
//                         <TableCell>
//                             <Button color="secondary" variant="contained" style={{ marginRight: 10 }} component={Link} to={`/add`}>Add User</Button>
//                         </TableCell>
//                         {/* <TableCell></TableCell> */}
//                     </THead>
//                 </TableHead>
//                 <TableBody>
//                     {users.map((user) => (
//                         <TRow key={user.id}>
//                             <TableCell>{user.id}</TableCell>
//                             <TableCell>{user.fullName}</TableCell>
//                             <TableCell>{user.username}</TableCell>
//                             <TableCell>{user.email}</TableCell>
//                             <TableCell>{user.mobile}</TableCell>
//                             <TableCell>
//                                 <Button color="primary" variant="contained" style={{ marginRight: 10 }} component={Link} to={`/edit/${user.id}`}>Edit</Button>
//                                 <Button color="secondary" variant="contained" onClick={() => deleteUserData(user.id)}>Delete</Button>
//                             </TableCell>
//                         </TRow>
//                     ))}
//                 </TableBody>
//             </StyledTable></>
//     )
// }

// export default AllUsers;