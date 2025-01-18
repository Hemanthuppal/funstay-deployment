import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../../Shared/Sales-ExecutiveNavbar/Navbar";
import "./LeadDetails.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import baseURL from "../../../Apiservices/Api";

const LeadDetails = () => {
    const location = useLocation();
    const { leadid } = location.state;
    console.log("leadId=", leadid);
    const [collapsed, setCollapsed] = useState(false);
    const [leadData, setLeadData] = useState(null); // State to store lead data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchLeadData = async () => {
            try {
                const response = await axios.get(`${baseURL}/get-lead-data/${leadid}`); // Replace with your actual API endpoint
                console.log("API Response:", response.data); // Log the full response

                // Check if the response data is an array
                if (Array.isArray(response.data)) {
                    response.data.forEach((lead, index) => {
                        console.log(`Lead ID ${index + 1}:`, lead.leadid); // Log each lead ID dynamically
                    });
                } else {
                    console.log("Lead ID:", response.data?.leadid); // If it's not an array, log the single lead ID
                }

                setLeadData(response.data); // Update state with fetched data
                setLoading(false);
            } catch (err) {
                console.error("Error fetching lead data:", err);
                setError("Failed to fetch lead data.");
                setLoading(false);
            }
        };

        fetchLeadData();
    }, [leadid]);

    const handleAddQuotation = () => {
        console.log("Add Quotation clicked");
    };

    if (loading) return <div>Loading...</div>; // Display loading message
    if (error) return <div>{error}</div>; // Display error message

    return (
        <div className="salesOpportunitycontainer">
            <Navbar onToggleSidebar={setCollapsed} />
            <div className={`salesOpportunity ${collapsed ? "collapsed" : ""}`}>
                <div className="container py-4">
                    <div className="d-flex justify-content-end mb-3 gap-2">
                        <button className="btn btn-gradient-right" onClick={handleAddQuotation}>
                            Add Quotation
                        </button>
                    </div>

                    <div className="card mb-4">
                        <div className="card-body">
                            <h2 className="card-title">Lead Details</h2>
                            {Array.isArray(leadData) ? (
                                leadData.map((lead, index) => (
                                    <div key={index} className="row mb-4">
                                        <div className="col-md-6">
                                            <div className="mb-3 d-flex flex-wrap">
                                                <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                                                    Lead Type:
                                                </span>
                                                <span className="text-muted">{lead?.lead_type}</span>
                                            </div>
                                            <div className="mb-3 d-flex flex-wrap">
                                                <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                                                    Name:
                                                </span>
                                                <span className="text-muted">{lead?.name}</span>
                                            </div>
                                            <div className="mb-3 d-flex flex-wrap">
                                                <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                                                    Email:
                                                </span>
                                                <span className="text-muted">{lead?.email}</span>
                                            </div>
                                            <div className="d-flex flex-wrap">
                                                <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                                                    Phone Number:
                                                </span>
                                                <span className="text-muted">{lead?.phone_number}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3 d-flex flex-wrap">
                                                <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                                                    Source:
                                                </span>
                                                <span className="text-muted">{lead?.sources}</span>
                                            </div>
                                            <div className="mb-3 d-flex flex-wrap">
                                                <span className="fw -bold me-2" style={{ minWidth: "150px" }}>
                                                    Primary Status:
                                                </span>
                                                <span className="text-muted">{lead?.primaryStatus}</span>
                                            </div>
                                            <div className="mb-3 d-flex flex-wrap">
                                                <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                                                    Secondary Status:
                                                </span>
                                                <span className="text-muted">{lead?.secondaryStatus}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No lead data available</p>
                            )}
                        </div>
                    </div>

                    <div className="card mb-4">
    <div className="card-body">
        <h2 className="card-title">Opportunity Details</h2>
        {Array.isArray(leadData) ? (
            leadData.map((lead, index) => (
                <div key={index} className="row mb-4">
                    <div className="col-md-6">
                        <div className="mb-3 d-flex flex-wrap">
                            <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                                Opportunity Status 1:
                            </span>
                            <span className="text-muted">{lead?.opportunity_status1}</span>
                        </div>
                        <div className="mb-3 d-flex flex-wrap">
                            <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                                Opportunity Status 2:
                            </span>
                            <span className="text-muted">{lead?.opportunity_status2}</span>
                        </div>
                        <div className="mb-3 d-flex flex-wrap">
                            <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                                Travel Type:
                            </span>
                            <span className="text-muted">{lead?.travel_type}</span>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3 d-flex flex-wrap">
                            <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                                Passport Number:
                            </span>
                            <span className="text-muted">{lead?.passport_number}</span>
                        </div>
                        <div className="mb-3 d-flex flex-wrap">
                            <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                                Preferred Contact Method:
                            </span>
                            <span className="text-muted">{lead?.preferred_contact_method}</span>
                        </div>
                        <div className="mb-3 d-flex flex-wrap">
                            <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                                Special Requirement:
                            </span>
                            <span className="text-muted">{lead?.special_requirement}</span>
                        </div>
                    </div>
                </div>
            ))
        ) : (
            <p>No lead data available</p>
        )}
    </div>
</div>

<div className="card mb-4">
    <div className="card-body">
        <h2 className="card-title">Travel Details</h2>
        {Array.isArray(leadData) ? (
            leadData.map((lead, index) => (
                <div key={index} className="row mb-4">
                    <div className="col-md-6">
                        <div className="mb-3 d-flex flex-wrap">
                            <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                                Destination:
                            </span>
                            <span className="text-muted">{lead?.destination}</span>
                        </div>
                        <div className="mb-3 d-flex flex-wrap">
                            <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                                Start Date:
                            </span>
                            <span className="text-muted">
                                {lead?.start_date
                                    ? new Intl.DateTimeFormat('en-IN', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    }).format(new Date(lead.start_date))
                                    : 'N/A'}
                            </span>
                        </div>
                        <div className="mb-3 d-flex flex-wrap">
                            <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                                End Date:
                            </span>
                            <span className="text-muted">
                                {lead?.end_date
                                    ? new Intl.DateTimeFormat('en-IN', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    }).format(new Date(lead.end_date))
                                    : 'N/A'}
                            </span>
                        </div>
                        <div className="mb-3 d-flex flex-wrap">
                            <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                                Budget:
                            </span>
                            <span className="text-muted">{lead?.approx_budget}</span>
                        </div>
                        <div className="mb-3 d-flex flex-wrap">
                            <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                                Notes:
                            </span>
                            <span className="text-muted">{lead?.notes}</span>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3 d-flex flex-wrap">
                            <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                                Duration:
                            </span>
                            <span className="text-muted">{lead?.duration}</span>
                        </div>
                        <div className="mb-3 d-flex flex-wrap">
                            <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                                Adults:
                            </span>
                            <span className="text-muted">{lead?.adults_count}</span>
                        </div>
                        <div className="mb-3 d-flex flex-wrap">
                            <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                                Children:
                            </span>
                            <span className="text-muted">{lead?.children_count}</span>
                        </div>
                        <div className="mb-3 d-flex flex-wrap">
                            <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                                Child Age:
                            </span>
                            <span className="text-muted">{lead?.child_ages}</span>
                        </div>
                       
                    </div>
                </div>
            ))
        ) : (
            <p>No lead data available</p>
        )}
    </div>
</div>
                </div>
            </div>
        </div>
    );
};

export default LeadDetails;