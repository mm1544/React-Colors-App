// it is not going to be a "full class" component,
// but a "functional component" (!)
// because we will not need state, constructor, methods

import React from 'react';
import {withStyles} from '@material-ui/styles';

const styles = {
    main: {
        backgroundColor: "purple",
        border: "3px solid teal"
    },
    secondary: {
        backgroundColor: "pink"
    }
}

function MiniPalette(props) {
    const {classes} = props;
    console.log(classes);
    return (
        // there is created unique class-name inside "classes.main"
        <div className={classes.main}>
            <h1>Mini Palette</h1>
            <section className={classes.secondary}>#####################</section>
        </div>
    );
}

export default withStyles(styles)(MiniPalette);

// "withStyles(styles)(MiniPalette)" --> higher order component. It "takes" MiniPalette and returns a new version of that component, that has some styles passed down to the props. Inside of a PROPS we are going to have a "classes" property. Inside of "classes" -  "main"