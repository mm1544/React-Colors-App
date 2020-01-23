import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator";
import {ChromePicker} from "react-color";
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/ColorPickerFormStyles';

class ColorPickerForm extends Component {
    constructor(props) {
        super(props);
        this.state={ 
            currentColor: "teal",
            newColorName: ""
        }
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // custom validator rule 
        // "value" is whatever is in the input-field
        ValidatorForm.addValidationRule('isColorNameUnique', value => 
            this.props.colors.every(
                ({name}) => name.toLowerCase() !== value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule('isColorUnique', () => 
            this.props.colors.every(
                ({color}) => color !== this.state.currentColor
            )
        );
    }

    updateCurrentColor(newColor) {
        this.setState({currentColor: newColor.hex});
      };

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    handleSubmit() {
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName
        };
        this.props.addNewColor(newColor);
        this.setState({newColorName: ""});
    }

    render() {
        const {isPaletteFull, classes} = this.props;
        const {currentColor, newColorName} = this.state;
        return (
            <div>
                <ChromePicker 
                color={currentColor}
                onChangeComplete={this.updateCurrentColor}
                className={classes.picker}
                />

                <ValidatorForm onSubmit={this.handleSubmit}>
                    <TextValidator 
                        className={classes.colorNameInput}
                        value={newColorName}
                        //needed for handleChange
                        name="newColorName" 
                        variant="filled"
                        margin="normal"
                        onChange={this.handleChange}
                        placeholder="Color Name"
                        // order matters
                        validators={[
                          'required', 
                          'isColorNameUnique', 
                          'isColorUnique'
                        ]}
                        errorMessages={[
                          'Enter a color name', 
                          'Color name must be unique', 
                          'Color already used'
                        ]}
                    />
                    <Button 
                        className={classes.addColor}
                        variant="contained" 
                        // will submit validator form
                        type="submit"
                        color='primary'
                        style={{backgroundColor: (isPaletteFull ? "grey": currentColor)}}
                        disabled={isPaletteFull}
                    >
                      {isPaletteFull ? "Palette Full": "Add Color"}
                    </Button>
                </ValidatorForm>
            </div>
        )
    }
}
// export default ColorPickerForm;
export default withStyles(styles)(ColorPickerForm); 