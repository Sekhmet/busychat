import React from "react";
import PropTypes from "prop-types";
import className from "classnames";

const isOwn = message => message.sender === "@sekhmet:localhost";

const Message = ({ message }) => (
  <div
    className={className("bubble", {
      "bubble--own": isOwn(message)
    })}
  >
    {message.sender}: {message.body}
  </div>
);

export default class Chat extends React.Component {
  static propTypes = {
    room: PropTypes.string,
    messages: PropTypes.shape()
  };

  render() {
    const { room, messages } = this.props;

    if (!room) return "Select a chat on the right";

    const currMessages = messages[room] || [];

    return (
      <div className="chat">
        {currMessages.length === 0 && "No messages yet"}
        {currMessages.map(msg => <Message key={msg.id} message={msg} />)}
      </div>
    );
  }
}
