import React, { Component } from 'react'
import ColorBox from './ColorBox';
import Navbar from './Navbar';
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
                <Navbar level={this.state.level} changeLevel={this.changeLevel}/>
                <div className="Palette-colors">
                    {/* bunch of color boxes */}
                    {colorBoxes}
                </div>
                {/* footer */}
            </div>
        );
    }
}
