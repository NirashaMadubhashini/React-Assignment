import React, {Component, useState} from 'react'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import {Grid} from "@mui/material";
import TextField from "@mui/material/TextField";
import RubberBtn from "../../component/common/RubberBandBtn";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import GDSESnackBar from "../../component/SnackBar";
import Typography from "@mui/material/Typography";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import UserService from "../../services/UserService";
import ProductService from "../../services/ProductService";
import CartService from "../../services/CartService";
import $ from "jquery"
import Autocomplete from "@mui/material/Autocomplete";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import './style.css'
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";

class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            formData: {
                userId: '',
                date: new Date().toISOString().slice(0, 10),
                products: []
            },
            username: '',
            productTitles: [],
            product: '',
            productId: '',
            qty: 0,
            usernames: [],
            icon: <CheckBoxOutlineBlankIcon fontSize="small"/>,
            checkedIcon: <CheckBoxIcon fontSize="small"/>,
            alert: false,
            message: '',
            severity: ''
        })
    }

    getUsernames = async () => {
        let res = await UserService.fetchUsers();
        const array = [];
        for (let i = 0; i < res.data.length; i++) {
            array[i] = {
                username: res.data[i].username,
                userId: res.data[i].id
            }
        }
        this.setState({
            usernames: array
        })
    }

    getProductTitles = async () => {
        let res = await ProductService.fetchProducts();
        const array = [];
        for (let i = 0; i < res.data.length; i++) {
            array[i] = {
                title: res.data[i].title,
                id: res.data[i].id
            }
        }
        this.setState({
            productTitles: array
        })
    }


    componentDidMount() {
        this.getUsernames();
        this.getProductTitles();
    }

    addToCart = () => {
        if (this.state.productId != "" && this.state.qty != 0 && this.state.qty != "") {
            const product = {
                productId: this.state.productId,
                quantity: this.state.qty
            }
            this.state.formData.products.push(product);
            $('#tblCart').empty();
            for (let product of this.state.formData.products) {
                let row =
                    `<tr>
                    <td>${product.productId}</td>
                    <td>${product.quantity}</td>
                 </tr>`
                $('#tblCart').append(row);
            }
        } else {
            this.setState({
                alert: true,
                message: 'Please select a product',
                severity: 'error'
            })
        }
    }

    saveCart = async () => {

        if (this.state.formData.userId != "" && this.state.formData.products.length != 0) {
            let formData = this.state.formData;
            let res = await CartService.postCart(formData);

            if (res.status === 200) {
                this.setState({
                    alert: true,
                    message: 'Cart Saved Successfully',
                    severity: 'success'
                })
                this.clearTable();
                this.clearFields();
            } else {
                this.setState({
                    alert: true,
                    message: 'Cart Not Saved',
                    severity: 'error'
                })
            }
        } else {
            this.setState({
                alert: true,
                message: 'Please select a username or products',
                severity: 'error'
            })
        }
    }

    clearTable = () => {
        $('#tblCart').empty();
    }

    clearFields = () => {
        this.setState = ({
            username: '',
            qty: ''
        })
    }
    render() {
        return (

            <>
                <Box sx={{flexGrow: 1}}>
                    <AppBar position="static">
                        <Toolbar sx={{backgroundColor: "#7B1FA2"}}>
                            <Typography variant="h5" component="div" sx={{flexGrow: 1, marginLeft: 10,fontFamily:'sans-serif'}}>
                                DashBoard
                            </Typography>
                            <Grid container alignItems="center" justify="center" direction="row" spacing={2}
                                  sx={{paddingLeft:45}}
                            >
                                <Link href="dashboard" underline="none">
                                    <Button  type='submit' color='secondary' variant="contained" size="small" sx={{ml:3.5}} fullWidth>DashBoard</Button>
                                </Link>
                                <Link href="product" underline="none">
                                    <Button  type='submit' color='secondary' variant="contained" size="small" sx={{ml:5}} fullWidth>Product</Button>
                                </Link>
                                <Link href="signup" underline="none">
                                    <Button  type='submit' color='secondary' variant="contained" size="small" sx={{ml:6}} fullWidth>User</Button>
                                </Link>
                            </Grid>
                            <Typography variant="h5" component="div" sx={{flexGrow: 1,fontFamily:'sans-serif', marginLeft: 50}}>
                                User
                            </Typography>


                        </Toolbar>
                        {/*<Divider />*/}
                    </AppBar>
                <ValidatorForm ref="form" className="pt-2" onSubmit={this.addToCart}>
                    <Grid container className="pt-2" spacing={3}>
                        <Grid item lg={12} xs={12} sm={12} md={12} sx={{mt: 10}}>
                            <RubberBtn name="Cart Manage"/>
                        </Grid>
                        <Divider/>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Typography variant="subtitle1">Username</Typography>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={this.state.usernames}
                                getOptionLabel={
                                    (option) => option.username
                                }
                                onChange={(e, value) => {
                                    let formData = this.state.formData;
                                    if (value != null) {
                                        formData.userId = value.userId;
                                        this.setState({formData})
                                    } else {
                                        formData.userId = '';
                                        this.setState({formData})
                                    }
                                }}
                                sx={{width: "100%"}}
                                renderInput={(params) => <TextField {...params} placeholder="Username"/>}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Typography variant="subtitle1">Date</Typography>
                            {/*<DatePicker
                                selected={this.state.date}
                                dateFormat="yyyy-MM-dd"
                                onChange={this.selectDate}
                            />*/}
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    value={this.state.formData.date}
                                    onChange={(e) => {
                                        let date = new Date(e).toISOString().slice(0, 10);
                                        let formData = this.state.formData;
                                        formData.date = date;
                                        this.setState({formData})
                                    }}
                                    renderInput={(params) => <TextField {...params} style={{width: "100%"}}/>}
                                    inputFormat="yyyy-MM-dd"
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Typography variant={"subtitle1"}>Product Title</Typography>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={this.state.productTitles}
                                getOptionLabel={
                                    (option) => option.title
                                }
                                onChange={(e, value) => {
                                    let product = this.state.product
                                    let productId = this.state.productId;
                                    if (value != null) {
                                        product = value.title;
                                        productId = value.id;
                                        this.state.product = product;
                                        this.state.productId = productId;
                                    } else {
                                        this.state.product = '';
                                        this.state.productId = '';
                                    }
                                }}
                                sx={{width: "100%"}}
                                renderInput={(params) => <TextField {...params} placeholder="Product Titles"/>}
                            />
                        </Grid>
                        <Grid item lg={3} md={3} xs={6} sm={6}>
                            <Typography variant={"subtitle1"}>Qty</Typography>
                            <TextValidator
                                placeholder="Qty"
                                variant="outlined"
                                size="small"
                                style={{width: '100%'}}
                                onChange={(e) => {
                                    let qty = this.state.qty
                                    qty = e.target.value;
                                    this.state.qty = qty;
                                }}
                            />
                        </Grid>
                        <Grid item lg={3} md={3} xs={6} sm={6} display={"flex"} flexDirection={"row"}
                              alignItems={"center"} justifyContent={"flex-start"}>
                            <Button variant={"contained"} color={"primary"} type={"submit"}
                                    style={{marginLeft: "10px", marginRight: "10px"}}>Add</Button>
                            <Button variant={"contained"} color={"success"}
                                    style={{marginLeft: "10px", marginRight: "10px"}}>Clear</Button>
                        </Grid>
                    </Grid>
                    <hr/>
                </ValidatorForm>
                <Grid contaner style={{marginTop: '15px'}}>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="customer table" border={"1px solid black"}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Product Id</TableCell>
                                    <TableCell align="center">Qty</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody id="tblCart">

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid container marginTop={"10px"} direction={"row"} alignItems={"center"}
                      justifyContent={"flex-end"}>
                    <Button variant={"contained"} color={"error"}
                            style={{marginLeft: "10px", marginRight: "10px"}}>Clear</Button>
                    <Button variant={"contained"} color={"secondary"} type={"submit"}
                            style={{marginLeft: "10px", marginRight: "10px"}} onClick={this.saveCart}>Save</Button>
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

export default Cart