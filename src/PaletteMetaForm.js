import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
            open: true,
            newPaletteName: ""
        };
        this.handleChange = this.handleChange.bind(this);
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
 
    
    render() {
        const {newPaletteName} = this.state;
        const {hideForm, handleSubmit} = this.props;
        return (
            
        <Dialog
            open={this.state.open}
            // onClose={this.handleClose}
            onClose={hideForm}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
            {/* need to wrap TextValidator inside of ValidatorForm */}
            <ValidatorForm 
                onSubmit={() => handleSubmit(newPaletteName)}
            >
            <DialogContent>
                <DialogContentText>
                    Please enter the name of your new palette. Palette name has to be unique.
                </DialogContentText>
                <Picker />
            
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
                variant="contained" 
                color="primary" 
                // button will submit the form, it will call this.handleSubmit, set on ValidatorForm
                type="submit"
            >
                Save Palette
            </Button>
            </DialogActions>
            </ValidatorForm>
        </Dialog>
          
        );
      }
}
export default PaletteMetaForm;
