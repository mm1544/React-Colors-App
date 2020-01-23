import React from 'react';
import {SortableElement} from 'react-sortable-hoc';
import {withStyles} from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './styles/DraggableColorBoxStyles';

// This is just a functional component, so to delete it we will pass ID (colorName is unique, so can be used instead) of the object that we are trying to delete (in NewPaletteForm we will have a method that deletes it from colors)
const DraggableColorBox = SortableElement((props) => {
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
    );
   
});
export default withStyles(styles)(DraggableColorBox);
