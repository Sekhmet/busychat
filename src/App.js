import React, { Component } from "react";
import SplitPane from "react-split-pane";
import client from "./client";
import RoomList from "./components/RoomList";
import Chat from "./components/Chat";
import "./App.css";

function addMessage(state, event) {
  const roomId = event.getRoomId();

  const currentMessages = state.messages[roomId] || [];

  return {
    ...state,
    messages: {
      ...state.messages,
      [roomId]: [
        ...currentMessages,
        {
          id: event.event.event_id,
          timestamp: event.event.origin_server_ts,
          sender: event.getSender(),
          body: event.getContent().body
        }
      ]
    }
  };
}

class App extends Component {
  state = {
    rooms: [],
    activeRoom: null,
    messages: {}
  };

  async componentDidMount() {
    client.on("Room.timeline", (event, room, toStartOfTimeline) => {
      if (toStartOfTimeline || event.getType() !== "m.room.message") return;

      this.setState(prevState => addMessage(prevState, event));
    });

    client.startClient();

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

  handleMessageSend = event => {
    const { activeRoom } = this.state;

    event.preventDefault();

    if (!activeRoom) return;

    client.sendMessage(activeRoom, {
      msgtype: "m.text",
      body: event.target.firstChild.value
    });

    event.target.firstChild.value = "";
  };

  render() {
    const { rooms, activeRoom, messages } = this.state;

    return (
      <SplitPane split="vertical" minSize={50} defaultSize="25%">
        <RoomList
          rooms={rooms}
          activeRoom={activeRoom}
          onRoomClick={this.handleRoomJoinClick}
        />
        <div className="right">
          <div>
            <Chat room={activeRoom} messages={messages} />
          </div>
          <form onSubmit={this.handleMessageSend}>
            <input id="message" name="message" type="text" />
          </form>
        </div>
      </SplitPane>
    );
  }
}

export default App;
