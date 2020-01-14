import React, { Component } from 'react';
import MiniPalette from './MiniPalette';
import {withStyles} from '@material-ui/styles';

const styles = {
    root: {
        backgroundColor: "blue",
        height: "100vh", // !!! 100% would not cover all screen, because "root" is wraped in another component
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center"
    },
    container: {
        // backgroundColor: "red",
        width: "50%", //% of its parent
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap",
        // border: "1px solid white"
    },
    nav: {
        // backgroundColor: "green",
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        color: "white"
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid", //using css grid system
        gridTemplateColumns: "repeat(3, 30%)", // 3 items will go across, eachone is 30%
        gridGap: "5%" // 30%*5%*30%*5%*30%

    }
};

class PaletteList extends Component {

    goToPalette(id){
        // "this.props.history" comes from routeProps
        this.props.history.push(`/palette/${id}`);
    }

    render() {
        const {palettes, classes} = this.props;
        return (
            // PaletteList is regular class based component, therefore to access "root" --> this.props.classes.root
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>React Colors</h1>
                    </nav>
                    <div className={classes.palettes}>
                        {palettes.map(palette => (
                        // passing all content of palette - {...palette}
                        // using an arrow fn to pass-in id to goToPalette()
                            <MiniPalette {...palette} handleClick={() => this.goToPalette(palette.id)}/>
                            ))}
                    </div>
                </div>
            </div>
        )
    }  
}

export default withStyles(styles)(PaletteList);

// "withStyles(styles)(PaletteList)" --> higher order component. It "takes" PaletteList and returns a new version of that component, that has some styles passed down to the PROPS. Inside of a PROPS we are going to have a "classes" property. Inside of "classes" -  "root" and etc.
