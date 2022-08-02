import Grid from "@mui/material/Grid";
import RubberBtn from "../../component/common/RubberBandBtn";
import * as React from "react";

export default function Cart() {
    return (
        <div>
            <Grid item lg={12} xs={12} sm={12} md={12} sx={{mt: 9, fontSize: 20}}>
                <RubberBtn name="Cart Manage"/>
            </Grid>
        </div>
    )
}