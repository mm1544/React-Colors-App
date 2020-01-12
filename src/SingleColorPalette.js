import React, { Component } from 'react'

export default class SingleColorPalette extends Component {
    render() {
        return (
            <div style={{backgroundColor: this.props.match.params.colorId }}>
                <h1>Single Color Palette</h1>
                <p>color: {this.props.match.params.colorId}</p>
            </div>
        )
    }
}
