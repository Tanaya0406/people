
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Pagination, Modal } from 'react-bootstrap';
import { FaArrowDown ,FaSearch ,FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import edit from './edit.png';
import delted from './Icon.png';
import fil from './filter.png';
import StatusBadge from './StatusBadge';
import { BsQuestionCircle } from "react-icons/bs";
import { InputGroup,FormControl } from "react-bootstrap"

const PeopleDirectory = () => {
  const [info, setInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [showModal, setShowModal] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // New state for search query
  const [showEditModal, setShowEditModal] = useState(false); // State for Edit Modal
  const [personToEdit, setPersonToEdit] = useState(null);    // State for Person to Edit
const[newMember,SetnewMember]=useState({name:"",emai:"",role:""})
const [showAddModal, setShowAddModal] = useState(false);


  const getData = async () => {
    try {
      const response = await axios.get('https://66b2f68a7fba54a5b7eaee35.mockapi.io/yes/post');
      setInfo(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Filter the info array based on the search query
  const filteredInfo = info.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredInfo.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredInfo.length / rowsPerPage);

  const handleShowModal = (id) => {
    setMemberToDelete(id);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleDelete = () => {
    setInfo(info.filter(person => person.id !== memberToDelete));
    setShowModal(false);
  };

  const handleRowClick = (person) => {
    setSelectedPerson(person);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle opening the edit modal
  const handleEdit = (person) => {
    setPersonToEdit(person);
    setShowEditModal(true);
  };

  // Handle saving the edited person data
  const handleSaveEdit = () => {
    setInfo(
      info.map((person) =>
        person.id === personToEdit.id ? personToEdit : person
      )
    );
    setShowEditModal(false); // Close the modal after saving
  };

const SaveMember=async()=>{
    try{
        await axios.post('https://66b2f68a7fba54a5b7eaee35.mockapi.io/yes/post',newMember)
       
    getData();
    SetnewMember({name:"",role:"",email:""})
    setShowAddModal(false)
    }
    catch(error){
        console.log(error);
    }
}




  return (
    <div className='border border-1 border-secondary px-2 mt-1' style={{ borderRadius: '10px', height: 'max-content' }}>
      <div className="d-flex flex-row justify-content-between align-items-center pt-2 mx-2 border-bottom pb-2">
        <div className="d-flex flex-row justify-content-between align-items-center text-nowrap">
          <div className="fw-bold me-2">Team Members</div>
          <div className="rounded-pill px-3" style={{ color: '#6941C6', backgroundColor: '#DDD5EE', border: '2px solid #6941C6' }}>
            {filteredInfo.length} Users
          </div>
        </div>

        <div style={{display:'flex',flexDirection:"row",justifyContent:'space-between'}}>
                <InputGroup>
               <FormControl
                placeholder="Search" 
               aria-label="Search"
               value={searchQuery}
              onChange={handleSearchChange}/>

                <InputGroup.Text>
                <FaSearch/>
                </InputGroup.Text>
                </InputGroup>
                <img src={fil}/>
                <button onClick={() => setShowAddModal(true)} style={{color:"white",borderRadius:"10px",border:"2px solid #6941C6 ",height:"30px",width:"15rem",backgroundColor:"#6941C6"}}>+Add Members</button>
                
           </div>
           
      </div>

      <div className="people-table-container mt-4">
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>Name <FaArrowDown /></th>
              <th>Status <FaArrowDown /></th>
              <th>Role <BsQuestionCircle /></th>
              <th>Email</th>
              <th>Teams</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((person) => (
              <tr
                key={person.id}
                style={{ cursor: 'pointer' }}
                onClick={() => handleRowClick(person)}
              >
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={person.photo || 'https://via.placeholder.com/50'}
                      alt={person.name}
                      className="rounded-circle me-2"
                      style={{ width: '36px', height: '36px', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontSize: '0.9rem' }}>{person.name}</div>
                      <div className="text-muted" style={{ fontSize: '0.7rem' }}>@{person.name.split(' ')[0].toLowerCase()}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <StatusBadge />
                </td>
                <td style={{ fontSize: '0.9rem' }}>Designer</td>
                <td style={{ fontSize: '0.9rem' }}>{person.email || 'example@gmail.com'}</td>
                <td>
                  <div className="d-flex flex-wrap align-items-center">
                    <div className="rounded-pill fw-bold d-flex justify-content-center align-items-center mx-1 px-2" style={{ color: '#6941C6', backgroundColor: '#f8f5fe', border: '2px solid #e6d6fa', fontSize: '0.8rem' }}>
                      Design
                    </div>
                    <div className="rounded-pill fw-bold d-flex justify-content-center align-items-center mx-1 px-2" style={{ color: '#175cc7', backgroundColor: '#eff8ff', border: '2px solid #b1ddff', fontSize: '0.8rem' }}>
                      Product
                    </div>
                    <div className="rounded-pill fw-bold d-flex justify-content-center align-items-center mx-1 px-2" style={{ color: '#3537c9', backgroundColor: '#edf3ff', border: '2px solid #c6d7f8', fontSize: '0.8rem' }}>
                      Marketing
                    </div>
                    <div className="rounded-pill fw-bold d-flex justify-content-center align-items-center mx-1 px-2" style={{ color: 'black', backgroundColor: '#f9fafc', border: '2px solid #e6e7eb', fontSize: '0.8rem' }}>
                      +4
                    </div>
                  </div>
                </td>
                <td>
                  <div className='d-flex flex-row justify-content-evenly align-items-center' style={{ height: '2.6rem' }}>
                    <img
                      src={delted}
                      alt="Delete"
                      className="me-2"
                      onClick={(e) => { e.stopPropagation(); handleShowModal(person.id); }}
                      style={{ cursor: 'pointer' }}
                    />
                    <img
                      src={edit}
                      alt="Edit"
                      className="me-2"
                      onClick={(e) => { e.stopPropagation(); handleEdit(person); }} 
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Pagination className="justify-content-center">
        <button
        onClick={() => {
          if (currentPage > 1) paginate(currentPage - 1); 
        }}
        disabled={currentPage === 1} 
        style={{ marginRight: "22rem", height: "2rem", width: "7rem", borderRadius: '10px' }}
      >
        <FaArrowLeft /> Previous
      </button>
          {[...Array(totalPages).keys()].map((pageNumber) => (
            <Pagination.Item
              key={pageNumber + 1}
              active={pageNumber + 1 === currentPage}
              onClick={() => paginate(pageNumber + 1)}
            >
              {pageNumber + 1}
            </Pagination.Item>
          ))}

<button
        onClick={() => {
          if (currentPage < totalPages) paginate(currentPage + 1); 
        }}
        disabled={currentPage === totalPages} 
        style={{ marginLeft: "22rem", height: "2rem", width: "5rem", borderRadius: "10px" }}
      >
        Next <FaArrowRight />
      </button>
        </Pagination>
      </div>

      <Modal show={selectedPerson !== null} onHide={() => setSelectedPerson(null)} centered>
        <Modal.Header style={{ background: '#2A5B7E' }} closeButton>
          {selectedPerson && (
            <div className='d-flex flex-row justify-content-between align-items-start w-100'>
              <img
                src={selectedPerson.photo || 'https://via.placeholder.com/150'}
                alt={selectedPerson.name}
                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '100%' }}
              />
              <section className='text-white px-4 py-2 rounded' style={{ flex: 1 }}>
                <p className='fw-bold mb-1'>{selectedPerson.name}</p>
                <section className='d-flex flex-row justify-content-between'>
                  <div className=' text-white px-2 py-1 rounded' style={{ flex: 0 }}>
                    <div className="text-white" style={{ fontSize: '0.7rem' }}>@{selectedPerson.name.split(' ')[0].toLowerCase()}</div>
                    <p className='mb-0'>User</p>
                  </div>
                  <div style={{ borderLeft: '3px solid black', height: '45px' }}></div>

                  <div className=' text-white px-2 py-0 rounded' style={{ flex: 1 }}>
                    <p className='mb-0'>Product Designer</p>
                    <p className='mb-0'>Role</p>
                  </div>
                </section>
              </section>
            </div>
          )}
        </Modal.Header>
        <Modal.Body>
          {selectedPerson && (
            <div>
              <p><strong>Date of Birth:</strong> {selectedPerson.dob }</p>
              <p><strong>Nationality:</strong> {selectedPerson.nationality }</p>
              <p><strong>Contact:</strong> {selectedPerson.contact }</p>
              <p><strong>Email Address:</strong> {selectedPerson.email }</p>
              <p><strong>Work Email Address:</strong> {selectedPerson.workemail }</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setSelectedPerson(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


      {/* Modal for delete confirmation */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this member?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Edit */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {personToEdit && (
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={personToEdit.name}
                  onChange={(e) => setPersonToEdit({ ...personToEdit, name: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={personToEdit.email}
                  onChange={(e) => setPersonToEdit({ ...personToEdit, email: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="role" className="form-label">Role</label>
                <input
                  type="text"
                  className="form-control"
                  id="role"
                  value={personToEdit.role || ''}
                  onChange={(e) => setPersonToEdit({ ...personToEdit, role: e.target.value })}
                />
              </div>
            </form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" style={{ backgroundColor: '#6941C6' }} onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modal for add member */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
  <Modal.Header className="bg-light" closeButton>
    <Modal.Title className="text-center" style={{ width: '100%' }}>
      ADD NEW MEMBER
    </Modal.Title>
  </Modal.Header>

  <Modal.Body>
    <form style={{ padding: '10px' }}>
      <div className="mb-3">
        <label className="form-label">Name:</label>
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          value={newMember.name}
          onChange={(e) => SetnewMember({ ...newMember, name: e.target.value })}
          style={{ borderRadius: '5px', padding: '10px' }}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email:</label>
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={newMember.email}
          onChange={(e) => SetnewMember({ ...newMember, email: e.target.value })}
          style={{ borderRadius: '5px', padding: '10px' }}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Role:</label>
        <input
          type="text"
          className="form-control"
          placeholder="Role"
          value={newMember.role}
          onChange={(e) => SetnewMember({ ...newMember, role: e.target.value })}
          style={{ borderRadius: '5px', padding: '10px' }}
        />
      </div>
    </form>
  </Modal.Body>

  <Modal.Footer>
    <Button
      variant="secondary"
      onClick={() => setShowAddModal(false)}
      style={{ borderRadius: '8px', padding: '8px 16px' }}
    >
      CANCEL
    </Button>
    <Button
      variant="primary"
      onClick={SaveMember}
      style={{ backgroundColor: '#6941C6', borderRadius: '8px', padding: '8px 16px' }}
    >
      SAVE
    </Button>
  </Modal.Footer>
</Modal>

    </div>
  );
};

export default PeopleDirectory;
