import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Picker} from 'emoji-mart';
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator";
import 'emoji-mart/css/emoji-mart.css'



class PaletteMetaForm  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // controls which dialog has to be opened
            stage: "form",
            newPaletteName: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.showEmojiPicker = this.showEmojiPicker.bind(this);
        this.savePalette = this.savePalette.bind(this);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => 
            this.props.palettes.every(
                ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        );
    }

    handleChange(evt) {
        this.setState({
        [evt.target.name]: evt.target.value
        });
    }
      
    //   using class properties (with arrow functions)
    handleClickOpen = () => {
      this.setState({ open: true });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };

    showEmojiPicker() {
        this.setState({stage: "emoji"});
    }

    savePalette(emoji) {
        const newPalette = {
            paletteName: this.state.newPaletteName, 
            emoji: emoji.native
        };
        this.props.handleSubmit(newPalette);
    }
 
    
    render() {
        const {newPaletteName} = this.state;
        const {hideForm} = this.props;
        return (
        <div>
            // Separate dialog for Emoji Picker
            <Dialog 
                open={this.state.stage === "emoji"}
                onClose={hideForm}    
            >
                <DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
                <Picker 
                    onSelect={this.savePalette}
                    title="Pick a Palette Emoji"
                />
            </Dialog>
            <Dialog
                open={this.state.stage === "form"}
                // it's gone when clicked to the side
                onClose={hideForm}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                {/* need to wrap TextValidator inside of ValidatorForm */}
                <ValidatorForm 
                    // onSubmit={() => handleSubmit(newPaletteName)}
                    onSubmit={this.showEmojiPicker}
                >
                <DialogContent>
                    <DialogContentText>
                        Please enter the name of your new palette. Palette name has to be unique.
                    </DialogContentText>
                    
                
                    <TextValidator 
                        // value which validator is binding
                        label="Palette Name"
                        value={newPaletteName}
                        name="newPaletteName"
                        onChange={this.handleChange}
                        fullWidth
                        margin="normal"
                        validators={[
                        "required",
                        "isPaletteNameUnique"
                        ]}
                        errorMessages={[
                        "Enter Palette Name",
                        "Palette with given name already exsist"
                        ]}
                    />
                    
                
                </DialogContent>
                <DialogActions>
                <Button onClick={hideForm} color="primary">
                    Cancel
                </Button>
                <Button 
                    // button will submit the form, it will call this.handleSubmit, set on ValidatorForm
                    type="submit"
                    variant="contained" 
                    color="primary" 
                    
                >
                    Save Palette
                </Button>
                </DialogActions>
                </ValidatorForm>
            </Dialog>
        </div>
          
        );
      }
}
export default PaletteMetaForm;
