import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core';
import Controls from "./controls/Controls";
import { useForm, Form } from './useForm';
// import * as employeeService from "../Service/api";
import { addUser } from '../Service/api';
import { useNavigate } from 'react-router-dom';
import { Paper, makeStyles } from '@material-ui/core';
import Typography from '@mui/material/Typography';

const getDepartmentCollection = () => ([
    { id: '1', title: 'Development' },
    { id: '2', title: 'Marketing' },
    { id: '3', title: 'Accounting' },
    { id: '4', title: 'HR' },
]);

const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
    { id: 'other', title: 'Other' },
]

const initialFValues = {
    id: 0,
    fullName: '',
    email: '',
    mobile: '',
    city: '',
    gender: 'male',
    departmentId: '',
    hireDate: new Date(),
    isPermanent: false,
}

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}));


export default function EmployeeForm(props) {
    let navigate = useNavigate();
    const classes = useStyles();
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required."
        if ('departmentId' in fieldValues)
            temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const addUserDetails = async () => {
        await addUser(values);
        navigate('/all');
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Paper elevation={4} className={classes.pageContent} >
            <Typography variant="h6" align="left" gutterBottom component="div">
                Add Employee Details
            </Typography>
            <Form onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={6}>
                        <Controls.Input
                            name="fullName"
                            label="Full Name"
                            value={values.fullName}
                            onChange={handleInputChange}
                            error={errors.fullName}
                        />
                        <Controls.Input
                            label="Email"
                            name="email"
                            value={values.email}
                            onChange={handleInputChange}
                            error={errors.email}
                        />
                        <Controls.Input
                            label="Mobile"
                            name="mobile"
                            value={values.mobile}
                            onChange={handleInputChange}
                            error={errors.mobile}
                        />
                        <Controls.Input
                            label="City"
                            name="city"
                            value={values.city}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controls.RadioGroup
                            name="gender"
                            label="Gender"
                            value={values.gender}
                            onChange={handleInputChange}
                            items={genderItems}
                        />
                        <Controls.Select
                            name="departmentId"
                            label="Department"
                            value={values.departmentId}
                            onChange={handleInputChange}
                            options={getDepartmentCollection()}
                            error={errors.departmentId}
                        />
                        <Controls.DatePicker
                            name="hireDate"
                            label="Hire Date"
                            value={values.hireDate}
                            onChange={handleInputChange}
                        />
                        <Controls.Checkbox
                            name="isPermanent"
                            label="Permanent Employee"
                            value={values.isPermanent}
                            onChange={handleInputChange}
                        />

                        <div>
                            <Controls.Button
                                type="submit"
                                text="Submit" />
                            <Controls.Button
                                text="Reset"
                                color="default"
                                onClick={resetForm} />
                        </div>
                    </Grid>
                </Grid>
            </Form>
        </Paper >
    )
}





















// import { useState } from 'react';
// import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography } from '@mui/material';
// import { addUser } from '../Service/api';
// import { useNavigate } from 'react-router-dom';
// import React from 'react';

// const initialValue = {
//     name: '',
//     username: '',
//     email: '',
//     phone: '',
//     gender: 'male'
// }

// const Container = styled(FormGroup)`
//     width: 50%;
//     margin: 5% 0 0 25%;
//     & > div {
//         margin-top: 20px;
// `;

// const AddUser = () => {
//     const [user, setUser] = useState(initialValue);
//     const { name, username, email, phone } = user;
//     let navigate = useNavigate();

//     const onValueChange = (e) => {
//         setUser({...user, [e.target.name]: e.target.value})
//     }

//     const addUserDetails = async() => {
//         await addUser(user);
//         navigate('/all');
//     }

//     return (
//         <Container>
//             <Typography variant="h4">Add User</Typography>
//             <FormControl>
//                 <InputLabel htmlFor="my-input">Name</InputLabel>
//                 <Input onChange={(e) => onValueChange(e)} name='name' value={name} id="my-input" />
//             </FormControl>
//             <FormControl>
//                 <InputLabel htmlFor="my-input">Username</InputLabel>
//                 <Input onChange={(e) => onValueChange(e)} name='username' value={username} id="my-input" />
//             </FormControl>
//             <FormControl>
//                 <InputLabel htmlFor="my-input">Email</InputLabel>
//                 <Input onChange={(e) => onValueChange(e)} name='email' value={email} id="my-input"/>
//             </FormControl>
//             <FormControl>
//                 <InputLabel htmlFor="my-input">Phone</InputLabel>
//                 <Input onChange={(e) => onValueChange(e)} name='phone' value={phone} id="my-input" />
//             </FormControl>
//             <FormControl>
//                 <Button variant="contained" color="primary" onClick={() => addUserDetails()}>Add User</Button>
//             </FormControl>
//         </Container>
//     )
// }

// export default AddUser;