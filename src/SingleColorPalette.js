import React, { Component } from 'react';
import ColorBox from './ColorBox';

export default class SingleColorPalette extends Component {
    constructor(props){
        super(props);
        // shades are not going to be changed therefore 
        // there is no need to add them to the statte
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
    }
    //Return all shades of given color (same colorId)
    gatherShades(palette, colorToFilterBy){
        let shades = [];
        let allColors = palette.colors;

        for(let key in allColors) {
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy)
            );
        }
        // return all shades of given color 
        // (.slice(1) gives everything from index 1 onwards)
        return shades.slice(1);
    }

    render() {
        const colorBoxes = this._shades.map(color => (
            <ColorBox 
                key={color.id}
                name={color.name}
                background={color.hex}
                showLink={false}
            />
        ))
        return (
            <div className="Palette">
                <h1>Single Color Palette</h1>
                <div className="Palette-colors">{colorBoxes}</div>
            </div>
        );
    }
}
