import React, { Component } from 'react';
import {CopyToClipboard} from "react-copy-to-clipboard";
import {Link} from 'react-router-dom';
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
        const {name, background, moreUrl} = this.props;
        return (
            // 'wrapping' all ColorBox to CopyToClipboard
            // After clicking on ColorBox this.props.background
            // will be copied to clipboard
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div className="ColorBox" style={{ background }}>
                    {/* we need a new Div for Overlay animation is because  when we will use a scale to "grow" a Div, it will also grow content in that div
                    
                    This separate Div will appear, grow and go away*/}
                    <div className={`copy-overlay ${this.state.copied && "show"}`} style={{ background }}/>
                    {/* text is separated to diferent div because we don't want it to be affected by scaling */}
                    <div className={`copy-msg ${this.state.copied && "show"}`} style={{ background }}>
                        <h1>copied!</h1>
                        <p>{background}</p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span>{name}</span>
                        </div>
                        <button className="copy-button">Copy</button>
                    </div>
                    {/* stopPropagation() --> Prevent further events from 
                    beying propagated (copying to clipboard and animation) */}
                    <Link to={moreUrl} onClick={e => e.stopPropagation()}>
                        <span className="see-more">More</span>
                    </Link>
                </div>
            </CopyToClipboard>
        );
    }
}
