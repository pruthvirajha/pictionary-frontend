import React, { Component } from 'react';
import './App.css';
import CanvasDraw from "react-canvas-draw";
import { connectToSocket, emitMouseCoordinates, subscribeToReceiveCoordinates } from './socket-client.js';

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

    componentDidMount() {
        subscribeToReceiveCoordinates('receive_coordinates', this.receivedCoordinatesHandler);
    }

    receivedCoordinatesHandler(data) {
        console.log(`Data received from server: ${data}`);
        console.log(`${this.receivedCoordinatesHandler.name} Called...`);
        this.canvas.loadSaveData(data);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <CanvasDraw canvasHeight={this.state.height}
                        ref={(ref) => this.canvas = ref}
                        onChange={
                            (canvasDrawRef) => {
                                console.log("OnChange called... ");
                                let canvasData = canvasDrawRef.getSaveData();
                                emitMouseCoordinates(canvasData);
                                console.log(`Canvas data --> ${canvasData}`);
                            }
                        }
                        hideInterface hideGrid />
                </header>
            </div>
        );
    }
}


export default App;
