import React, { Component } from 'react';
import {CopyToClipboard} from "react-copy-to-clipboard";
import {Link} from 'react-router-dom';
import chroma from 'chroma-js';
import styles from './styles/ColorBoxStyles';
import {withStyles} from '@material-ui/styles';


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