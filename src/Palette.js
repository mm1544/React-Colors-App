import React, { Component } from 'react'
import ColorBox from './ColorBox';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Palette.css';

export default class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = {level: 500};
        this.changeLevel = this.changeLevel.bind(this);
    }

    changeLevel(newLevel) {
        this.setState({level: newLevel});
    }

    render() {
        const colorBoxes = this.props.palette.colors[this.state.level].map(color => (
        <ColorBox background={color.hex} name={color.name} key={color.name}/>
        ));
        return (
            <div className="Palette">
                <div className="slider">
                    {/* will change the state, when slider value changes.
                    Using prop "onAfterChange", it will call the method and will pass in the new level*/}
                    <Slider 
                        defaultValue={this.state.level} 
                        min={100} 
                        max={900} 
                        step={100}
                        onAfterChange={this.changeLevel}
                    />
                </div>
                {/* Navbar goes here */}
                <div className="Palette-colors">
                    {/* bunch of color boxes */}
                    {colorBoxes}
                </div>
                {/* footer */}
            </div>
        );
    }
}
