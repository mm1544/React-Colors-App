import React, { Component } from 'react';
import {CopyToClipboard} from "react-copy-to-clipboard";
import {Link} from 'react-router-dom';
import chroma from 'chroma-js';
import {withStyles} from '@material-ui/styles';
import './ColorBox.css';

// withStyles adds all the classses, that are created based on "styles", to the PROPS. Therefore we can access those classes from PROPS.
// It allows to move logic to styles object
const styles = {
    ColorBox: {
        /* 5 boxes will go across the screen*/
        width: "20%", 
        height: props => (props.showingFullPalette ? "25%" : "50%"),
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        /*removes spacing between rows*/
        marginBottom: "-3.5px",
        "&:hover button": {
            opacity: "1"
        } 
    },
    copyText: {
        color: props => 
            chroma(props.background).luminance() >= 0.7 ? "black" : "white"
    },
    colorName: {
        color: props => 
            chroma(props.background).luminance() <= 0.08 ? "white" : "black"
    },
    seeMore: {
        color: props => 
            chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.6)" : "white",
        background: "rgba(255, 255, 255, 0.3)",
        position: "absolute",
        border: "none",
        /* moves to bottom-right side */
        right: "0px",
        bottom: "0px",
        width: "60px",
        height: "30px",
        textAlign: "center",
        lineHeight: "30px",
        textTransform: "uppercase"
    },
    copyButton: {
        color: props => 
            chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.6)" : "white",
        width: "100px",
        height: "30px",
        position: "absolute",
        display: "inline-block",
        top: "50%",
        left: "50%",
        marginLeft: "-50px",
        marginTop: "-15px",
        textAlign: "center",
        outline: "none", /*no default outline*/
        background: "rgba(255, 255, 255, 0.3)",
        fontSize: "1rem",
        lineHeight: "30px",
        textTransform: "uppercase",
        border: "none",
        /* cancels Link's default decorations */
        textDecoration: "none",
        opacity: 0
    },
    boxContent: {
        position: "absolute",
        width: "100%",
        /*will move it to the left side*/
        left: "0px", 
        /*will move it to the bottom*/
        bottom: "0px", 
        padding: "10px",
        color: "black",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px"
    },
    copyOverlay: {
        opacity: "0",
        zIndex: "0",
        width: "100%",
        height: "100%",
        transition: "transform 0.6s ease-in-out",
        /*sets initial scale, so when it is scaled-up, 
        it "grows" from the  middle*/
        transform: "scale(0.1)"
    },
    showOverlay: {
        opacity: "1",
        transform: "scale(50)",
        zIndex: "10",
        position: "absolute"
    },
    copyMessage: {
        /* initial position is fixed (?) */
        position: "fixed",
        left:"0",
        right:"0",
        top:"0",
        bottom:"0",
        /* using flexBox to center objects */
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        /*puts elements in column*/
        flexDirection: "column", 
        fontSize: "4rem",
        transform: "scale(0.1)",
        opacity: "0",
        color: "white",
        // selecting h1 inside of copyMessage class
        "& h1": {
            fontWeight: "400",
            textShadow: "1px 2px black",
            background: "rgba(255, 255, 255, 0.2)",
            width: "100%",
            textAlign: "center",
            marginBottom: "0",
            padding: "1rem",
            textTransform: "uppercase"
        },
        "& p": {
            fontSize: "2rem",
            fontWeight: "100"
        }
    },
    showMessage: {
        opacity: "1",
        transform: "scale(1)",
        zIndex: "25",
        transition: "all 0.4s ease-in-out",
        transitionDelay: "0.3s"
    }

}

class ColorBox extends Component {
    constructor(props) {
        super(props);
        this.state = {copied: false};
        this.changeCopyState = this.changeCopyState.bind(this);
    }

    changeCopyState() {
        // setState with a callback fn
        this.setState({copied: true}, () => (
            setTimeout(() => this.setState({ copied: false}), 1500)
        ));
    }

    render() {
        const {name, background, moreUrl, showingFullPalette, classes} = this.props;
        
        return (
            // 'wrapping' all ColorBox to CopyToClipboard
            // After clicking on ColorBox this.props.background
            // will be copied to clipboard
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div className={classes.ColorBox} style={{ background }}>
                    {/* we need a new Div for Overlay animation is because  when we will use
                     a scale (in animation) to "grow" a Div, it will also grow content this that div
                    
                    This separate Div will appear, grow and go away*/}
                    <div className={`${classes.copyOverlay} ${this.state.copied && classes.showOverlay}`} style={{ background }}/>
                    {/* text is separated to diferent div because we don't want it to be affected by scaling */}
                    <div className={`${classes.copyMessage} ${this.state.copied && classes.showMessage}`} style={{ background }}>
                        <h1>copied!</h1>
                        <p className={classes.copyText}>{background}</p>
                    </div>
                    <div>
                        <div className={classes.boxContent}>
                            {/* conditionaly adding class "light-text" */}
                            <span className={classes.colorName}>{name}</span>
                        </div>
                        <button className={classes.copyButton}>Copy</button>
                    </div>
                    {/* stopPropagation() --> Prevents further events from 
                    being propagated (copying to clipboard and animation) */}
                    {showingFullPalette && (
                        <Link to={moreUrl} onClick={e => e.stopPropagation()}>
                            <span className={classes.seeMore}>MORE</span>
                        </Link>
                    )}
                </div>
            </CopyToClipboard>
        );
    }
}
export default withStyles(styles)(ColorBox);