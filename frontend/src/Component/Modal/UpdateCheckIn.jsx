import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateCheckIn = ({ student, onClose }) => {
  const [action, setAction] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [currentRoomNumber, setCurrentRoomNumber] = useState("");

  useEffect(() => {
    const fetchRoomDetails = async () => {
      if (student.room) {
        try {
          const response = await axios.get(
            `https://hostel-management-with-react.vercel.app/room/get-single-room/${student.room}`
          );

          setCurrentRoomNumber(response.data.roomNumber);
        } catch (error) {}
      }
    };
    fetchRoomDetails();
  }, [student.room]);

  const handleActionChange = (e) => {
    setAction(e.target.value);
  };

  const handleRoomChange = (e) => {
    setRoomNumber(e.target.value);
  };

  const handleSubmit = async () => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://hostel-management-with-react.vercel.app/student/check-in-status`,
        {
          action,
          roomNumber,
          studentId: student._id,
        }
      );
      onClose();
    } catch (error) {
      console.error("error updating status");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Update Check-In Status</h2>
        <p>Current Status:{student.checkedIn ? "Checked In" : "Checked out"}</p>
        <p>Current Room : {currentRoomNumber || "not Assigned"}</p>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="action">Room Number:</label>
            <input
              type="text"
              value={roomNumber}
              onChange={handleRoomChange}
              placeholder="enter your room"
            />
          </div>

          <div>
            <label htmlFor="">Action</label>
            <select value={action} onChange={handleActionChange}>
              <option value="&nbsp;"> Select an option</option>
              <option value="checkIn" disabled={student.checkedIn}>Check In</option>
              <option value="checkOut" disabled={!student.checkedIn}>Check Out</option>

            </select>
          </div>

          <button>Update Status</button>
          <button onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCheckIn;
