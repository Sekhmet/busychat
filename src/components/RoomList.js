import React from "react";
import PropTypes from "prop-types";
import Room, { RoomType } from "./Room";

const isActive = (room, activeRoom) => activeRoom === room.room_id;

const RoomList = ({ rooms, activeRoom, onRoomClick }) => (
  <div>
    {rooms.map(room => (
      <Room
        key={room.room_id}
        room={room}
        isActive={isActive(room, activeRoom)}
        onClick={onRoomClick}
      />
    ))}
  </div>
);

RoomList.propTypes = {
  rooms: PropTypes.arrayOf(RoomType).isRequired,
  activeRoom: PropTypes.string,
  onRoomClick: PropTypes.func.isRequired
};

export default RoomList;
