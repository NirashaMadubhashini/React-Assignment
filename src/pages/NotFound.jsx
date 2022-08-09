import {Component} from "react";
import {withStyles} from "@mui/styles";
import not_found from "../assets/img/404error.png";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";

const stylesheet = () => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    img_container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '20%'
    },
    img: {
        width: '100%'
    }
})


class NotFound extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {classes} = this.props
        return (
            <div className={classes.container}>
                <div className={classes.img_container}>
                    <img className={classes.img} src={not_found} alt="404 Error"/>
                </div>
                <Link to={"/"}>
                    {/*<GDSEButton
                        label="Back to home page"
                        variant={"text"}
                    />*/}
                    <Button variant={"text"} type={"button"}>Back to login page</Button>
                </Link>
            </div>
        );
    }
}

export default withStyles(stylesheet)(NotFound)