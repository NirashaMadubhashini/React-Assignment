import React, {Component} from "react";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import GDSESnackBar from "../../component/SnackBar";
import UserService from "../../services/UserService";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RubberBtn from "../../component/common/RubberBandBtn";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";


class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                email: '',
                username: '',
                password: '',
                name: {
                    firstname: '',
                    lastname: ''
                },
                address: {
                    city: '',
                    street: '',
                    number: '',
                    zipcode: '',
                    geolocation: {
                        lat: '',
                        long: ''
                    }
                },
                phone: ''
            },
            id: '',
            alert: false,
            message: '',
            severity: '',
            btnLabel: 'Save',
            btnColor: 'primary',
            data:[]
        }
    }

    saveUser = async () => {
        let formData = this.state.formData;

        if (this.state.btnLabel === "Save") {
            let res = await UserService.postUser(formData);

            console.log(res);

            if (res.status === 200) {
                this.setState({
                    alert: true,
                    message: 'User saved successfully',
                    severity: 'success'
                });
                this.clearFields();
                await this.loadUsers();
            } else {
                this.setState({
                    alert: true,
                    message: "User not saved",
                    severity: 'error'
                });
            }
        } else {
            let id = this.state.id;
            let res = await UserService.putUser(formData,id);

            if (res.status===200){
                this.setState({
                    alert:true,
                    message:'User updated successfully',
                    severity:'success',
                    btnLabel:'Save',
                    btnColor:'primary'
                });
                this.clearFields();
                await this.loadUsers();
            } else {
                this.setState({
                    alert:true,
                    message:"User Not Updated",
                    severity:'error'
                });
            }
        }
    };

    loadUsers = async () => {
        let res = await UserService.fetchUsers();
        console.log(res.data);
        if (res.status===200){
            this.setState({
                data:res.data
            });
        }
        this.exampleForMap();
    }

    exampleForMap = () => {
        this.state.data.map((value, index) => {
            console.log(value)   // access element one by one
        })
    };

    componentDidMount() {
        this.loadUsers();
    }

    updateUser = (data) => {
        this.setState({
            btnLabel:'Update',
            btnColor:'secondary',
            formData:{
                email: data.email,
                username: data.username,
                password: data.password,
                name: {
                    firstname: data.name.firstname,
                    lastname: data.name.lastname
                },
                address: {
                    city: data.address.city,
                    street: data.address.street,
                    number: data.address.number,
                    zipcode: data.address.zipcode,
                    geolocation: {
                        lat: data.address.geolocation.lat,
                        long: data.address.geolocation.long
                    }
                },
                phone: data.phone
            },
            id:data.id
        })
    }

    deleteUser = async (id) => {
        let res = await UserService.deleteUser(id);
        console.log(res);
        if(res.status === 200) {
            this.setState({
                alert: true,
                message: 'User deleted successfully',
                severity: 'success'
            });
            await this.loadUsers();
        } else {
            this.setState({
                alert: true,
                message: 'User not deleted',
                severity: 'error'
            });
        }
    }
    clearFields = () => {
        this.setState({
            formData: {
                email: '',
                username: '',
                password: '',
                name: {
                    firstname: '',
                    lastname: ''
                },
                address: {
                    city: '',
                    street: '',
                    number: '',
                    zipcode: '',
                    geolocation: {
                        lat: '',
                        long: ''
                    }
                },
                phone: ''
            },
            id: '',
            btnLabel: 'Save',
            btnColor: 'primary'
        })
    }

    render() {
        return (
            <>
                <Box sx={{flexGrow: 1}}>
                    <AppBar position="static">
                        <Toolbar sx={{backgroundColor: "#1565BF"}}>
                            <Typography variant="h5" component="div" sx={{flexGrow: 1, marginLeft: 10,fontFamily:'sans-serif'}}>
                                DashBoard
                            </Typography>
                            <Grid container alignItems="center" justify="center" direction="row" spacing={2}
                                  sx={{paddingLeft:42}}
                            >
                                <Link href="dashboard" underline="none">
                                    <Button  type='submit' color='primary' variant="contained" size="small" sx={{ml:3.5}} fullWidth>DashBoard</Button>
                                </Link>
                                <Link href="product" underline="none">
                                    <Button  type='submit' color='primary' variant="contained" size="small" sx={{ml:5}} fullWidth>Product</Button>
                                </Link>
                                <Link href="signup" underline="none">
                                    <Button  type='submit' color='primary' variant="contained" size="small" sx={{ml:6}} fullWidth>User</Button>
                                </Link>
                                <Link href="cart" underline="none">
                                    <Button  type='submit' color='primary' variant="contained" size="small" sx={{ml:7}} fullWidth>Cart</Button>
                                </Link>
                            </Grid>
                            <Typography variant="h5" component="div" sx={{flexGrow: 1,fontFamily:'sans-serif', marginLeft: 50}}>
                                User
                            </Typography>


                        </Toolbar>
                        {/*<Divider />*/}
                    </AppBar>
                <ValidatorForm ref="form" className="pt-2" onSubmit={this.saveUser}>
                    <Grid container className="pt-2" spacing={3}>
                        <Grid item lg={12} xs={12} sm={12} md={12} sx={{mt:10}}>
                            <RubberBtn name="User Registration"/>
                        </Grid>
                        <Divider/>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Typography variant="subtitle1">First Name</Typography>
                            <TextValidator
                                placeholder="First Name"
                                variant="outlined"
                                size="small"
                                style={{width: '100%'}}
                                value={this.state.formData.name.firstname}
                                onChange={(e) => {
                                    let formData = this.state.formData;
                                    formData.name.firstname = e.target.value;
                                    this.setState({formData})
                                }}
                                validators={['required']}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Typography variant="subtitle1">Last Name</Typography>
                            <TextValidator
                                placeholder="Last Name"
                                variant="outlined"
                                size="small"
                                style={{width: '100%'}}
                                value={this.state.formData.name.lastname}
                                onChange={(e) => {
                                    let formData = this.state.formData;
                                    formData.name.lastname = e.target.value;
                                    this.setState({formData})
                                }}
                                validators={['required']}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Typography variant="subtitle1">Email</Typography>
                            <TextValidator
                                placeholder="Email"
                                variant="outlined"
                                size="small"
                                style={{width: '100%'}}
                                value={this.state.formData.email}
                                onChange={(e) => {
                                    let formData = this.state.formData;
                                    formData.email = e.target.value;
                                    this.setState({formData})
                                }}
                                validators={['required']}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Typography variant="subtitle1">Username</Typography>
                            <TextValidator
                                placeholder="Username"
                                variant="outlined"
                                size="small"
                                style={{width: '100%'}}
                                value={this.state.formData.username}
                                onChange={(e) => {
                                    let formData = this.state.formData;
                                    formData.username = e.target.value;
                                    this.setState({formData})
                                }}
                                validators={['required']}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Typography variant="subtitle1">Password</Typography>
                            <TextValidator
                                type="password"
                                placeholder="Password"
                                variant="outlined"
                                size="small"
                                style={{width: '100%'}}
                                value={this.state.formData.password}
                                onChange={(e) => {
                                    let formData = this.state.formData;
                                    formData.password = e.target.value;
                                    this.setState({formData})
                                }}
                                validators={['required']}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Typography variant="subtitle1">City</Typography>
                            <TextValidator
                                placeholder="City"
                                variant="outlined"
                                size="small"
                                style={{width: '100%'}}
                                value={this.state.formData.address.city}
                                onChange={(e) => {
                                    let formData = this.state.formData;
                                    formData.address.city = e.target.value;
                                    this.setState({formData})
                                }}
                                validators={['required']}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Typography variant="subtitle1">Street</Typography>
                            <TextValidator
                                placeholder="Street"
                                variant="outlined"
                                size="small"
                                style={{width: '100%'}}
                                value={this.state.formData.address.street}
                                onChange={(e) => {
                                    let formData = this.state.formData;
                                    formData.address.street = e.target.value;
                                    this.setState({formData})
                                }}
                                validators={['required']}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Typography variant="subtitle1">Street No</Typography>
                            <TextValidator
                                placeholder="Street No"
                                variant="outlined"
                                size="small"
                                style={{width: '100%'}}
                                value={this.state.formData.address.number}
                                onChange={(e) => {
                                    let formData = this.state.formData;
                                    formData.address.number = e.target.value;
                                    this.setState({formData})
                                }}
                                validators={['required']}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Typography variant="subtitle1">Zip Code</Typography>
                            <TextValidator
                                placeholder="Zip Code"
                                variant="outlined"
                                size="small"
                                style={{width: '100%'}}
                                value={this.state.formData.address.zipcode}
                                onChange={(e) => {
                                    let formData = this.state.formData;
                                    formData.address.zipcode = e.target.value;
                                    this.setState({formData})
                                }}
                                validators={['required']}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Typography variant="subtitle1">Lat Value</Typography>
                            <TextValidator
                                placeholder="Lat Value"
                                variant="outlined"
                                size="small"
                                style={{width: '100%'}}
                                value={this.state.formData.address.geolocation.lat}
                                onChange={(e) => {
                                    let formData = this.state.formData;
                                    formData.address.geolocation.lat = e.target.value;
                                    this.setState({formData})
                                }}
                                validators={['required']}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Typography variant="subtitle1">Long Value</Typography>
                            <TextValidator
                                placeholder="Long Value"
                                variant="outlined"
                                size="small"
                                style={{width: '100%'}}
                                value={this.state.formData.address.geolocation.long}
                                onChange={(e) => {
                                    let formData = this.state.formData;
                                    formData.address.geolocation.long = e.target.value;
                                    this.setState({formData})
                                }}
                                validators={['required']}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Typography variant="subtitle1">Mobile No</Typography>
                            <TextValidator
                                placeholder="Mobile No"
                                variant="outlined"
                                size="small"
                                style={{width: '100%'}}
                                value={this.state.formData.phone}
                                onChange={(e) => {
                                    let formData = this.state.formData;
                                    formData.phone = e.target.value;
                                    this.setState({formData})
                                }}
                                validators={['required']}
                            />
                        </Grid>
                    </Grid>
                    <Grid container marginTop={"10px"} direction={"row"} alignItems={"center"}
                          justifyContent={"flex-end"}>
                        <Button variant={"contained"} color={"warning"}
                                style={{marginLeft: "10px", marginRight: "10px"}} onClick={this.clearFields}>Clear</Button>
                        <Button variant={"contained"} color={this.state.btnColor} type={"submit"}
                                style={{marginLeft: "10px", marginRight: "10px"}}
                        >{this.state.btnLabel}</Button>
                    </Grid>
                </ValidatorForm>
                <Grid contaner style={{marginTop: '15px'}}>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="customer table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Id</TableCell>
                                    <TableCell align="left">First Name</TableCell>
                                    <TableCell align="left">Last Name</TableCell>
                                    <TableCell align="left">Email</TableCell>
                                    <TableCell align="left">Username</TableCell>
                                    <TableCell align="left">Password</TableCell>
                                    <TableCell align="left">City</TableCell>
                                    <TableCell align="left">Street</TableCell>
                                    <TableCell align="left">Street No</TableCell>
                                    <TableCell align="left">Zip Code</TableCell>
                                    <TableCell align="left">Lat Value</TableCell>
                                    <TableCell align="left">Long Value</TableCell>
                                    <TableCell align="left">Mobile No</TableCell>
                                    <TableCell align="left">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.data.map((row) => (
                                        <TableRow>
                                            <TableCell align="left">{row.id}</TableCell>
                                            <TableCell align="left">{row.name.firstname}</TableCell>
                                            <TableCell align="left">{row.name.lastname}</TableCell>
                                            <TableCell align="left">{row.email}</TableCell>
                                            <TableCell align="left">{row.username}</TableCell>
                                            <TableCell align="left">{row.password}</TableCell>
                                            <TableCell align="left">{row.address.city}</TableCell>
                                            <TableCell align="left">{row.address.street}</TableCell>
                                            <TableCell align="left">{row.address.number}</TableCell>
                                            <TableCell align="left">{row.address.zipcode}</TableCell>
                                            <TableCell align="left">{row.address.geolocation.lat}</TableCell>
                                            <TableCell align="left">{row.address.geolocation.long}</TableCell>
                                            <TableCell align="left">{row.phone}</TableCell>
                                            <TableCell align="left">
                                                <Tooltip title="Edit">
                                                    <IconButton
                                                        onClick={() => {
                                                            console.log("edit icon clicked!")
                                                            this.updateUser(row);
                                                        }}
                                                    >
                                                        <EditIcon color="primary" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <IconButton
                                                        onClick={() => {
                                                            console.log("edit icon clicked!")
                                                            this.deleteUser(row.id);
                                                        }}
                                                    >
                                                        <DeleteIcon color="primary" />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <GDSESnackBar
                    open={this.state.alert}
                    onClose={() => {
                        this.setState({alert: false})
                    }}
                    message={this.state.message}
                    autoHideDuration={3000}
                    severity={this.state.severity}
                    variant="filled"
                />
                </Box>
            </>
        );
    }
}

export default User