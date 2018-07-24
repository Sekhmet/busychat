import React, { Component } from "react";
import SplitPane from "react-split-pane";
import classNames from "classnames";
import client from "./client";
import "./App.css";

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
        <div>
          {rooms.map(room => (
            <a
              key={room.room_id}
              onClick={() => this.handleRoomJoinClick(room.room_id)}
              className={classNames("room", {
                "room--active": activeRoom === room.room_id
              })}
            >
              {room.canonical_alias}
            </a>
          ))}
        </div>
        <div>{activeRoom}</div>
      </SplitPane>
    );
  }
}

export default App;
