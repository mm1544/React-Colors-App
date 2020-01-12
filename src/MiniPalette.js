// it is not going to be a "full class" component,
// but a "functional component" (!)
// because we will not need state, constructor, methods

import React from 'react';
import {withStyles} from '@material-ui/styles';

const styles = {
    root: {
        backgroundColor: "white",
        border: "1px solid black",
        borderRadius: "5px",
        padding: "0.5rem",
        position: "relative",
        overflow: "hidden",
        "&:hover": {
            cursor: "pointer"
        }
    },
    colors: {
        backgroundColor: "#dae1e4",
        height: "150px",
        width: "100%",
        borderRadius: "5px",
        overflow: "hidden"
    },
    title: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "0",
        color: "black",
        paddingTop: "0.5rem",
        fontSize: "1rem",
        position: "relative"
    },
    emoji: {
        marginLeft: "0.5rem",
        fontSize: "1.5rem"
    },
    miniColor: {
        // it will give us 4 elements horzontaly and
        // 5 el. verticaly
        height: "25%",
        width: "20%",
        display: "inline-block",
        margin: "0 auto",
        position: "relative",
        marginBotom: "-3.5px"
    }
}

function MiniPalette(props) {
    const {classes, paletteName, emoji, colors} = props;
    const miniColorBoxes = colors.map(color => (
        <div 
            className={classes.miniColor} 
            style={{backgroundColor: color.color}}
            key={color.name}    
        ></div>
    ));
    return (
        // there is created unique class-name inside "classes.main"
        <div className={classes.root}>
            <div className={classes.colors}>
                {miniColorBoxes}
            </div>
            <h5 className={classes.title}>{paletteName} <span className={classes.emoji}>{emoji}</span></h5>
        </div>
    );
}

export default withStyles(styles)(MiniPalette);

// "withStyles(styles)(MiniPalette)" --> higher order component. It "takes" MiniPalette and returns a new version of that component, that has some styles passed down to the PROPS. Inside of a PROPS we are going to have a "classes" property. Inside of "classes" -  "root" and etc.