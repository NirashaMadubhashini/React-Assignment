import React, {useEffect, useState} from 'react'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import {Grid, IconButton} from "@mui/material";
import TextField from "@mui/material/TextField";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import RubberBtn from "../../component/common/RubberBandBtn";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import {visuallyHidden} from "@mui/utils";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import TablePagination from "@mui/material/TablePagination";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultPosition = toast.POSITION.BOTTOM_CENTER;


function createData(firstName, lastName, email, username, password, city, street, streetNo, zipCode, latValue, longValue, mobileNo, update, deleted) {
    return {
        firstName,
        lastName,
        email,
        username,
        password,
        city,
        street,
        streetNo,
        zipCode,
        latValue,
        longValue,
        mobileNo,
        update,
        deleted

    };
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}


const headCells = [

    {
        id: 'firstName',
        numeric: false,
        disablePadding: true,
        label: 'First Name',
    },
    {
        id: 'lastName',
        numeric: false,
        disablePadding: true,
        label: 'Last Name',
    },
    {
        id: 'email',
        numeric: false,
        disablePadding: true,
        label: 'Email',
    },
    {
        id: 'username',
        numeric: false,
        disablePadding: true,
        label: 'UserName',
    },
    {
        id: 'password',
        numeric: false,
        disablePadding: true,
        label: 'Password',
    },
    {
        id: 'city',
        numeric: false,
        disablePadding: true,
        label: 'City',
    },
    {
        id: 'street',
        numeric: false,
        disablePadding: true,
        label: 'Street',
    },
    {
        id: 'streetNo',
        numeric: false,
        disablePadding: true,
        label: 'Street No',
    },
    {
        id: 'zipCode',
        numeric: false,
        disablePadding: true,
        label: 'Zip Code',
    },
    {
        id: 'latValue',
        numeric: false,
        disablePadding: true,
        label: 'Lat Value',
    },
    {
        id: 'longValue',
        numeric: false,
        disablePadding: true,
        label: 'Long Value',
    },
    {
        id: 'mobileNo',
        numeric: false,
        disablePadding: true,
        label: 'Mobile No',
    },
    {
        id: 'update',
        numeric: false,
        disablePadding: true,
        label: 'Update',
    },
    {
        id: 'deleted',
        numeric: false,
        disablePadding: true,
        label: 'Delete',
    },
];

function EnhancedTableHead(props) {
    const {onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">

                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}


EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
    const {numSelected} = props;

};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

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


const User = ({}) => {

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        city: "",
        street: "",
        streetNo: "",
        zipCode: "",
        latValue: "",
        longValue: "",
        mobileNo: "",
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

    const [btnLabel, setBtnLabel] = useState('Update');

    const [btnColor, setBtnColor] = useState('primary');

    const [tblData, setTblData] = useState([]);

    useEffect(() => {

    }, [])


    const clearFields = () => {

        setFormValues({
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
            city: "",
            street: "",
            streetNo: "",
            zipCode: "",
            latValue: "",
            longValue: "",
            mobileNo: "",

        });
    };


    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = useState([]);

    const setDataToRows = (td) => {

        console.log("tablemap", td);
        const newArr2 = []
        for (let i = 0; i < td.length; i++) {
            newArr2.push((createData(
                td[i].firstName, td[i].lastName, td[i].email, td[i].username,
                td[i].password, td[i].city, td[i].street,
                td[i].streetNo,
                td[i].zipCode,
                td[i].latValue,
                td[i].longValue,
                td[i].mobileNo
            )))
        }
        console.log("new Arra", newArr2)
        setRows(newArr2)
        // td.map((data) => (
        //     setRows(createData(
        //         data.registrationNO, data.brand, data.type, data.noOfPassengers, data.transmissionType, data.fuelType, data.color, data.frontViewImg,
        //         data.backViewImg, data.sideViewImg, data.internalViewImg, data.dailyRate, data.monthlyRate, data.freeKmForPrice, data.freeKmForDuration,
        //         data.lossDamageWaiver, data.priceForExtraKm, data.completeKm,"update","deleted","maintain"
        //     ))
        // ))

    };


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const isSelected = (name) => selected.indexOf(name) !== -1;


    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (

        <div>
            <Grid item lg={12} xs={12} sm={12} md={12} sx={{mt:10}}>
                <RubberBtn name="User Registration"/>
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
                    <Grid item>
                        <TextField
                            helperText="Enter First Name"
                            id="outlined-basic"
                            label="First Name"
                            name="firstName"
                            validators={['required']}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            helperText="Enter Last Name"
                            id="outlined-basic"
                            label="Last Name"
                            name="lastName"
                            validators={['required']}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            helperText="Enter Email"
                            id="outlined-basic"
                            label="Email"
                            name="email"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            helperText="Enter UserName"
                            id="outlined-basic"
                            label="UserName"
                            name="username"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            helperText="Enter Password"
                            id="outlined-basic"
                            label="Password"
                            name="password"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            helperText="Enter City"
                            id="outlined-basic"
                            label="City"
                            name="city"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            helperText="Enter Street"
                            id="outlined-basic"
                            label="Street"
                            name="street"
                            validators={['required']}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            helperText="Enter Street No"
                            id="outlined-basic"
                            label="Street No"
                            name="streetNo"
                            validators={['required']}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            helperText="Enter Zip Code"
                            id="outlined-basic"
                            label="Zip Code"
                            name="zipCode"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            helperText="Enter Lat Value"
                            id="outlined-basic"
                            label="Lat Value"
                            name="latValue"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            helperText="Enter Long Value"
                            id="outlined-basic"
                            label="Long Value"
                            name="longValue"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            helperText="Enter Mobile No"
                            id="outlined-basic"
                            label="Mobile No"
                            name="mobileNo"
                        />
                    </Grid>

                </Grid>
                <div>
                    <div>
                        <Button color={btnColor} size="medium" type="submit" variant="contained" sx={{ml:5, mt: 5}}>
                            {btnLabel}
                        </Button>

                        <Button onClick={clearFields} type="reset" variant="contained" color="success" sx={{ml:2, mt: 5}}>
                           Clear
                        </Button>
                    </div>

                    <Box sx={{width: '100%'}}>
                        <Paper sx={{width: '100%', mb: 2}}>
                            <EnhancedTableToolbar numSelected={selected.length}/>
                            <TableContainer>
                                <Table
                                    sx={{minWidth: 750, marginTop: 5}}
                                    aria-labelledby="tableTitle"
                                    size={dense ? 'small' : 'medium'}
                                >
                                    <EnhancedTableHead
                                        numSelected={selected.length}
                                        order={order}
                                        orderBy={orderBy}
                                        onSelectAllClick={handleSelectAllClick}
                                        onRequestSort={handleRequestSort}
                                        rowCount={rows.length}
                                    />
                                    <TableBody>
                                        {stableSort(rows, getComparator(order, orderBy))
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row, index) => {
                                                const isItemSelected = isSelected(row.firstName);
                                                const labelId = `enhanced-table-checkbox-${index}`;

                                                return (
                                                    <TableRow
                                                        hover
                                                        aria-checked={isItemSelected}
                                                        tabIndex={-1}
                                                        key={row.firstName}
                                                        selected={isItemSelected}
                                                    >
                                                        <TableCell>
                                                        </TableCell>
                                                        <TableCell
                                                            component="th"
                                                            id={labelId}
                                                            scope="row"
                                                            padding="none"
                                                        >
                                                            {row.firstName}
                                                        </TableCell>
                                                        <TableCell
                                                            component="th"
                                                            id={labelId}
                                                            scope="row"
                                                            padding="none"
                                                        >
                                                            {row.lastName}
                                                        </TableCell>
                                                        <TableCell component="th"
                                                                   id={labelId}
                                                                   scope="row"
                                                                   padding="none">{row.email}
                                                        </TableCell>
                                                        <TableCell component="th"
                                                                   id={labelId}
                                                                   scope="row"
                                                                   padding="none">{row.username}
                                                        </TableCell>
                                                        <TableCell component="th"
                                                                   id={labelId}
                                                                   scope="row"
                                                                   padding="none">{row.password}
                                                        </TableCell>
                                                        <TableCell component="th"
                                                                   id={labelId}
                                                                   scope="row"
                                                                   padding="none">{row.city}
                                                        </TableCell>
                                                        <TableCell component="th"
                                                                   id={labelId}
                                                                   scope="row"
                                                                   padding="none">{row.street}
                                                        </TableCell>
                                                        <TableCell component="th"
                                                                   id={labelId}
                                                                   scope="row"
                                                                   padding="none">{row.streetNo}
                                                        </TableCell>
                                                        <TableCell component="th"
                                                                   id={labelId}
                                                                   scope="row"
                                                                   padding="none">{row.zipCode}
                                                        </TableCell>
                                                        <TableCell component="th"
                                                                   id={labelId}
                                                                   scope="row"
                                                                   padding="none">{row.latValue}
                                                        </TableCell>
                                                        <TableCell component="th"
                                                                   id={labelId}
                                                                   scope="row"
                                                                   padding="none">{row.longValue}
                                                        </TableCell>
                                                        <TableCell component="th"
                                                                   id={labelId}
                                                                   scope="row"
                                                                   padding="none">{row.mobileNo}
                                                        </TableCell>

                                                        <TableCell component="th"
                                                                   id={labelId}
                                                                   scope="row"
                                                                   padding="none">{row.update}
                                                            <IconButton color="info" aria-label="update" component="label">
                                                                <CreateIcon/>
                                                            </IconButton>

                                                        </TableCell>
                                                        <TableCell component="th"
                                                                   id={labelId}
                                                                   scope="row"
                                                                   padding="none">{row.delete}

                                                            <IconButton
                                                                        color="error" aria-label="delete"
                                                                        component="label">
                                                                <DeleteIcon/>
                                                            </IconButton>
                                                        </TableCell>

                                                    </TableRow>
                                                );
                                            })}
                                        {emptyRows > 0 && (
                                            <TableRow
                                                style={{
                                                    height: (dense ? 33 : 53) * emptyRows,
                                                }}
                                            >
                                                <TableCell colSpan={6}/>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </Box>

                </div>
            </Box>
        </div>
    )

}

export default User