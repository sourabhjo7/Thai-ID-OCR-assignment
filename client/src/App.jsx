import React, { useState, useEffect } from 'react';
import Fileupload from './components/Fileupload/Fileupload';
import JSONDisplay from './components/JSONDisplay/JSONDisplay';
import Modal from 'react-modal';
import './App.css';
import { createThaiIDCard, deleteThaiIDCardById, editThaiIDCardById, getAllThaiIDCards } from './ApiCalls';

function App() {
  const [ocrRecords, setOCRRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [listloading, setlistloading] = useState(true);
  const [ocrtext, setocrtext] = useState("");
  const [jsonData, setJsonData] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to control edit modal
  const [editRecord, setEditRecord] = useState({}); // State to hold the record being edited

  // Function to open edit modal and set the record being edited
    const openEditModal = (record) => {
      setIsEditModalOpen(true);
      console.log("unit test");
      setEditRecord(record);
    };
  
    // Function to close edit modal
    const closeEditModal = () => {
      setIsEditModalOpen(false);
      setEditRecord({});
    };
  const fetchOCRRecords = async() => {
    try {
      console.log("===");
      const data = await getAllThaiIDCards();
      setlistloading(false);
      if (data?.success) {
        console.log("got all->",data);
        setOCRRecords(data.thaiIDCards);
        setFilteredRecords(data.thaiIDCards);
      } else {

        alert(data.error);
      }
    } catch (error) {
      console.error('API call error:', error);
      setlistloading(true);
      alert('Error fetching data. Please try again later.');
    }
  };
  
  useEffect(() => {
    const fetchDataAsync = async () => {
      if (ocrtext) {
        try {
          setIsLoading(true);
          const data = await createThaiIDCard({ text: ocrtext });
          setIsLoading(false);
          if (data.success) {
            setJsonData(data.newThaiIDCard);
            await fetchOCRRecords();
          } else {
            setJsonData({});
            alert(data.error);
          }
        } catch (error) {
          console.error('API call error:', error);
          setIsLoading(false);
          alert('Error fetching data. Please try again later.');
        }
      }
    };

    fetchDataAsync();
  }, [ocrtext]);
  async function handleDelete(id){
    try{
      const res=await deleteThaiIDCardById(id);
      if(res.success){
        alert(res.message);
      await fetchOCRRecords(); 
      }
      else{
        alert(res.error);
      }
    }catch(e){
      alert("error in deletion try again ");
      window.location="/"
    }
    

  }
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make sure editRecord has the required data
      const { _id, ...updatedData } = editRecord;
      
      const response = await editThaiIDCardById(_id, updatedData);
      console.log("Edited record:", response);
      fetchOCRRecords();
      // Optionally, close the modal after successful submission
      closeEditModal();
    } catch (error) {
      console.error('Error editing record:', error);
      // Handle error condition (display error message, etc.)
    }
  };
  
  // Function to filter records based on status
  const filterRecords = (status) => {
    if (status === 'all') {
      setFilteredRecords(ocrRecords);
    } else {
      const filtered = ocrRecords.filter((record) => record.status === status);
      setFilteredRecords(filtered);
    }
  };
  

  useEffect(() => {
    
    fetchOCRRecords();
  }, []);

  function View(record){
    setJsonData(record);
    console.log(record);
  }
  return (
    <div className="App">
      <h1 className="AppHeading">OCR Management System</h1>
      <div className="Sections">
        <div className="UploadSection">
          <h2>Upload New File</h2>
          <Fileupload setocrtext={setocrtext} />
          <div className="JSONOutput">
            <h2>JSON Output of Latest Upload or Viewed Entry</h2>
            <div className="RecordsJSON">
              <JSONDisplay jsonData={isLoading ? 'Loading....' : jsonData} />
            </div>
          </div>
        </div>
        <div className="HistorySection">
          <h2>OCR History</h2>
          <div className="FilterSection">
            <button onClick={() => filterRecords('all')}>All</button>
            <button onClick={() => filterRecords('success')}>Success</button>
            <button onClick={() => filterRecords('failed')}>Failed</button>
          </div>
          <div className="RecordsTable">
            {listloading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Last Name</th>
                <th>ID Number</th>
                <th>Date of Issue</th>
                <th>Date of Expiry</th>
                <th>Date of Birth</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords?.map((record) => (
                <tr key={record.identificationNumber}>
                  <td>{record.firstName}</td>
                  <td>{record.lastName}</td>
                  <td>{record.identificationNumber}</td>
                  <td>{record.dateOfIssue}</td>
                  <td>{record.dateOfExpiry}</td>
                  <td>{record.dateOfBirth}</td>
                  <td>{record.status}</td>
                  <td>
                    <button onClick={() => openEditModal(record)}>Edit</button>
                  </td>
                  <td>
                    <button onClick={() => View(record)}>View</button>
                  </td>
                  <td>
                    <button onClick={async() => await handleDelete(record._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
            </div>
            </div>
          </div>
                 {/* Edit Modal */}
       <Modal
       isOpen={isEditModalOpen}
       onRequestClose={closeEditModal}
       className="edit-modal"
       overlayClassName="overlay"
     >
       <h2>Edit Record</h2>
       <form  onSubmit={handleEditSubmit} >
         <label htmlFor="firstName">First Name</label>
         <input
           type="text"
           id="firstName"
           value={editRecord.firstName}
           onChange={(e) => setEditRecord({ ...editRecord, firstName: e.target.value })}
         />
         {/* Add similar input fields for other attributes */}
         <label htmlFor="lastName">Last Name</label>
         <input
           type="text"
           id="lastName"
           value={editRecord.lastName}
           onChange={(e) => setEditRecord({ ...editRecord, lastName: e.target.value })}
         />
         <label htmlFor="dateOfIssue">Date of Issue</label>
         <input
           type="text"
           id="dateOfIssue"
           value={editRecord.dateOfIssue}
           onChange={(e) => setEditRecord({ ...editRecord, dateOfIssue: e.target.value })}
         />
         <label htmlFor="dateOfBirth">Date of Birth</label>
         <input
           type="text"
           id="dateOfBirth"
           value={editRecord.dateOfIssue}
           onChange={(e) => setEditRecord({ ...editRecord, dateOfBirth: e.target.value })}
         />
         {/* Add other fields from your backend schema */}
         {/* Disable ID Number field */}
         <label htmlFor="identificationNumber">ID Number</label>
         <input
           type="text"
           id="identificationNumber"
           value={editRecord.identificationNumber}
           disabled
         />
         {/* Save changes button */}
         <button type="submit">Save Changes</button>
         <button onClick={closeEditModal}>Cancel</button>
       </form>
     </Modal>
        </div>
  );
}

export default App;


/*

/*

        
        */