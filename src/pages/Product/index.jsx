import React, {useState} from 'react'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import {Grid, TextareaAutosize} from "@mui/material";
import TextField from "@mui/material/TextField";
import RubberBtn from "../../component/common/RubberBandBtn";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from '@mui/icons-material/Person';
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange, green } from '@mui/material/colors';

const Product = ({}) => {

    const initialValues = {
        title: "",
        price: "",
        category: "",
        description: "",
        chooseImage: ""
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


    const clearFields = () => {

        setFormValues({
            title: "",
            price: "",
            category: "",
            description: "",
            chooseImage: ""

        });
    };

    const [category, setCategory] = React.useState('');

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    return (

        <div>
            <Grid item lg={12} xs={12} sm={12} md={12} sx={{mt: 10}}>
                <RubberBtn name="Product Manage"/>
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
                    <Grid item sx={{mt:5,ml:45}}>
                        <TextField id="outlined-basic" label="UserName" variant="outlined"
                                   helperText="Enter Title" name="title"
                                   onChange={handleInputChange}
                                   value={formValues.title}
                        />

                    </Grid>
                    <Grid item sx={{mt:5,ml:10}}>
                        <TextField
                            helperText="Enter Price"
                            variant="outlined"
                            id="outlined-basic"
                            label="Price"
                            name="price"
                            onChange={handleInputChange}
                            value={formValues.price}
                        />
                    </Grid>

                    <FormControl sx={{m: 2, width: 220,mt:5,ml:12}} size="large">
                        <InputLabel id="category">Category</InputLabel>
                        <Select
                            labelId="category"
                            id="category"
                            value={category}
                            label="Category"
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

                    <Grid item>
                        <TextareaAutosize
                            aria-label="empty textarea"
                            placeholder="Empty"
                            style={{width: 200}}
                        />
                    </Grid>
                        <Stack direction="row" spacing={2} >
                            <Avatar sx={{ bgcolor: green[500] ,width: 150, height: 150 ,mt:-12}} variant="rounded">
                                <PersonIcon />
                            </Avatar>
                            <Button size="large" type="submit" variant="contained" color="secondary" sx={{height:55}}>
                               Choose Image
                                <input hidden accept="image/*" multiple type="file" />
                            </Button>
                        </Stack>

                </Grid>
                <div>
                    <div>
                        <Button color={btnColor} size="large" type="submit" variant="contained"
                                sx={{ml:50, mt:10}}>
                            {btnLabel}
                        </Button>
                        <Button type="reset" variant="contained" color="success" size="large"
                                sx={{ml: 3, mt:10}}>
                            Clear
                        </Button>
                    </div>

                </div>
            </Box>
        </div>
    )

}

export default Product