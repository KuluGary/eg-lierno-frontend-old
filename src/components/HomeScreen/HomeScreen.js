import React, { Component } from 'react'
import { withStyles, useTheme } from '@material-ui/core/styles';
import Auth from '../../helpers/auth';
import Api from '../../helpers/api';

const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
});

class HomeScreen extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
        if (!Auth.loggedIn()) {
            this.props.history.push("/login")
        } else {
            this.props.history.push("/characters")
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <div>LOREM</div>
            </div>
        )
    }
}

export default withStyles(useStyles)(HomeScreen)
