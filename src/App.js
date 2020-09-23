import React, { Component } from 'react';
import io from 'socket.io-client';
import { reconnectionConfig, SOCKET_EVENT } from './socketConfig';
import './App.css';
import CanvasDraw from "react-canvas-draw";
import { connectToSocket, emitMouseCoordinates, subscribeToReceiveCoordinates } from './socket-client.js';

class App extends Component {
    state = {
        color: "#ffc600",
        width: 400,
        height: 400,
        brushRadius: 10,
        lazyRadius: 12,
        receivedMouseCoordinates: ""
    };

    constructor(props, context) {
        super(props, context);
        this.canvas = React.createRef();
    }

    componentDidMount() {
        console.log(`Connecting to SOCKET_URL --> ${process.env.REACT_APP_SOCKET_URL}`);
        const socket = io(process.env.REACT_APP_SOCKET_URL, reconnectionConfig);
        socket.on('connect', () => {
            console.log(`Socket connected - OK`);
        });

        socket.on(SOCKET_EVENT.RECEIVE_COORDINATES, data => {
            console.log(`Socket Mouse Coordinates Received Data --> ${data}`);
            debugger;
            this.setState({
                ...this.state,
                receivedMouseCoordinates: data
            });
        });
    }

    render() {
        const { receivedMouseCoordinates } = this.state;
        if (this.canvas.current) {
            this.canvas.current.loadSaveData(receivedMouseCoordinates);
        }
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
