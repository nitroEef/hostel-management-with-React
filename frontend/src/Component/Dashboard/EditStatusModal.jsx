import { useState } from "react";
import "./StudentDashboard.css";
import axios from "axios"

const EditStatusModal = ({ room, onUpdateRoom, onClose }) => {
  const [newStatus, setNewStatus] = useState(room.roomStatus);
  const [isSubmitting, setIsSubmitting] = useState("");
  const [error , setError] = useState("")



  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleSubmit = async () => {
   setIsSubmitting(true);
   setError("");

   try {

    const response = await axios.patch(`http://localhost:3500/room/update-room/${room._id}`, {
      roomStatus : newStatus
    })

    console.log("room updated");
    onUpdateRoom(response.data);
    onClose();
    
   } catch (error) {
    setError("FAILED TO UPDATE ROOM STATUS, PLS TRY AGAIN")
    console.log(error);
   }finally{
    setIsSubmitting(false);
   
   }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="modal-title">Edit Room Status</h2>
        <p className="room-number">Room Number: {room.roomNumber}</p>
        <label htmlFor="status" className="status-label">New Status: </label>
        
        <div className="right">
          <input
            type="text"
            id="status"
            className="search"
            value={newStatus}
            onChange={handleStatusChange}
          />
        </div>

        <div className="button-group">
          <button className="save-button" onClick={handleSubmit}>Save</button>
          <button className="cancel-button" onClick={onClose}> Cancel</button>
        </div>

      </div>

    </div>
  );
};

export default EditStatusModal;
