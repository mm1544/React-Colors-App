import React from 'react';
import {withStyles} from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
    root: {
        width: "20%", 
        height: "25%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        /*removes spacing between rows*/
        marginBottom: "-3.5px",
        // changes color of a svg file in the root class, when hovered over
        "&:hover svg": {
            color: "white",
            transform: "scale(1.5)"
        }

    },
    boxContent: {
        position: "absolute",
        width: "100%",
        /*will move it to the left side*/
        left: "0px", 
        /*will move it to the bottom*/
        bottom: "0px", 
        padding: "10px",
        color: "rgba(0,0,0,0.5)",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px",
        display: "flex",
        justifyContent: "space-between"
    },
    deleteIcon: {
        transition: "all 0.3s ease-in-out"
    }
};

// This is just a functional component, so to delete it we will pass ID (colorName is unique, so can be used instead) of the object that we are trying to delete (in NewPaletteForm we will have a method that deletes it from colors)
function DraggableColorBox(props) {
    const {classes, handleClick, name, color} = props;
    return (
        <div 
            className={classes.root} 
            style={{backgroundColor: color}}
        >
            <div className={classes.boxContent}>
                <span>{name}</span>
                <DeleteIcon 
                    className={classes.deleteIcon}
                    onClick={handleClick}/>
            </div>
        </div>
    )
   
}
export default withStyles(styles)(DraggableColorBox);
