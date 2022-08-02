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

export default function MainDash() {
    return(
        <div>
            <Grid item lg={12} xs={12} sm={12} md={12} sx={{mt:15,fontSize:25}}>
                <RubberBtn name="DashBoard"/>
            </Grid>
            <Card sx={{ maxWidth: 345,ml:25,mt:10 }}>
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
                        image={Carts}
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
                        image={Users}
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