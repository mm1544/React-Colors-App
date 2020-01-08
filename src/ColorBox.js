import React, { Component } from 'react';
import {CopyToClipboard} from "react-copy-to-clipboard";
import './ColorBox.css';

export default class ColorBox extends Component {
    render() {
        const {name, background} = this.props;
        return (
            // 'wrapping' all ColorBox to CopyToClipboard
            // After clicking on ColorBox this.props.background
            // will be copied to clipboard
            <CopyToClipboard text={background}>
                <div className="ColorBox" style={{ background }}>
                    <div className="copy-container">
                        <div className="box-content">
                            <span>{name}</span>
                        </div>
                        <button className="copy-button">Copy</button>
                    </div>
                    <span className="see-more">More</span>
                </div>
            </CopyToClipboard>
        );
    }
}
