import React from "react";
import Sidebar from "./Sidebar";
import "./StudentDashboard.css";
import { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import {confirmAlert} from "react-confirm-alert"
import { FaBars, FaTimes } from "react-icons/fa";
import { FaPenFancy } from "react-icons/fa";
import useAuthRedirect from "../../../context/useAuth"
import axios from "axios"
import  UpdateCheckIn from "../Model/UpdateCheckIn";
import ChangeStudentRoom from "../../../Modal/ChangeStudentRoom";
import UpdateStudentProfile from "../../../Modal/UpdateStudentProfile";

const studentsData = [
  {
    id: 1,
    name: "Jon Doe",
    email: "Jon_Doe@outlook.com",
    idNumber: "12345",
    gender: "Female",
    age: 23,
    nationality: "American",
  },
  {
    id: 2,
    name: "Mara Lilian",
    email: "bigbunda@gmail.com",
    idNumber: "12345",
    gender: "Female",
    age: 18,
    nationality: "Isrealite",
  },
  {
    id: 3,
    name: "olabode Eef",
    email: "nitroeef@yahoo.com",
    idNumber: "12345",
    gender: "Male",
    age: 26,
    nationality: "Nigerian",
  },
];

const StudentDashboard = () => {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState(studentsData);
  // const [filteredData, setFilteredData] = useState(studentsData);
  const [issideBarToggle, setIsSideBarToggle] = useState(false);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState("")
  const [selectedStudent, setSelectedStudent] = useState(null)


  useEffect(() => {
    const fetchStudents = async () => {
      try{
        const response = await axios.get("http://localhost:3500/student")
        setData(response.data);
      }catch(error){
        console.error("error fetching data :, error")
}}
fetchStudents();
}, [])

const handleModalOpen = (student) => {
    setSelectedStudent(student)
    setIsModalOpen(true)
  }

const handleModalClose = () => {
  setSelectedModal("")
  setIsModalOpen(false)
  setSelectedStudent(null)}


const handleModalSelect = (modalType) => {
  setSelectedModal(modalType)
}

const removeUser = async (_id) => {
  try {
    console.log(`Delete student by id: ${_id}`)
    const response = await axios.delete(`http://localhost:3500/student/delete-student/${id}`)
    console.log(response.data)
    
    setData((prevData) => prevData.filter((student) => student._id !== _id)) 
    setMessage("Student deleted successfully")
  } catch (error) {
    setMessage("Failed to delete student");
    console.error("Error deleting", error)



  }

}

const confirmDelete = (_id) => {
  confirmAlert({
    title:"delete this student",
    message: "Are you sure you want to delete this student?",
    buttons: [{
      label:"delete",
      onClick: () => removeUser("_id"),
    },
    {
      label:"cancel",
      onClick: () => alert("deletion cancelled")
    }
  ]
})}

const filteredData = data.filter((item) =>
  item.nationality.toLowerCase().includes(search.toLowerCase()) ||
  item.email.toLowerCase().includes(search.toLowerCase()) 
)



  //   const handleSearchChange = (e) => {
  //   // Get the search term from the input field and convert it to lowercase
  //   const term = e.target.value.toLowerCase();
  //   setSearchTerm(term);
  //   // Filter the studentsData based on the search term
  //   const filtered = studentsData.filter(
  //     (student) =>
  //       // Check if the student's name or email contains the search term
  //       student.name.toLowerCase().includes(term) ||
  //       student.email.toLowerCase().includes(term)
  //   );
  //   // Set the filtered data to the state
  //   setFilteredData(filtered);
  // };

  // const handleDelete = (studentId) => {
  //   // Filter out the student with the specified studentId from the students array
  //   const updatedStudents = students.filter(
  //     (student) => student.id !== studentId
  //   );
  //   // Update the students array
  //   setStudents(updatedStudents);

  //   // Filter out the student with the specified studentId from the filteredData array
  //   const updatedFilteredData = filteredData.filter(
  //     (student) => student.id !== studentId
  //   );
  //   // Update the filteredData array
  //   setFilteredData(updatedFilteredData);
  // };

  return (
    <div>
      {issideBarToggle && (
         <div className="mobile-side-nav"><Sidebar/></div>
      )}
     

      <div className="--flex --overflow-hidden">
      <div className="desktop-side-nav">

      <Sidebar />
      </div>

      <div className=" --flex-dir-column --overflow-y-auto --flex-1 overflow-x-hidden">
      <main className="--flex-justify-center w-full">
        <div className="right dash-main">
          <div className="--flex-justify-between">
            <p>Students</p>
            {issideBarToggle ? (
              <FaTimes className="sidebar-toggle-iconB" onClick={() => setIsSideBarToggle(false)}/>
            ) : (
              <FaBars className="sidebar-toggle-iconB" onClick={() => setIsSideBarToggle(true)}/>
            )}
          </div>

          <p>Search students</p>

          <input
            placeholder="Search by name, email, or ID number"
            type="text"
            className="search"
            value={searchTerm}
            onChange={handleSearchChange}
          />

          <div className="table">
            <table className="table_wrapper">
              <thead className="table__head">
                <tr className="table__row">
                  <th className="same_class">Student Name</th>
                  <th className="same_class">Email</th>
                  <th className="same_class">ID Number</th>
                  <th className="same_class">Gender</th>
                  <th className="same_class">Age</th>
                  <th className="same_class">Nationality</th>
                  <th className="same_class">Actions</th>
                </tr>
              </thead>

              <tbody className="table__body">
                {filteredData.map((student, index) => (
                  <tr key={index} className="table__row">
                    <td className="same_class">{student.name}</td>
                    <td className="same_class">{student.email}</td>
                    <td className="same_class">{student.idNumber}</td>
                    <td className="same_class">{student.gender}</td>
                    <td className="same_class">{student.age}</td>
                    <td className="same_class">{student.nationality}</td>
                    <td className="same_class">
                      <RiDeleteBin6Line
                        size={25}
                        color="red"
                        onClick={() => confirmDelete(student._id)}
                      />
                      &nbsp;&nbsp;
                     <FaPenFancy size={25} color="black" onClick={() => handleModalOpen(student)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="btn-secondary">
            <Link to="/student-reg"> Add a student</Link>
          </button>
        </div>
      </main>
    </div>
    </div>

    {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Select an option</h2>
            <button onClick={() =>  handleModalSelect("updateStudentProfile")} className="one">
          Update student profile
            </button>
            <button onClick={() => {
              handleModalSelect("changeStudentRoom")
              className="two"
            }}>
              Change student room
            </button>
            <button onClick={() => {handleModalSelect("UpdatedCheckInStatus") 
              className="three"
            }
            }>
              updated check-in
            </button>
            <button onClick={handleModalSelect}
            >
             Close
            </button>
          </div>
          
        </div>
      )}

{
  selectedModal === "updateStudentProfile" && (
    <UpdateStudentProfile student={selectedStudent} onClose={handleModalClose} />
  )
}

{
  selectedModal === "changeStudentRoom" && (
    <ChangeStudentRoom student={selectedStudent} onClose={handleModalClose} />
  )
}

{
  selectedModal === "updateCheckIn" && (
    <UpdateCheckIn student={selectedStudent} onClose={handleModalClose} />
  )
}


      
    
    </div>
    

  );
};

export default StudentDashboard;
