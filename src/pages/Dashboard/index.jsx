import Grid from "@mui/material/Grid";
import RubberBtn from "../../component/common/RubberBandBtn";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Products from "../../assets/img/items.jpg";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Carts from "../../assets/img/cart.jpg";
import Users from "../../assets/img/user.jpg";
import * as React from "react";
import {Component} from "react";
import ProductService from "../../services/ProductService";
import UserService from "../../services/UserService";
import CartService from "../../services/CartService";
import MainPanel from "../../index";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productsCount: '0',
            cartCount: '0',
            userCount: '0'
        }
    }

    getProductsCount = async () => {
        let res = await ProductService.fetchProducts();
        if (res.status === 200) {
            this.setState({
                productsCount: res.data.length
            });
        }
    }

    getUsersCount = async () => {
        let res = await UserService.fetchUsers();
        if (res.status === 200) {
            this.setState({
                userCount: res.data.length
            });
        }
    }

    getCartsCount = async () => {
        let res = await CartService.fetchCarts();
        if (res.status === 200) {
            this.setState({
                cartCount: res.data.length
            });
        }
    }

    componentDidMount() {
        this.getProductsCount();
        this.getUsersCount();
        this.getCartsCount();
    }
    render() {
        const {classes} = this.props
        return (
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar sx={{backgroundColor: "#1565BF"}}>
                        <Typography variant="h5" component="div" sx={{flexGrow: 1, marginLeft: 10,fontFamily:'sans-serif'}}>
                            DashBoard
                        </Typography>
                        <Grid container alignItems="center" justify="center" direction="row" spacing={2}
                              sx={{paddingLeft:45}}
                        >
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

            <div>
                <Grid item lg={12} xs={12} sm={12} md={12} sx={{mt: 15, fontSize: 25}}>
                    <RubberBtn name="DashBoard"/>
                </Grid>
                <Card sx={{maxWidth: 345, ml: 25, mt: 10}}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image={Products}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Products
                            </Typography>
                            <Typography variant="body2" variant="h5" color="text.secondary" sx={{fontWeight:'bold'}}>
                                {this.state.productsCount}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>

                <Card sx={{maxWidth: 345, ml: 75, mt: -30}}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image={Carts}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Cart
                            </Typography>
                            <Typography variant="body2" variant="h5" color="text.secondary" sx={{fontWeight:'bold'}}>
                                {this.state.cartCount}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>

                <Card sx={{maxWidth: 345, ml: 125, mt: -30}}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image={Users}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Users
                            </Typography>
                            <Typography variant="body2" variant="h5" color="text.secondary" sx={{fontWeight:'bold'}}>
                                {this.state.userCount}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
            </Box>
        )
    }
}
export default Dashboard