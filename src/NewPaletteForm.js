import React, { Component } from 'react';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DraggableColorList from './DraggableColorList';
import Button from '@material-ui/core/Button';
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator";
import {ChromePicker} from "react-color";
import {arrayMove} from 'react-sortable-hoc';


const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    // 100vh - height of Appbar (!)
    height: "calc(100vh - 64px)",
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});


class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20
  }

    constructor(props){
        super(props);
        this.state = {
            open: true,
            currentColor: "teal",
            newColorName: "",
            colors: this.props.palettes[0].colors,
            newPaletteName: ""
          };
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.addNewColor = this.addNewColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeColor = this.removeColor.bind(this);
        this.clearColors = this.clearColors.bind(this);
        this.addRandomColor = this.addRandomColor.bind(this);
    }

    componentDidMount() {
        // custom validator rule 
        // "value" is whatever is in the input-field
        ValidatorForm.addValidationRule('isColorNameUnique', value => 
            this.state.colors.every(
                ({name}) => name.toLowerCase() !== value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule('isColorUnique', value => 
            this.state.colors.every(
                ({color}) => color !== this.state.currentColor
            )
        );
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => 
            this.props.palettes.every(
                ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        );
    }
    
    
    //   using arrow fn instead of (!)binding a method 
    // in a constructor
      handleDrawerOpen = () => {
        this.setState({ open: true });
      };
    
      handleDrawerClose = () => {
        this.setState({ open: false });
      };

      updateCurrentColor(newColor) {
        this.setState({currentColor: newColor.hex});
      };

      addNewColor() {
          const newColor = {
                color: this.state.currentColor,
                name: this.state.newColorName
            }
        // [...colors, this.state.currentColor] --> all the elements in "colors" arr + "this.state.currentColor"
        this.setState({colors: [...this.state.colors, newColor], newColorName: ""});
        // 'newName: "" ' to set input field empty after submitting and changing state
      };

      handleChange(evt) {
        this.setState({
        [evt.target.name]: evt.target.value
        });
      }
      
      // ???
      handleSubmit() {
        // take all the data about the colors from the state and pass it up to the App (App will be storing and keeping track of all of the palettes)
        let newName=this.state.newPaletteName;
        const newPalette = {
          paletteName: newName, 
          // '/ /g, "-"' is a regular expression use to replace empty spaces with a '-'
          id: newName.toLowerCase().replace(/ /g, "-"),
          colors: this.state.colors
        };
        this.props.savePalette(newPalette);
        // redirect after saving the palette
        this.props.history.push("/");
      }

      removeColor(colorName){
        // where color.name === colorName, will be filtered out
        this.setState({
          colors: this.state.colors.filter(color => color.name !== colorName)
        });
      }

      onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({colors}) => ({
          colors: arrayMove(colors, oldIndex, newIndex),
        }));
      };

      clearColors(){
        this.setState({colors: []});
       }

      //  takes random color from existing palettes
      addRandomColor() {
        const allColors = this.props.palettes.map(p => p.colors).flat();
        // "flat()" will make 1-D array out of multi-D array
        var rand = Math.floor(Math.random() * allColors.length);
        const randomColor = allColors[rand];
        // "[...this.state.colors, randomColor]" => all colors in this.state.colors + randomColor
        this.setState({colors: [...this.state.colors, randomColor]});
       }
    
      render() {
        // ??? theme
        const { classes, theme, maxColors } = this.props;
        const { open, colors } = this.state;
        const isPaletteFull = colors.length >= maxColors;
    
        return (
          <div className={classes.root}>
            <CssBaseline />
            <AppBar
              position="fixed"
              color='default'
              className={classNames(classes.appBar, {
                [classes.appBarShift]: open,
              })}
            >
              <Toolbar disableGutters={!open}>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classNames(classes.menuButton, open && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" noWrap>
                  Persistent drawer
                </Typography>
                {/* need to wrap TextValidator inside of ValidatorForm */}
                <ValidatorForm onSubmit={this.handleSubmit}>
                  <TextValidator 
                    // value which validator is binding
                    label="Palette Name"
                    value={this.state.newPaletteName}
                    name="newPaletteName"
                    onChange={this.handleChange}
                    validators={[
                      "required",
                      "isPaletteNameUnique"
                    ]}
                    errorMessages={[
                      "Enter Palette Name",
                      "Palette with given name already exsist"
                    ]}
                  />
                  <Button 
                    variant="contained" 
                    color="primary" 
                    // button will submit the form, it will call this.handleSubmit, set on ValidatorForm
                    type="submit"
                  >Save Palette
                  </Button>
                </ValidatorForm>
              </Toolbar>
            </AppBar>
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div className={classes.drawerHeader}>
                <IconButton onClick={this.handleDrawerClose}>
                  {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
              </div>
              <Divider />
              <Typography variant="h4">
                  Design Your Palette
              </Typography>
              <div>
                <Button 
                  variant="contained" 
                  color='secondary'
                  onClick={this.clearColors}>
                    Clear Palette
                    </Button>
                <Button 
                  variant="contained" 
                  color='primary'
                  onClick={this.addRandomColor}
                  disabled={isPaletteFull}
                >
                    Random Color
                    </Button>
              </div>
              
              <ChromePicker 
                color={this.state.currentColor}
                onChangeComplete={this.updateCurrentColor}
                />

                <ValidatorForm onSubmit={this.addNewColor}>
                    <TextValidator 
                        value={this.state.newColorName}
                        name="newColorName" //need it for handleChange
                        onChange={this.handleChange}
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
                        variant="contained" 
                        // will submit validator form
                        type="submit"
                        color='primary'
                        style={{backgroundColor: (isPaletteFull ? "grey": this.state.currentColor)}}
                        disabled={isPaletteFull}
                    >
                      {isPaletteFull ? "Palette Full": "Add Color"}
                    </Button>
                </ValidatorForm>
            </Drawer>
            <main
              className={classNames(classes.content, {
                [classes.contentShift]: open,
              })}
            >
              <div className={classes.drawerHeader} />
              {/* axis='xy' and onSortEnd needs to be specified for "react-sortable-hoc" */}
              <DraggableColorList 
                colors={colors}
                removeColor={this.removeColor}
                axis='xy'
                onSortEnd={this.onSortEnd}
              />
            </main>
          </div>
        );
      }
}
export default withStyles(styles, { withTheme: true })(NewPaletteForm); 