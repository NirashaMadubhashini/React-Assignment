import React from 'react'
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { Grid,Paper, Avatar, Button, Typography,Link }  from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import LockIcon from '@mui/icons-material/Lock';



const Login=()=>{

    const paperStyle={padding :20,height:'80vh',width:400,marginLeft:550,marginTop:45}

    const avatarStyle={backgroundColor:'#7B1FA2'}
    return(
        <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><LockIcon/></Avatar>
                        <h2>Sign In</h2>
                    </Grid>
                    <TextField label='Username' placeholder='Enter username' fullWidth required sx={{mt:4}}/>
                    <TextField label='Password' placeholder='Enter password' type='password' fullWidth required sx={{mt:2}}/>
                    <Typography sx={{mt:3}}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="checkedB"
                                color="secondary"
                            />
                        }
                        label="Remember me"

                    />
                        <Link href="#" sx={{ml:13}} underline="none" color='secondary'>
                            Forgot password ?
                        </Link>
                    </Typography>
                    <Link href="dash" underline="none">
                    <Button type='submit' color='secondary' variant="contained" sx={{mt:5}} fullWidth>Sign in</Button>
                    </Link>
                    <Typography sx={{mt:2,ml:10}}> Do you have an account ?
                        <Link href="signUp" underline="none" color='secondary' >
                            Sign Up
                        </Link>
                    </Typography>
                </Paper>


        </Grid>
    )
}

export default Login