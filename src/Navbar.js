import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import styles from './styles/NavbarStyles';


class Navbar extends Component {
    // going to use a !!controled input
    constructor(props){
        super(props);
        // "hex" is a default
        this.state = {format: "hex", open: false};
        this.handleFormatChange = this.handleFormatChange.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
    }

    handleFormatChange(evt) {
        // setting state and using a callback fn
        this.setState({format: evt.target.value, open: true}, () => this.props.handleChange(this.state.format));
    }

    closeSnackbar() {
        this.setState({open: false});
    }

    render() {
        const {level, changeLevel, showingColorSlider, classes} = this.props;
        const {format} = this.state;
        return (
            <header className={classes.Navbar}>
                <div className={classes.logo}>
                    <Link to='/'>React Color App</Link>
                </div>
                {showingColorSlider && (
                    <div>
                        <span>Level: {level}</span>
                        <div className={classes.slider}> 
                            {/* will change the state, when slider value changes.
                            Using prop "onAfterChange", it will call the method and will pass in the new level*/}
                            
                            <Slider 
                                defaultValue={level} 
                                min={100} 
                                max={900} 
                                step={100}
                                onAfterChange={changeLevel}
                            />
                        </div>
                    </div>
                )}
                <div className={classes.selectContainer}>
                    {/* will be passing Menu Items inside of Select */}
                    <Select 
                        value={format}
                        onChange={this.handleFormatChange}
                    >
                        {/* each MenuItem has a value */}
                        <MenuItem value="hex">HEX - #ffff</MenuItem>
                        <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
                        <MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem>
                    </Select>
                </div>
                {/* "anchorOrigin" tells where it should be on the page */}
                <Snackbar 
                    anchorOrigin={{vertical: "bottom", horizontal: "left"}}
                    open={this.state.open}
                    // after set time the message is vanishing off
                    autoHideDuration={3000}
                    message={<span id="message-id">Format Changed to {format.toUpperCase()}</span>}
                    // for a screen reader
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    // closes when we click anywhere on the page
                    onClose={this.closeSnackbar}
                    action={[
                        <IconButton 
                            onClick={this.closeSnackbar}
                            color="inherit"
                            key="close"
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        ]}
                ></Snackbar>
            </header>
        )
    }
}
export default withStyles(styles)(Navbar);