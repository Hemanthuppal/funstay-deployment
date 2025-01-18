import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../Shared/Sales-ExecutiveNavbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { FaEdit, FaEye, FaComment, FaTrash } from "react-icons/fa";
import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import DataTable from "../../../Layout/Table/TableLayout"; // Import the reusable DataTable component
import Swal from 'sweetalert2';
import baseURL from "../../../Apiservices/Api";

import './PotentialLeads.css';
import EditOppLead from "./EditOppLead";
import LeadOppView from "./LeadOppView";
import axios from 'axios';

const Potentialleads = () => {

  const [collapsed, setCollapsed] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // Fetch leads from the API
  const fetchLeads = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/allleads`);
      if (response.status === 200) {
        // Filter the data to only include leads with 'Opportunity' status
        const filteredLeads = response.data.filter(lead => lead.status === 'opportunity');
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

  const [loading, setLoading] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [isPrimaryChanged, setIsPrimaryChanged] = useState(false);
  const [isSecondaryChanged, setIsSecondaryChanged] = useState(false);

  // Fetch comments for the selected lead
  useEffect(() => {
    if (selectedLead?.leadid) {
      axios
        .get(`${baseURL}/comments/${selectedLead.leadid}`) // Corrected template literal
        .then((response) => {
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


  const handleEdit = (lead) => {
    setSelectedLead(lead);
    setShowEditModal(true);
  };

  const handleView = (lead) => {
    setSelectedLead(lead);
    setShowViewModal(true);
  };

  const handleSaveEdit = (updatedLead) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.leadid === updatedLead.leadid ? updatedLead : item
      )
    );
    setShowEditModal(false);
  };



  const [dropdownOptions] = useState({
    primary: ["In Progress", "Confirmed", "Lost", "Duplicate", "Cancelled"],
    secondary: {
      "In Progress": [
        "Understood Requirement",
        "Sent first quote",
        "Sent amended quote",
        "Negotiation Process",
        "Verbally Confirmed-Awaiting token amount",
      ],
      Confirmed: ["Upcoming Trip", "Ongoing Trip", "Trip Completed"],
      Lost: [
        "Plan Cancelled",
        "Plan Postponed",
        "High Quote",
        "Low Budget",
        "No response",
        "Options not available",
        "just checking price",
        "Booked from other source",
        "Delay in quote",
        "Concern about reliability/trust",
        "Did not like payment terms",
        "Did not like cancellation policy",
        "Booked different option from us",
      ],
      Duplicate: ["Duplicate"],
      Cancelled: ["Force Majeure", "Medical Urgency", "Personal Reason"],
    },
  });

  const handlePrimaryStatusChange = (value, rowId) => {
    setData((prevData) => {
      const updatedData = prevData.map((row) =>
        row.leadid === rowId
          ? {
            ...row,
            opportunity_status1: value,
            opportunity_status2: "", // Clear secondary status when primary changes
          }
          : row
      );
      // Send both statuses to the server
      handleUpdateStatus(rowId, value, ""); // Send empty secondary because it's cleared
      setIsPrimaryChanged(true); // Mark primary status as changed
      return updatedData;
    });
  };

  const handleSecondaryStatusChange = (value, rowId) => {
    setData((prevData) => {
      const updatedData = prevData.map((row) =>
        row.leadid === rowId ? { ...row, opportunity_status2: value } : row
      );
      const primaryStatus = updatedData.find((row) => row.leadid === rowId).opportunity_status1;
      // Send updated primary and secondary to the server
      handleUpdateStatus(rowId, primaryStatus, value);
      setIsSecondaryChanged(true); // Mark secondary status as changed
      return updatedData;
    });
  };


  const handleUpdateStatus = async (leadId, primaryStatus, secondaryStatus) => {
    const body = {
      opportunity_status1: primaryStatus,
      opportunity_status2: secondaryStatus,
    };
  
    try {
      const response = await axios.put(`${baseURL}/api/update-status/${leadId}`, body);
      
      if (response.status === 200) {
        // Track status changes
        let statusChangeMessage = '';
  
        if (primaryStatus && secondaryStatus) {
          statusChangeMessage = 'Both statuses updated successfully!';
        } else if (primaryStatus) {
          statusChangeMessage = 'Primary status updated successfully!';
        } else if (secondaryStatus) {
          statusChangeMessage = 'Secondary status updated successfully!';
        }
  
        // Only show the SweetAlert if both statuses have been updated
        if (primaryStatus && secondaryStatus) {
          Swal.fire({
            title: 'Success!',
            text: statusChangeMessage,
            icon: 'success',
            confirmButtonText: 'OK',
          });
        }
  
        console.log('Status updated:', response.data);
      } else {
        console.error('Failed to update status:', response.data);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update status. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error updating status:', error);
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while updating the status. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };
  

  const handleDelete = async (leadid) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Make the DELETE request to the API
          const response = await fetch(`${baseURL}/opportunity/${leadid}`, {
            method: 'DELETE',
          });
  
          if (response.ok) {
            // Filter the deleted lead from the data
            setData((prevData) => prevData.filter((item) => item.leadid !== leadid));
  
            Swal.fire('Deleted!', 'Opportunity has been deleted.', 'success');
          } else {
            console.error('Error deleting record');
            Swal.fire('Failed!', 'Failed to delete the opportunity. Please try again.', 'error');
          }
        } catch (error) {
          console.error('Error:', error);
          Swal.fire('Error!', 'An error occurred while deleting the opportunity.', 'error');
        }
      } else {
        Swal.fire('Cancelled', 'Delete action was canceled.', 'info');
      }
    });
  };
  const navigateToLead = (leadId) => {
    navigate(`/potential-leads/${leadId}`, {
      state: { leadid: leadId },
    });
  };


  const columns = useMemo(
    () => [
      {
        Header: "S.No",
        accessor: (row, index) => index + 1,
      },
      {
        Header: "Opportunity Type",
        accessor: "lead_type",
        Cell: ({ row }) => (
          <span
            className="name-link"
            onClick={() => navigateToLead(row.original.leadid)}
            style={{ cursor: "pointer" }}
          >
            {row.original.lead_type}
          </span>
        ),
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ row }) => (
          <span
            className="name-link"
            onClick={() => navigateToLead(row.original.leadid)}
            style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
          >
            {row.original.name}
          </span>
        ),
      },
      {
        Header: "Mobile No",
        accessor: "phone_number",
        Cell: ({ row }) => (
          <span className="name-link"
            onClick={() => navigateToLead(row.original.leadid)}
            style={{ cursor: "pointer" }}
          >
            {row.original.phone_number}
          </span>
        ),
      },
      {
        Header: "Email",
        accessor: "email",
        Cell: ({ row }) => (
          <span
            className="name-link"
            onClick={() => navigateToLead(row.original.leadid)}
            style={{ cursor: "pointer" }}
          >
            {row.original.email}
          </span>
        ),
      },
      {
        Header: "Opportunity Status 1",
        accessor: "opportunity_status1",
        Cell: ({ row }) => (
          <select
            value={row.original.opportunity_status1}
            onChange={(e) => handlePrimaryStatusChange(e.target.value, row.original.leadid)}
            className="form-select"
          >
            <option value="">Select Status</option>
            {dropdownOptions.primary.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ),
      },
      {
        Header: "Opportunity Status 2",
        accessor: "opportunity_status2",
        Cell: ({ row }) => (
          <select
            value={row.original.opportunity_status2}
            onChange={(e) => handleSecondaryStatusChange(e.target.value, row.original.leadid)}
            className="form-select"
            disabled={!row.original.opportunity_status1} // Disable until a primary status is selected
          >
            <option value="">Select Status</option>
            {dropdownOptions.secondary[row.original.opportunity_status1]?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ),
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div>
            <button
              className="btn btn-warning edit-button me-1 mb-1"
              onClick={() => handleEdit(row.original)}
            >
              <FaEdit />
            </button>
            <button
              className="btn btn-info view-button me-1"
              onClick={() => handleView(row.original)}
            >
              <FaEye />
            </button>
            <button
              className="btn btn-danger delete-button me-1 mb-1"
              onClick={() => handleDelete(row.original.leadid)}
            >
              <FaTrash />
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
    ],
    [dropdownOptions]
  );

  return (
    <div className="salesOpportunitycontainer">
      <Navbar onToggleSidebar={setCollapsed} />
      <div className={`salesOpportunity ${collapsed ? "collapsed" : ""}`}>
        <div className="potentialleads-table-container">
          <Row className="mb-3">
            <Col className="d-flex justify-content-between align-items-center">
              <h3>Opportunity Details</h3>
            </Col>
          </Row>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <DataTable columns={columns} data={data} />
          )}
        </div>




        {selectedLead && (
          <>
            <EditOppLead
              show={showEditModal}
              handleClose={() => setShowEditModal(false)}
              lead={selectedLead}
              handleSave={handleSaveEdit}
            />
            <LeadOppView
              show={showViewModal}
              handleClose={() => setShowViewModal(false)}
              lead={selectedLead}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Potentialleads;