import React, {Component, useState} from 'react'
import TextField from "@mui/material/TextField";
import {Avatar, Button, Grid, Link, Paper, Typography} from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import {toast, ToastContainer} from 'react-toastify';
import {useNavigate} from "react-router-dom";
import LoginService from "../../services/LoginService";
import Box from "@mui/material/Box";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";



class Login extends Component {

    paperStyle = {padding: 20, height: '80vh', width: 400, marginLeft: 550, marginTop: 45}

    avatarStyle = {backgroundColor: '#7B1FA2'}

    constructor(props) {
        super(props);
        this.state = {
            formData:{
                username:'',
                password:''
            }
        }
    }

    loginUser = async () => {
        let formData = this.state.formData;
        let res = await LoginService.postLogin(formData);
        console.log(res);
    }

    render() {
        let {classes} = this.props
        return (
            <Grid>
                <ValidatorForm ref="form" className="pt-2" onSubmit={this.loginUser}>
                <Paper elevation={10} style={this.paperStyle}>
                    <Grid align='center'>
                        <Avatar style={this.avatarStyle}><LockIcon/></Avatar>
                        <h2>Sign In</h2>
                    </Grid>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': {},
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextValidator label='Username'
                                       placeholder='Enter username'
                                       value={this.state.username}
                                       onChange={(e) => {
                                           let formData = this.state.formData;
                                           formData.username = e.target.value;
                                           this.setState({formData});
                                       }}
                                   fullWidth required sx={{mt: 4}}/>
                        <TextValidator label='Password'
                                       placeholder="Password"
                                       type="password"
                                       value={this.state.password}
                                       onChange={(e) => {
                                           let formData = this.state.formData;
                                           formData.password = e.target.value;
                                           this.setState({formData});
                                       }}
                                       fullWidth required
                                   sx={{mt: 2}}/>
                        <Link href="dashboard" underline="none">
                            <Button  color='secondary' variant="contained" sx={{mt: 5}} fullWidth>Sign
                                in</Button>
                        </Link>
                    </Box>
                    <Typography sx={{mt: 2, ml: 10}}> Do you have an account ?
                        <Link href="signUp" underline="none" color='secondary'>
                            Sign Up
                        </Link>
                    </Typography>
                </Paper>

            </ValidatorForm>
            </Grid>
        )
    }
}

export default Login