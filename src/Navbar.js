import React, { Component } from 'react'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css';


export default class Navbar extends Component {
    // going to use a !!controled input
    constructor(props){
        super(props);
        // "hex" is a default
        this.state = {format: "hex"};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
        // setting state and using a callback fn
        this.setState({format: evt.target.value}, () => this.props.handleChange(this.state.format));
        
    }

    render() {
        const {level, changeLevel} = this.props;
        const {format} = this.state;
        return (
            <header className="Navbar">
                <div className="logo">
                    <a href="#">React Color App</a>
                </div>
                <div className="slider-container">
                    <span>Level: {level}</span>
                    <div className="slider">
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
                <div className="select-container">
                    {/* will be passing Menu Items inside of Select */}
                    <Select 
                        value={format}
                        onChange={this.handleChange}
                    >
                        {/* each MenuItem has a value */}
                        <MenuItem value="hex">HEX - #ffff</MenuItem>
                        <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
                        <MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem>
                    </Select>
                </div>
            </header>
        )
    }
}
