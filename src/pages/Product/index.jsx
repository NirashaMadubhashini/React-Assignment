import React, {useEffect, useState} from 'react'
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
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductService from "../../services/ProductService";
import AdminService from "../../services/AdminService";
const defaultPosition = toast.POSITION.BOTTOM_CENTER;


export const showToast = (type = "success", msg, autoClose = 2000, className = "primaryColor", position = defaultPosition) => {
    if (type === "success") {
        toast.success(msg, {
            autoClose: autoClose === null ? 2000 : autoClose,
            className: className === null ? "primaryColor" : className,
            position: position,
        });
    } else if (type === "error") {
        toast.error(msg, {
            autoClose: autoClose === null ? 2000 : autoClose,
            className: className === null ? "dangerColor" : className,
            position: position,
        });
    }
};

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        await submitProduct();
    }
    useEffect(() => {
        loadData();
    }, [])

    const clearFields = () => {

        setFormValues({
            title: "",
            price: "",
            category: "",
            description: "",
            chooseImage: ""

        });
    };

    const submitProduct = async () => {

        let dto = {};
        dto = formValues;

        if (btnLabel === "Add Product") {
            let res = await ProductService.postProducts(dto);//customer service --> postCustomer()
            console.log(res.status)

            console.log("res Status", res.data)
            if (res.data.code === 200) {

                setStatus({
                    alert: true,
                    message: "S",
                    severity: 'success'
                })
                showToast('success', 'saved successfully !');

                loadData();
                clearFields();

            } else {
                setStatus({
                    alert: true,
                    message: "E",
                    severity: 'error'
                });
                console.log("not Equal")
                showToast('error', 'Not Saved');
            }
        }
    };

    const loadData = async () => {
        ProductService.fetchProducts().then((res) => {
            if (res.status === 200) {

            }
        });
    };


    const [category, setCategory] = React.useState('');

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    return (

        <div>
            <ToastContainer/>
            <Grid item lg={12} xs={12} sm={12} md={12} sx={{mt: 10}}>
                <RubberBtn name="Product Manage"/>
            </Grid>
            <Divider/>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    '& > :not(style)': {},
                }}
                noValidate
                autoComplete="off"
            >

                <Grid container alignItems="center" justify="center" direction="row" spacing={2}
                      sx={{paddingLeft: 5, mt: 5}}
                >
                    <Grid item sx={{mt:-20,ml:5}}>
                        <TextField id="outlined-basic" label="Title" variant="outlined"
                                   helperText="Enter Title" name="title"
                                   onChange={handleInputChange}
                                   value={formValues.title}
                        />

                    </Grid>
                    <Grid item sx={{mt:-20,ml:10}}>
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

                    <FormControl sx={{m: 2, width: 220,mt:-19,ml:10}} size="large">
                        <InputLabel id="category">Category</InputLabel>
                        <Select
                            labelId="category"
                            id="category"
                            value={formValues.category}
                            label="Category"
                            name="category"
                            onChange={handleInputChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>

                    <Grid item sx={{ml:5,mt:-20}}>
                        <TextareaAutosize
                            aria-label="empty textarea"
                            placeholder="Empty"
                            style={{width: 200}}
                        />
                    </Grid>
                    <FormControl sx={{m: 2, width: 220,mt:15,ml:8}} size="large">
                        <Stack direction="row" spacing={2} >
                            <Avatar sx={{ bgcolor: green[500] ,width: 150, height: 150 ,mt:-12}} variant="rounded">
                                <PersonIcon />
                            </Avatar>
                        </Stack>
                        <br/>
                        <Button size="large" type="submit" variant="contained" color="secondary">
                            Choose Image
                            <input hidden accept="image/*" multiple type="file" />
                        </Button>
                    </FormControl>
                </Grid>
                <div>
                    <div>
                        <Button color={btnColor} size="large" type="submit" variant="contained"
                                sx={{ml:15,mt:-25}}>

                            {btnLabel}
                        </Button>
                        <Button onClick={clearFields} type="reset" variant="contained" color="success" size="large"
                                sx={{ml: 3, mt:-25}}>
                            Clear
                        </Button>
                    </div>

                </div>
            </Box>
        </div>
    )

}

export default Product