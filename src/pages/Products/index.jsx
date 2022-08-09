import React, {Component} from "react";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {Autocomplete, Button, Grid, TextField, Typography} from "@mui/material";
import ProductService from "../../services/ProductService";
import GDSESnackBar from "../../component/SnackBar";
import $ from "jquery";
import Divider from "@mui/material/Divider";
import RubberBtn from "../../component/common/RubberBandBtn";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                title: '',
                price: '',
                description: '',
                image: '',
                category: ''
            },
            categories: [],
            alert:false,
            message:'',
            severity:''
        }
    }

    componentDidMount() {
        this.loadCategories();
    }

    loadCategories = async () => {
        let res = await ProductService.fetchProductCategories();
        console.log(res);

        if (res.status === 200) {
            this.setState({
                categories: res.data
            })
        }
    }

    saveProduct = async () => {
        let formData = this.state.formData;
        if (formData.category!='' && formData.image!='') {
            let res = await ProductService.postProduct(formData);
            if (res.status === 200) {
                this.setState({
                    alert: true,
                    message: 'Product Saved Successfully',
                    severity: 'success'
                })
                this.clearFields();
            } else {
                this.setState({
                    alert: true,
                    message: 'Product Not Saved',
                    severity: 'error'
                })
            }
        } else {
            this.setState({
                alert: true,
                message: 'Please fill all the data',
                severity: 'error'
            })
        }
    }

    clearFields = () => {
        this.setState({
            formData:{
                title: '',
                price: '',
                description: '',
                image: '',
                category: ''
            }
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
                                <Link href="cart" underline="none">
                                    <Button  type='submit' color='secondary' variant="contained" size="small" sx={{ml:7}} fullWidth>Cart</Button>
                                </Link>
                            </Grid>
                            <Typography variant="h5" component="div" sx={{flexGrow: 1,fontFamily:'sans-serif', marginLeft: 50}}>
                                User
                            </Typography>


                        </Toolbar>
                        {/*<Divider />*/}
                    </AppBar>
                <ValidatorForm ref="form" className="pt-2" onSubmit={this.saveProduct}>
                    <Grid container className="pt-2" spacing={3}>
                        <Grid item lg={12} xs={12} sm={12} md={12} sx={{mt: 10}}>
                            <RubberBtn name="Product Manage"/>
                        </Grid>
                        <Divider/>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Typography variant="subtitle1">Title</Typography>
                            <TextValidator
                                placeholder="Title"
                                variant="outlined"
                                size="small"
                                style={{width: '100%'}}
                                value={this.state.formData.title}
                                onChange={(e) => {
                                    let formData = this.state.formData;
                                    formData.title = e.target.value;
                                    this.setState({formData});
                                }}
                                validators={['required']}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Typography variant="subtitle1">Price</Typography>
                            <TextValidator
                                placeholder="Price"
                                variant="outlined"
                                size="small"
                                style={{width: '100%'}}
                                value={this.state.formData.price}
                                onChange={(e) => {
                                    let formData = this.state.formData;
                                    formData.price = e.target.value;
                                    this.setState({formData});
                                }}
                                validators={['required']}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Typography variant="subtitle1">Category</Typography>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={this.state.categories}
                                value={this.state.formData.category}
                                onChange={(e, value) => {
                                    let formData = this.state.formData;
                                    formData.category = value;
                                    this.setState({formData});
                                }}
                                sx={{width: "100%"}}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Typography variant="subtitle1">Description</Typography>
                            <TextValidator
                                placeholder="Description"
                                variant="outlined"
                                size="large"
                                style={{width: '100%'}}
                                value={this.state.formData.description}
                                onChange={(e) => {
                                    let formData = this.state.formData;
                                    formData.description = e.target.value;
                                    this.setState({formData});
                                }}
                                validators={['required']}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Typography variant="subtitle1">Image</Typography>
                            <input
                                id="inputFile"
                                type={"file"}
                                style={{fontSize: "20px"}}
                                onChange={(e) => {
                                    let formData = this.state.formData;
                                    formData.image = e.target.value;
                                    this.setState({formData});
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container marginTop={"10px"} direction={"row"} alignItems={"center"}
                          justifyContent={"flex-end"}>
                        <Button variant={"contained"} color={"success"}
                                style={{marginLeft: "10px", marginRight: "10px"}} onClick={this.clearFields}>Clear</Button>
                        <Button variant={"contained"} color={"primary"} type={"submit"}
                                style={{marginLeft: "10px", marginRight: "10px"}}
                        >Save</Button>
                    </Grid>
                </ValidatorForm>
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

export default Products