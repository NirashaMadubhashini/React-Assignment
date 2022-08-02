import React, {useState} from 'react'
import TextField from "@mui/material/TextField";
import {Avatar, Box, Button, Grid, Link, Paper, Typography} from "@mui/material";
import LockOpenIcon from '@mui/icons-material/LockOpen';


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


    const statusObj = {
        alert: false,
        message: '',
        severity: '',
    }


    const [status, setStatus] = useState(statusObj);

    const [btnLabel, setBtnLabel] = useState('Create Account');

    const [btnColor, setBtnColor] = useState('secondary');

    const [tblData, setTblData] = useState([]);


    const handleSubmit = async (event) => {
        event.preventDefault();

    }


    return (
        <Grid>
            <Paper elevation={10} style={paperStyleContainer}>
                <Grid align='center' sx={{mt: -1}}>
                    <Avatar style={avatarStyle}><LockOpenIcon/></Avatar>
                    <h2>Sign Up</h2>
                </Grid>
                <br/>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
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
                                       validators={['required']}
                            />
                        </Grid>
                        <Grid item sx={{paddingLeft: 2}}>
                            <TextField label='LastName' placeholder='Enter LastName'
                                       name="lastName"
                                       validators={['required']}
                            />
                        </Grid>
                        <Grid item sx={{paddingLeft: 2}}>
                            <TextField label='Email' placeholder='Enter Email'
                                       name="email"
                                       validators={['required']}
                            />
                        </Grid>
                        <Grid item sx={{paddingLeft: 2}}>
                            <TextField label='UserName' placeholder='Enter UserName'
                                       name="username"
                                       validators={['required']}
                            />
                        </Grid>
                        <Grid item sx={{paddingLeft: 2}}>
                            <TextField label='Password' placeholder='Enter Password'
                                       name="password"
                                       validators={['required']}
                            />
                        </Grid>
                        <Grid item sx={{paddingLeft: 2}}>
                            <TextField label='City' placeholder='Enter City'
                                       name="city"
                                       validators={['required']}
                            />
                        </Grid>
                        <Grid item sx={{paddingLeft: 2}}>
                            <TextField label='Street' placeholder='Enter Street'
                                       name="street"
                                       validators={['required']}
                            />
                        </Grid>
                        <Grid item sx={{paddingLeft: 2}}>
                            <TextField label='Street No' placeholder='Enter Street No'
                                       name="streetNo"
                                       validators={['required']}
                            />
                        </Grid>
                        <Grid item sx={{paddingLeft: 2}}>
                            <TextField label='Zip Code' placeholder='Enter Zip Code'
                                       name="zipCode"
                                       validators={['required']}
                            />
                        </Grid>
                        <Grid item sx={{paddingLeft: 2}}>
                            <TextField label='Lat Value' placeholder='Enter Lat Value'
                                       name="latValue"
                                       validators={['required']}
                            />
                        </Grid>
                        <Grid item sx={{paddingLeft: 2}}>
                            <TextField label='Long Value' placeholder='Enter Long Value'
                                       name="longValue"
                                       validators={['required']}
                            />
                        </Grid>
                        <Grid item sx={{paddingLeft: 2}}>
                            <TextField label='Mobile No' placeholder='Enter Mobile No'
                                       name="mobileNo"
                                       validators={['required']}
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