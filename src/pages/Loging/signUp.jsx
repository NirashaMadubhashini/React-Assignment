import React, {useState} from 'react'
import TextField from "@mui/material/TextField";
import {Avatar, Box, Button, Grid, Link, Paper, Typography} from "@mui/material";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {toast, ToastContainer} from 'react-toastify';
import CustomerService from "../../services/CustomerService";
import {showToast} from "../User";

const SignUp = () => {
    const paperStyleContainer = {
        padding: 20, height: '85vh', width: 500, mt: -5,
        margin: "50px auto"
    }

    const avatarStyle = {backgroundColor: '#7B1FA2'}

    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });


    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        city: "",
        street: "",
        streetNo: "",
        zipCode: "",
        latValue: "",
        longValue: "",
        mobileNo: "",
    };

    const statusObj = {
        alert: false,
        message: '',
        severity: '',
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const [formValues, setFormValues] = useState(initialValues);

    const [status, setStatus] = useState(statusObj);

    const [btnLabel, setBtnLabel] = useState('Create Account');

    const [btnColor, setBtnColor] = useState('secondary');

    const [tblData, setTblData] = useState([]);


    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //
    //     await submitUser();
    // }

    const clearFields = () => {

        setFormValues({
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
            city: "",
            street: "",
            streetNo: "",
            zipCode: "",
            latValue: "",
            longValue: "",
            mobileNo: "",

        });
    };

    const submitUser = async () => {

        let dto = {};
        dto = formValues;
        console.log("form Values",formValues)
        let res = await CustomerService.postUser(formValues);
        console.log(res.status)

        console.log("res Status", res)
        if (res.data.code === 200) {

            setStatus({
                alert: true,
                message: "S",
                severity: 'success'
            })
            showToast('success', 'saved successfully !');


            clearFields();

        } else {
            setStatus({
                alert: true,
                message: "E",
                severity: 'error'
            });
            console.log("not Equal")
            showToast('error', 'Not Saved');
        }
    };


    return (
        <Grid>
            <ToastContainer/>
            <Paper elevation={10} style={paperStyleContainer}>
                <Grid align='center' sx={{mt: -1}}>
                    <Avatar style={avatarStyle}><LockOpenIcon/></Avatar>
                    <h2>Sign Up</h2>
                </Grid>
                <br/>
                <Box
                    component="form"
                    // onSubmit={handleSubmit}
                    sx={{
                        '& > :not(style)': {},
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Grid container alignItems="center" justify="center" direction="row" spacing={2}
                          sx={{paddingLeft: 2, mt: -4}}>

                        <Grid item sx={{paddingLeft: 2}}>
                            <TextField label='FirstName' placeholder='Enter FirstName'
                                       name="firstName"
                                       onChange={handleInputChange} validators={['required']}
                                       value={formValues.firstName}
                            />
                        </Grid>
                        <Grid item sx={{paddingLeft: 2}}>
                            <TextField label='LastName' placeholder='Enter LastName'
                                       name="lastName"
                                       onChange={handleInputChange} validators={['required']}
                                       value={formValues.lastName}
                            />
                        </Grid>
                        <Grid item sx={{paddingLeft: 2}}>
                            <TextField label='Email' placeholder='Enter Email'
                                       name="email"
                                       onChange={handleInputChange} validators={['required']}
                                       value={formValues.email}
                            />
                        </Grid>
                        <Grid item sx={{paddingLeft: 2}}>
                            <TextField label='UserName' placeholder='Enter UserName'
                                       name="username"
                                       onChange={handleInputChange} validators={['required']}
                                       value={formValues.username}
                            />
                        </Grid>
                        <Grid item sx={{paddingLeft: 2}}>
                            <TextField label='Password' placeholder='Enter Password'
                                       name="password"
                                       onChange={handleInputChange} validators={['required']}
                                       value={formValues.password}
                            />
                        </Grid>
                        <Grid item sx={{paddingLeft: 2}}>
                            <TextField label='City' placeholder='Enter City'
                                       name="city"
                                       onChange={handleInputChange} validators={['required']}
                                       value={formValues.city}
                            />
                        </Grid>
                        <Grid item sx={{paddingLeft: 2}}>
                            <TextField label='Street' placeholder='Enter Street'
                                       name="street"
                                       onChange={handleInputChange} validators={['required']}
                                       value={formValues.street}
                            />
                        </Grid>
                        <Grid item sx={{paddingLeft: 2}}>
                            <TextField label='Street No' placeholder='Enter Street No'
                                       name="streetNo"
                                       onChange={handleInputChange} validators={['required']}
                                       value={formValues.streetNo}
                            />
                        </Grid>
                        <Grid item sx={{paddingLeft: 2}}>
                            <TextField label='Zip Code' placeholder='Enter Zip Code'
                                       name="zipCode"
                                       onChange={handleInputChange} validators={['required']}
                                       value={formValues.zipCode}
                            />
                        </Grid>
                        <Grid item sx={{paddingLeft: 2}}>
                            <TextField label='Lat Value' placeholder='Enter Lat Value'
                                       name="latValue"
                                       onChange={handleInputChange} validators={['required']}
                                       value={formValues.latValue}
                            />
                        </Grid>
                        <Grid item sx={{paddingLeft: 2}}>
                            <TextField label='Long Value' placeholder='Enter Long Value'
                                       name="longValue"
                                       onChange={handleInputChange} validators={['required']}
                                       value={formValues.longValue}
                            />
                        </Grid>
                        <Grid item sx={{paddingLeft: 2}}>
                            <TextField label='Mobile No' placeholder='Enter Mobile No'
                                       name="mobileNo"
                                       validators={['required']}onChange={handleInputChange} validators={['required']}
                                       value={formValues.mobileNo}
                            />
                        </Grid>


                    </Grid>
                    <Button type='submit' color={btnColor} variant="contained" sx={{mt: 3, ml: 20}}>
                        {btnLabel}
                    </Button>
                </Box>
                <Typography sx={{mt: 1, ml: 20}}> Previous Page ?
                    <Link href="/" underline="none" color='secondary'>
                        Sign In
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default SignUp