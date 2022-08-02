import Grid from "@mui/material/Grid";
import React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import RubberBtn from "../../component/common/RubberBandBtn";
import Product from "../../assets/img/items.jpg";
import Cart from "../../assets/img/cart.jpg";
import User from "../../assets/img/user.jpg";

export default function Dashboard() {
    return (
        <div>
            <Grid item lg={12} xs={12} sm={12} md={12} mt={5} sx={{fontSize:30}}>
                <RubberBtn name="DashBoard"/>
            </Grid>
            <Card sx={{ maxWidth: 345,ml:25,mt:20 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={Product}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Products
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            25
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Card sx={{ maxWidth: 345,ml:75,mt:-29 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={Cart}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Cart
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            10
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Card sx={{ maxWidth: 345,ml:125,mt:-29 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={User}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Users
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            40
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

        </div>
    )
}