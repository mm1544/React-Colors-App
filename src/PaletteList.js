import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import MiniPalette from './MiniPalette';
import {withStyles} from '@material-ui/styles';
import styles from './styles/PaletteListStyles';

class PaletteList extends Component {

    goToPalette(id){
        // "this.props.history" comes from routeProps
        this.props.history.push(`/palette/${id}`);
    }

    render() {
        const {palettes, classes, deletePalette} = this.props;
        return (
            // PaletteList is regular class based component, therefore to access "root" --> this.props.classes.root
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1 className={classes.heading}>React Colors</h1>
                        <Link to='/palette/new'>Create Palette</Link>
                    </nav>
                    <div className={classes.palettes}>
                        {palettes.map(palette => (
                        // passing all content of palette - {...palette}
                        // using an arrow fn to pass-in id to goToPalette()
                            <MiniPalette 
                                {...palette}
                                handleClick={() => this.goToPalette(palette.id)}
                                handleDelete={deletePalette}
                                key={palette.id}
                                id={palette.id}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }  
}

export default withStyles(styles)(PaletteList);

// "withStyles(styles)(PaletteList)" --> higher order component. It "takes" PaletteList and returns a new version of that component, that has some styles passed down to the PROPS. Inside of a PROPS we are going to have a "classes" property. Inside of "classes" -  "root" and etc.
