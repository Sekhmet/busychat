import React, { Component } from "react";
import SplitPane from "react-split-pane";
import client from "./client";
import "./App.css";
import RoomList from "./components/RoomList";

class App extends Component {
  state = {
    rooms: [],
    activeRoom: null
  };

  async componentDidMount() {
    const rooms = await client.publicRooms();

    this.setState({
      rooms: rooms.chunk
    });
  }

  handleRoomJoinClick = async id => {
    await client.joinRoom(id);

    this.setState({
      activeRoom: id
    });
  };

  render() {
    const { rooms, activeRoom } = this.state;

    return (
      <SplitPane split="vertical" minSize={50} defaultSize="25%">
        <RoomList
          rooms={rooms}
          activeRoom={activeRoom}
          onRoomClick={this.handleRoomJoinClick}
        />
        <div>{activeRoom}</div>
      </SplitPane>
    );
  }
}

export default App;
