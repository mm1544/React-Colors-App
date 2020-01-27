// it is not going to be a "full class" component,
// but a "functional component" (!)
// because we will not need state, constructor, methods

import React, {PureComponent} from 'react';
import {withStyles} from '@material-ui/styles';
import styles from './styles/MiniPaletteStyles';
import DeleteIcon from '@material-ui/icons/Delete';
import { render } from '@testing-library/react';

// PureComponent is not rerendering every time when there are changes in parent state
class MiniPalette extends PureComponent {
    constructor(props){
        super(props);
        this.deletePalette = this.deletePalette.bind(this);
    }

    deletePalette(evt) {
        evt.stopPropagation();
        this.props.openDialog(this.props.id);
        // this.props.handleDelete(this.props.id);
    }
    
    render(){
        const {classes, paletteName, emoji, colors, handleClick, id} = this.props;
        const miniColorBoxes = colors.map(color => (
        <div 
            className={classes.miniColor} 
            style={{backgroundColor: color.color}}
            key={color.name}    
        />
        ));

        return (
            // there is created unique class-name inside "classes.main"
            <div 
                className={classes.root} 
                onClick={() => handleClick(id)}
            >
                <DeleteIcon 
                    className={classes.deleteIcon} 
                    style={{transition: "all 0.3s ease-in-out"}}
                    onClick={this.deletePalette}
                />
                
                <div className={classes.colors}>
                    {miniColorBoxes}
                </div>
                <h5 className={classes.title}>
                    {paletteName} <span className={classes.emoji}>{emoji}</span>
                </h5>
            </div>
        );
    }
}

export default withStyles(styles)(MiniPalette);

// "withStyles(styles)(MiniPalette)" --> higher order component. It "takes" MiniPalette and returns a new version of that component, that has some styles passed down to the PROPS. Inside of a PROPS we are going to have a "classes" property. Inside of "classes" -  "root" and etc.