import React, { Component } from 'react';
import {Link} from "react-router-dom";
import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter';
import {withStyles} from '@material-ui/styles';
import Navbar from './Navbar';

// JSS
const styles = {
    Palette: {
        height: "100vh", /*view height*/
        display: "flex",
        flexDirection: "column"
    },
    colors: {
        /* 90% because we reserve space
     for navbar and footer */
        height: "90%" 
        /*...of its parent,
     i.e. "Palette", which is 100vh...*/
    },
    goBack: {
        /* 5 boxes will go across the screen*/
        width: "20%", 
        height: "50%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        /*removes spacing between rows*/
        marginBottom: "-3.5px",
        opacity: 1,
        backgroundColor: "black",
        "& a": {
            color: "white",
            width: "100px",
            height: "30px",
            position: "absolute",
            display: "inline-block",
            top: "50%",
            left: "50%",
            marginLeft: "-50px",
            marginTop: "-15px",
            textAlign: "center",
            outline: "none", /*no default outline*/
            background: "rgba(255, 255, 255, 0.3)",
            fontSize: "1rem",
            lineHeight: "30px",
            textTransform: "uppercase",
            border: "none",
            /* cancels Link's default decorations */
            textDecoration: "none"
        }
    }
};

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