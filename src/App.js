import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CanvasDraw from "react-canvas-draw";
import { connectToSocket } from './socket-client.js';

class App extends Component {
    state = {
        color: "#ffc600",
        width: 400,
        height: 400,
        brushRadius: 10,
        lazyRadius: 12
      };

    constructor(props, context) {
        super(props, context);
        connectToSocket();
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <CanvasDraw  canvasHeight={this.state.height}  hideInterface hideGrid />
                </header>
            </div>
        );
    }
}


export default App;
