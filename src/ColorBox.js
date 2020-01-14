import React, { Component } from 'react';
import {CopyToClipboard} from "react-copy-to-clipboard";
import {Link} from 'react-router-dom';
import chroma from 'chroma-js';
import './ColorBox.css';

export default class ColorBox extends Component {
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
        const {name, background, moreUrl, showLink} = this.props;
        const isDarkColor = chroma(background).luminance() <= 0.08;
        const isLightColor = chroma(background).luminance() >= 0.7;
        return (
            // 'wrapping' all ColorBox to CopyToClipboard
            // After clicking on ColorBox this.props.background
            // will be copied to clipboard
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div className="ColorBox" style={{ background }}>
                    {/* we need a new Div for Overlay animation is because  when we will use
                     a scale (in animation) to "grow" a Div, it will also grow content this that div
                    
                    This separate Div will appear, grow and go away*/}
                    <div className={`copy-overlay ${this.state.copied && "show"}`} style={{ background }}/>
                    {/* text is separated to diferent div because we don't want it to be affected by scaling */}
                    <div className={`copy-msg ${this.state.copied && "show"}`} style={{ background }}>
                        <h1>copied!</h1>
                        <p className={isLightColor && "dark-text"}>{background}</p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            {/* conditionaly adding class "light-text" */}
                            <span className={isDarkColor && ("light-text")}>{name}</span>
                        </div>
                        <button className={`copy-button ${isLightColor && "dark-text"}`}>Copy</button>
                    </div>
                    {/* stopPropagation() --> Prevents further events from 
                    being propagated (copying to clipboard and animation) */}
                    {showLink && (
                        <Link to={moreUrl} onClick={e => e.stopPropagation()}>
                            <span className={`see-more ${isLightColor && "dark-text"}`}>MORE</span>
                        </Link>
                    )}
                </div>
            </CopyToClipboard>
        );
    }
}
