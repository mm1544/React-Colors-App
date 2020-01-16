import React, { Component } from 'react';
import {Link} from "react-router-dom";
import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter';
import {withStyles} from '@material-ui/styles';
import styles from './styles/PaletteStyles';
import Navbar from './Navbar';



class SingleColorPalette extends Component {
    constructor(props){
        super(props);
        this.state = {format: "hex"};
        // shades are not going to be changed therefore 
        // there is no need to add them to the statte
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        this.changeFormat = this.changeFormat.bind(this); 
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

    changeFormat(val){
        this.setState({format: val});
    }

    render() {
        const {format} = this.state;
        const {paletteName, emoji, id} = this.props.palette;
        const {classes} = this.props;
        const colorBoxes = this._shades.map(color => (
            <ColorBox 
                key={color.name}
                name={color.name}
                background={color[format]}
                showingFullPalette={false}
            />
        ))
        return (
            <div className={classes.Palette}>
                <Navbar 
                    handleChange={this.changeFormat}
                    showingColorSlider={false}
                />
                <div className={classes.colors}>{colorBoxes}
                    <div className={classes.goBack}>
                        <Link 
                            to={`/palette/${id}`}
                        >Go Back
                        </Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}/>
            </div>
        );
    }
}
export default withStyles(styles)(SingleColorPalette);