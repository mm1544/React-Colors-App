import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import MiniPalette from './MiniPalette';
import {withStyles} from '@material-ui/styles';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
// gives a circle in Dialog
import Avatar from "@material-ui/core/Avatar";
// importing colors from Material-ui
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import styles from './styles/PaletteListStyles';

class PaletteList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDeleteDialog: false,
            deletingId: ""
        };
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.goToPalette = this.goToPalette.bind(this);
    }
    // id is an id of a palette for which the dialog is opened
    openDialog(id) {
        this.setState({ openDeleteDialog: true, deletingId: id });
    }
    closeDialog() {
        this.setState({ openDeleteDialog: false, deletingId: "" });
    }
    goToPalette(id){
        // "this.props.history" comes from routeProps
        this.props.history.push(`/palette/${id}`);
    }
    handleDelete(){
        this.props.deletePalette(this.state.deletingId);
        this.closeDialog();
    }
    render() {
        const { palettes, classes } = this.props;
        const { openDeleteDialog } = this.state;
        return (
            // PaletteList is regular class based component, therefore to access "root" --> this.props.classes.root
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1 className={classes.heading}>React Colors</h1>
                        <Link to='/palette/new'>Create Palette</Link>
                    </nav>
                    {/* wrapping everything into TransitionGroup */}
                    <TransitionGroup className={classes.palettes}>
                        {palettes.map(palette => (
                            // wrapping each palette in CSSTransition
                            <CSSTransition 
                                key={palette.id} 
                                classNames="fade"
                                timeout={500}
                            >
                                {/* //# passing all content of palette - {...palette}
                                //# using an arrow fn to pass-in id to goToPalette() */}
                                <MiniPalette 
                                    {...palette}
                                    goToPalette={this.goToPalette}
                                    // handleDelete={deletePalette}
                                    openDialog={this.openDialog}
                                    key={palette.id}
                                    id={palette.id}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </div>
                {/* each Dialog needs to have a prop that specifies when it should be open */}
                <Dialog 
                    open={openDeleteDialog} 
                    aria-labelledby="delete-dialog-title"
                    onClose={this.closeDialog}
                >
                    <DialogTitle id="delete-dialog-title">Delete this palette?</DialogTitle>
                    <List>
                        {/* # button prop will give a hover-over effect;
                        # arrow function allows to pass deletingId in-line */}
                        <ListItem 
                            button
                            onClick={this.handleDelete}
                        >
                            <ListItemAvatar>
                                {/* blue[100] will give a light-blue;  color: blue[600] - will set icon's color to dark blue */}
                            <Avatar 
                                style={{backgroundColor: blue[100], color: blue[600]}}>
                                    <CheckIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText>
                                Delete
                            </ListItemText>
                        </ListItem>
                        <ListItem button onClick={this.closeDialog}>
                            <ListItemAvatar>
                                <Avatar
                                    style={{backgroundColor: red[100], color: red[600]}}>
                                    <CloseIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText>
                                Cancel
                            </ListItemText>
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        );
    }  
}

export default withStyles(styles)(PaletteList);

// "withStyles(styles)(PaletteList)" --> higher order component. It "takes" PaletteList and returns a new version of that component, that has some styles passed down to the PROPS. Inside of a PROPS we are going to have a "classes" property. Inside of "classes" -  "root" and etc.
