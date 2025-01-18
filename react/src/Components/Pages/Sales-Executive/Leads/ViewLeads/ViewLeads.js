

import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "./../../../../Layout/Table/TableLayout";
import { FaEdit, FaTrash, FaEye, FaUserPlus, FaComment } from "react-icons/fa";
import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import Navbar from "../../../../Shared/Sales-ExecutiveNavbar/Navbar";
import EditLead from "./EditLead"; // Import the EditLead modal
import LeadView from "./LeadView";
import "./ViewLeads.css";
import CreateCustomerOpportunity from "./CreateandOpportunity"; // Adjust the import path as necessary
import AddLeads from './../AddLeads/Addleads';
import axios from 'axios';
import Swal from 'sweetalert2';
import baseURL from "../../../../Apiservices/Api";


const ViewLeads = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [statusChangeCount, setStatusChangeCount] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  const [showCreateCustomerModal, setShowCreateCustomerModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [existingNumbers, setExistingNumbers] = useState(new Set());
  const [data, setData] = useState([]);
  const [showaddleadModal, setShowaddleadModal] = useState(false);

  useEffect(() => {
    // Populate existing numbers when data is fetched
    const numbers = new Set(data.map((leadid) => leadid.phone_number));
    setExistingNumbers(numbers);
  }, [data]);




  const handleEdit = (lead) => {
    setSelectedLead(lead);
    setShowEditModal(true);
  };


  const handleView = (lead) => {
    setSelectedLead(lead);
    setShowViewModal(true);
  };

  const handleAddUser = (lead) => {
    // Navigate to CreateCustomerOpportunity and pass leadid
    navigate(`/create-customer-opportunity/${lead.leadid}`); // Adjust the path as necessary
  };

  const handleSaveEdit = (updatedLead) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.leadid === updatedLead.leadid ? updatedLead : item
      )
    );
    setShowEditModal(false);
  };

  const handleAddLead = () => {
    // Navigate to the Add Leads page
    navigate('/add-lead'); // Adjust the path as necessary
  };
  const handleDelete = async (leadid) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this action!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Make the DELETE request to the API
          const response = await fetch(`${baseURL}/api/deleteByLeadId/${leadid}`, {
            method: 'DELETE',
          });
  
          if (response.ok) {
            // Filter the deleted lead from the data
            setData((prevData) => prevData.filter((item) => item.leadid !== leadid));
  
            Swal.fire(
              'Deleted!',
              'The lead has been deleted successfully.',
              'success'
            );
          } else {
            console.error("Error deleting record");
            Swal.fire(
              'Failed!',
              'Failed to delete the lead. Please try again later.',
              'error'
            );
          }
        } catch (error) {
          console.error("Error:", error);
          Swal.fire(
            'Error!',
            'An unexpected error occurred while deleting the lead.',
            'error'
          );
        }
      } else {
        Swal.fire(
          'Cancelled',
          'Delete action was canceled.',
          'info'
        );
      }
    });
  };
  



  const [dropdownOptions, setDropdownOptions] = useState({
    primary: ["New", "No Response", "Duplicate", "False Lead", "Lost"],
    secondary: {
      New: ["Yet to Contact", "Not picking up call ", "Asked to call alter"],
      "No Response": ["No Response"],
      Duplicate: ["Duplicate"],
      "False Lead": ["False Lead"],
      Lost: ["Plan Cancelled", "Plan Delayed", "Already Booked", "Others"],
    },
  });


  // Fetch comments when the modal opens
  useEffect(() => {
    if (selectedLead?.leadid) {
      axios
        .get(`${baseURL}/comments/${selectedLead.leadid}`) // Corrected template literal
        .then((response) => {
          // Sort the comments by timestamp in descending order in case backend order fails
          const sortedComments = response.data.sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
          );
          setComments(sortedComments);
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
        });
    }
  }, [selectedLead]);


  // Handle adding a new comment
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const comment = {
      leadid: selectedLead.leadid,
      timestamp: new Date().toISOString(), // Current timestamp
      text: newComment.trim(),
    };

    try {
      const response = await fetch(`${baseURL}/comments/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment),
      });

      if (response.ok) {
        const addedComment = await response.json();
        setComments((prevComments) => [...prevComments, addedComment]); // Update local state
        setNewComment(""); // Clear the input field
      } else {
        console.error("Failed to add comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };


  const handlePrimaryStatusChange = (value, rowId) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.leadid === rowId
          ? {
            ...row,
            primaryStatus: value,
            secondaryStatus: "", // Reset secondary status on primary change
          }
          : row
      )
    );
    // Update status in the backend
    const lead = data.find((lead) => lead.leadid === rowId);
    updateLeadStatus(rowId, value, lead?.secondaryStatus || "");
    setStatusChangeCount((prev) => prev + 1); // Increment count for primary status change
  };

  const handleSecondaryStatusChange = (value, rowId) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.leadid === rowId ? { ...row, secondaryStatus: value } : row
      )
    );
    // Update status in the backend
    const lead = data.find((lead) => lead.leadid === rowId);
    updateLeadStatus(rowId, lead?.primaryStatus || "", value);
    setStatusChangeCount((prev) => prev + 1); // Increment count for secondary status change
  };

  // Track changes per lead

  const updateLeadStatus = async (leadId, primaryStatus, secondaryStatus) => {
    try {
      // Send the status update to the backend API
      const response = await axios.put(
        `${baseURL}/api/leads/status/${leadId}`,
        {
          primaryStatus,
          secondaryStatus,
        }
      );
  
      if (response.status === 200) {
        // Update the lead status in the local state after a successful update
        setData((prevData) =>
          prevData.map((lead) =>
            lead.leadid === leadId
              ? { ...lead, primaryStatus, secondaryStatus }
              : lead
          )
        );
  
        // Track the number of status changes for the current lead
        setStatusChangeCount((prevCount) => ({
          ...prevCount,
          [leadId]: (prevCount[leadId] || 0) + 1,
        }));
  
        // Show SweetAlert only after the second status change
        if ((statusChangeCount[leadId] || 0) + 1 === 2) {
          Swal.fire({
            title: 'Success!',
            text: 'Lead status updated successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
          });
  
          // Reset the count for this lead after showing the alert
          setStatusChangeCount((prevCount) => ({
            ...prevCount,
            [leadId]: 0,
          }));
        }
      } else {
        console.error('Failed to update lead status:', response.statusText);
        // Show SweetAlert error notification
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update lead status. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error updating lead status:', error);
      // Show SweetAlert error notification
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while updating the lead status. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };



  const fetchLeads = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/allleads`);
      if (response.status === 200) {
        // Filter the data to only include leads with 'Opportunity' status
        const filteredLeads = response.data.filter(lead => lead.status === 'lead');
        setData(filteredLeads); // Update state with filtered leads
      } else {
        console.error('Error fetching leads:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
      alert('Failed to fetch leads.');
    }
  };
  useEffect(() => {
    fetchLeads();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "S.No",
        accessor: (row, index) => index + 1,  // This will generate the serial number based on the row index
      },
      {
        Header: "Lead Type",
        accessor: "lead_type",
      },
      {
        Header: "Lead Name",
        accessor: "name",
      },
      {
        Header: "Mobile No",
        accessor: "phone_number",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Lead Status",
        Cell: ({ row }) => (
          <div className="d-flex align-items-center">
            {/* Primary Dropdown */}
            <select
              value={row.original.primaryStatus}
              onChange={(e) =>
                handlePrimaryStatusChange(e.target.value, row.original.leadid)
              }
              className="form-select me-2"
            >
              <option value="">Select Primary Status</option>
              {dropdownOptions.primary.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            {/* Secondary Dropdown */}
            <select
              value={row.original.secondaryStatus}
              onChange={(e) =>
                handleSecondaryStatusChange(e.target.value, row.original.leadid)
              }
              className="form-select"
              disabled={!row.original.primaryStatus} // Disable until a primary status is selected
            >
              <option value="">Select Secondary Status</option>
              {(
                dropdownOptions.secondary[row.original.primaryStatus] || []
              ).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ),
      },

      {
        Header: "Source",
        accessor: "sources",
      },
      {
        Header: "Customer Status",
        accessor: "customerstatus",
        Cell: ({ row }) => {
          // Logic to check if the number is new or existing
          const isExisting = data.some(
            (item) =>
              item.phone_number === row.original.phone_number &&
              item.leadid !== row.original.leadid // Ignore the current entry
          );
          return <span>{isExisting ? "Existing Customer" : "New Customer"}</span>;
        },
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div>
            <button
              className="btn btn-warning edit-button me-1 mb-1"
              onClick={() => handleEdit(row.original)}
            >
              <FaEdit />
            </button>
            <button
              className="btn btn-danger delete-button me-1 mb-1"
              onClick={() => handleDelete(row.original.leadid)}
            >
              <FaTrash />
            </button>
            <button
              className="btn btn-info view-button me-1"
              onClick={() => handleView(row.original)}
            >
              <FaEye />
            </button>
            <button
              className="btn btn-success add-user-button me-1"
              onClick={() => handleAddUser(row.original)}
            >
              <FaUserPlus />
            </button>
          </div>
        ),
      },
      {
        Header: 'Comments',
        accessor: 'comments',
        Cell: ({ row }) => (
          <button
            className="btn btn-info"
            onClick={() => {
              navigate(`/comments/${row.original.leadid}`);
            }}
          >
            <FaComment />
          </button>
        ),
      }
      ,
    ],
    [data]
    [dropdownOptions]
  );

  return (
    <div className="salesViewLeadsContainer">
      <Navbar onToggleSidebar={setCollapsed} />
      <div className={`salesViewLeads ${collapsed ? "collapsed" : ""}`}>
        <div className="ViewLead-container mb-5">
          <div className="ViewLead-table-container">
            <Row className="mb-3">
              <Col className="d-flex justify-content-between align-items-center">
                <h3>Lead Details</h3>
                <Button onClick={handleAddLead}>Add Leads</Button>
              </Col>
            </Row>
            <DataTable columns={columns} data={data} />
          </div>
          {/* comment modal */}
          <Modal show={showCommentsModal} onHide={() => setShowCommentsModal(false)} size="lg">
            <Modal.Header closeButton className="comment-modal-header">
              <Modal.Title>
                <div className="d-flex justify-content-between align-items-center w-100">
                  <span>Comments</span>

                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Input Field for New Comment */}
              <Form.Group className="mb-3 opp-modal-footer">
                <Form.Label>Add a New Comment</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Write your comment here..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  autoFocus
                />
                <Button
                  className="mt-2 opp-comment-btn-primary"
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                >
                  Add Comment
                </Button>
              </Form.Group>

              {/* Display Existing Comments */}
              <div style={{ maxHeight: "300px", overflowY: "auto", border: "1px solid #ddd", padding: "10px" }}>
                {[...comments]
                  .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Sort latest comments on top
                  .map((comment, index) => (
                    <div key={index} className="mb-3 d-flex justify-content-between align-items-center">
                      <div>
                        <p className="text-muted mb-1">{new Date(comment.timestamp).toLocaleString()}</p>
                        <p>{comment.text}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </Modal.Body>
            <Modal.Footer className="opp-modal-footer">
              <Button
                className="opp-comment-btn-secondary"
                onClick={() => setShowCommentsModal(false)}
              >
                Close
              </Button>
              {/* <Button className="opp-comment-btn-primary">
                    Update
                </Button> */}
            </Modal.Footer>
          </Modal>



          {selectedLead && (
            <>
              <EditLead
                show={showEditModal}
                handleClose={() => setShowEditModal(false)}
                lead={selectedLead}
                handleSave={handleSaveEdit}
              />
              <LeadView
                show={showViewModal}
                handleClose={() => setShowViewModal(false)}
                lead={selectedLead}
              />
              {/* <CreateCustomerOpportunity
                show={showCreateCustomerModal}
                handleClose={() => setShowCreateCustomerModal(false)}
                lead={selectedLead.leadid}
                
              />
               <AddLeads
                show={showaddleadModal}
                handleClose={() => setShowaddleadModal(false)}
                lead={selectedLead}
              /> */}
            </>
          )}





        </div>

      </div>
    </div>
  );
};

export default ViewLeads;
