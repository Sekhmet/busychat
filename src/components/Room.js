import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export const RoomType = PropTypes.shape({
  room_id: PropTypes.string.isRequired,
  canonical_alias: PropTypes.string.isRequired
});

export default class Room extends React.Component {
  static propTypes = {
    room: RoomType.isRequired,
    onClick: PropTypes.func.isRequired
  };

  handleClick = () => {
    const { room } = this.props;

    this.props.onClick(room.room_id);
  };

  render() {
    const { room, isActive } = this.props;

    return (
      <a
        onClick={this.handleClick}
        className={classNames("room", {
          "room--active": isActive
        })}
      >
        {room.canonical_alias}
      </a>
    );
  }
}
