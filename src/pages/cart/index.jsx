import React, {useState} from 'react'
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
import {DatePicker} from "@mui/x-date-pickers";



const Cart = ({}) => {

    const initialValues = {
        user: "",
        date: "",
        productTitle: "",
        qty: ""
    };

    const statusObj = {
        alert: false,
        message: '',
        severity: '',
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };


    const [formValues, setFormValues] = useState(initialValues);

    const [status, setStatus] = useState(statusObj);

    const [btnLabel, setBtnLabel] = useState('Save');

    const [btnColor, setBtnColor] = useState('primary');

    const [tblData, setTblData] = useState([]);

    const [user, setUser] = React.useState('');
    const [productTitle, setProductTitle] = React.useState('');

    const handleChange = (event) => {
        setUser(event.target.value);
        setProductTitle(event.target.value);
    };

    const [value, setValue] = React.useState(null);



    return (

        <div>
            <Grid item lg={12} xs={12} sm={12} md={12} sx={{mt: 10}}>
                <RubberBtn name="Cart Manage"/>
            </Grid>
            <Divider/>

            <Box
                component="form"
                sx={{
                    '& > :not(style)': {},
                }}
                noValidate
                autoComplete="off"
            >

                <Grid container alignItems="center" justify="center" direction="row" spacing={2}
                      sx={{paddingLeft: 5, mt: 5}}
                >
                    <FormControl sx={{m: 2, width: 220, mt: 5, ml: 12}} size="large">
                        <InputLabel id="user">User Name</InputLabel>
                        <Select
                            labelId="user"
                            id="user"
                            value={user}
                            label="User Name"
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>

                    {/*<DatePicker*/}
                    {/*    label="Basic example"*/}
                    {/*    value={value}*/}
                    {/*    onChange={(newValue) => {*/}
                    {/*        setValue(newValue);*/}
                    {/*    }}*/}
                    {/*    renderInput={(params) => <TextField {...params} />}*/}
                    {/*/>*/}

                        <FormControl sx={{m: 2, width: 220, mt: 5, ml: 12}} size="large">
                            <InputLabel id="productTitle">Product Title</InputLabel>
                            <Select
                                labelId="productTitle"
                                id="productTitle"
                                value={productTitle}
                                label="Product Title"
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>

                        <Grid item sx={{mt: 5, ml: 45}}>
                            <TextField id="outlined-basic" label="Qty" variant="outlined"
                                       helperText="Enter Qty" name="qty"
                                       onChange={handleInputChange}
                                       value={formValues.qty}
                            />

                        </Grid>

                </Grid>
                <div>
                    <div>
                        <Button color={btnColor} size="large" type="submit" variant="contained"
                                sx={{ml: 15, mt: 10}}>
                            {btnLabel}
                        </Button>
                        <Button type="reset" variant="contained" color="success" size="large"
                                sx={{ml: 3, mt: 10}}>
                            Clear
                        </Button>
                    </div>

                </div>
            </Box>
        </div>
)

}

export default Cart