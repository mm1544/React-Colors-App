import React, { Component } from 'react';
import ColorPickerForm from './ColorPickerForm';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DraggableColorList from './DraggableColorList';
import Button from '@material-ui/core/Button';
import {arrayMove} from 'react-sortable-hoc';
import PaletteFormNav from './PaletteFormNav';


const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex',
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
    display: "flex",
    alignItems: "center"
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
  container: {
    width: "90%",
    height: "100%",
    display: "flex",
    // puts all the content in the column
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  buttons: {
    width: "100%"
  },
  button: {
    width: "50%"
  }
});


class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20
  }
    constructor(props){
        super(props);
        this.state = {
            open: true,
            colors: this.props.palettes[0].colors
          };
        this.addNewColor = this.addNewColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeColor = this.removeColor.bind(this);
        this.clearColors = this.clearColors.bind(this);
        this.addRandomColor = this.addRandomColor.bind(this);
    }
    
    //   using arrow fn instead of (!)binding a method 
    // in a constructor
      handleDrawerOpen = () => {
        this.setState({ open: true });
      };
    
      handleDrawerClose = () => {
        this.setState({ open: false });
      };

      addNewColor(newColor) {
        // [...colors, this.state.currentColor] --> all the elements in "colors" arr + "this.state.currentColor"
        this.setState({colors: [...this.state.colors, newColor], newColorName: ""});
        // 'newName: "" ' to set input field empty after submitting and changing state
      };

      handleChange(evt) {
        this.setState({
        [evt.target.name]: evt.target.value
        });
      }
      
      handleSubmit(newPalette) {
        newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
        newPalette.colors = this.state.colors;

        // take all the data about the colors from the state and pass it up to the App (App will be storing and keeping track of all of the palettes)
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
        const { classes, theme, maxColors, palettes } = this.props;
        const { open, colors} = this.state;
        const isPaletteFull = colors.length >= maxColors;
    
        return (
          <div className={classes.root}>
          <PaletteFormNav 
            open={open}
            palettes={palettes}
            handleSubmit={this.handleSubmit}
            handleDrawerOpen={this.handleDrawerOpen}
          />
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
            <div className={classes.container}>
              {/* "gutterBottom" will add spacing (material-ui) */}
              <Typography variant="h4" gutterBottom>
                  Design Your Palette
              </Typography>
              <div className={classes.buttons}>
                <Button 
                  variant="contained" 
                  color='secondary'
                  onClick={this.clearColors}
                  className={classes.button}
                >
                    Clear Palette
                    </Button>
                <Button 
                  variant="contained" 
                  color='primary'
                  onClick={this.addRandomColor}
                  disabled={isPaletteFull}
                  className={classes.button}
                >
                    Random Color
                    </Button>
              </div>
              <ColorPickerForm 
                isPaletteFull={isPaletteFull}
                addNewColor={this.addNewColor}
                colors={colors}
              />
            </div>
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