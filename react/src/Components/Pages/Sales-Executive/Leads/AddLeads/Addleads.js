import React, { useState , useRef} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./AddLeads.css";
import Navbar from "../../../../Shared/Sales-ExecutiveNavbar/Navbar";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import baseURL from "../../../../Apiservices/Api";

const DynamicForm = () => {
  const [selectedOption, setSelectedOption] = useState("individual");
  const [formData, setFormData] = useState({
    lead_type: 'individual',
    name: '',
    email: '',
    phone_number: '',
    sources: '',
    group_name: '',
    leader_name: '',
    leader_email: '',
    another_name: '',
    another_email: '',
    another_phone_number: '',
    corporate_id: '',
    description: '',
  });
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const nameInputRef = useRef(null);
  const handleRadioChange = (e) => {
    const { value } = e.target;
    setSelectedOption(value);
    setFormData({ ...formData, lead_type: value });

    // Focus on the name input field when changing the radio button
    if (nameInputRef.current) {
      nameInputRef.current.focus(); // Set focus on the name input field
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${baseURL}/api/leads`, formData);
  
      // SweetAlert success notification
      Swal.fire({
        title: 'Success!',
        text: 'Lead added successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        // Navigate after the user acknowledges the alert
        navigate('/view-lead');
      });
  
      console.log(response.data);
  
      // Reset form data
      setFormData({
        lead_type: '',
        name: '',
        email: '',
        phone_number: '',
        sources: '',
        group_name: '',
        leader_name: '',
        leader_email: '',
        another_name: '',
        another_email: '',
        another_phone_number: '',
        corporate_id: '',
        description: '',
      });
    } catch (error) {
      console.error("Error adding lead:", error);
  
      // SweetAlert error notification
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add lead. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const renderForm = () => {
    if (selectedOption === "individual") {
      return (
        <div className="addleads-form-grid">
          <div className="addleads-input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              ref={nameInputRef} 
              autoFocus
            />
          </div>
          <div className="addleads-input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="addleads-input-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phone_number"
              placeholder="Enter Phone Number"
              value={formData.phone_number}
              onChange={handleChange}
            />
          </div>
          <div className="addleads-input-group">
            <label>Sources</label>
            <select
              name="sources"
              value={formData.sources}
              onChange={handleChange}
            >
              <option value="">Select Source</option>
              <option value="Website">Website</option>
              <option value="Referral">Referral</option>
              <option value="Advertisement">Advertisement</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="addleads-input-group">
            <label>Description</label>
            <input
              type="text"
              name="description"
              placeholder="Enter Description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </div>
      );
    } else if (selectedOption === "group") {
      return (
        <div className="addleads-form-grid">
          <div className="addleads-input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              ref={nameInputRef} 
              autoFocus
            />
          </div>
          <div className="addleads-input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="addleads-input-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phone_number"
              placeholder="Enter Phone Number"
              value={formData.phone_number}
              onChange={handleChange}
            />
          </div>
          <div className="addleads-input-group">
            <label>Sources</label>
            <select
              name="sources"
              value={formData.sources}
              onChange={handleChange}
            >
              <option value="">Select Source</option>
              <option value="Website">Website</option>
              <option value="Referral">Referral</option>
              <option value="Advertisement">Advertisement</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="addleads-input-group">
            <label>Another Name</label>
            <input
              type="text"
              name="another_name"
              placeholder="Enter Another Name"
              value={formData.another_name}
              onChange={handleChange}
            />
          </div>
          <div className="addleads-input-group">
            <label>Another Email</label>
            <input
              type="email"
              name="another_email"
              placeholder="Enter Another Email"
              value={formData.another_email}
              onChange={handleChange}
            />
          </div>
          <div className="addleads-input-group">
            <label>Another Phone Number</label>
            <input
              type="text"
              name="another_phone_number"
              placeholder="Enter Another Phone Number"
              value={formData.another_phone_number}
              onChange={handleChange}
            />
          </div>
          <div className="addleads-input-group">
            <label>Description</label>
            <input
              type="text"
              name="description"
              placeholder="Enter Description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </div>
      );
    } else if (selectedOption === "corporate") {
      return (
        <div className="addleads-form-grid">
          <div className="addleads-input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              ref={nameInputRef} 
              autoFocus
            />
          </div>
          <div className="addleads-input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="addleads-input-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phone_number"
              placeholder="Enter Phone Number"
              value={formData.phone_number}
              onChange={handleChange}
            />
          </div>
          <div className="addleads-input-group">
            <label>Sources</label>
            <select
              name="sources"
              value={formData.sources}
              onChange={handleChange}
            >
              <option value="">Select Source</option>
              <option value="Website">Website</option>
              <option value="Referral">Referral</option>
              <option value="Advertisement">Advertisement</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="addleads-input-group">
            <label>Another Name</label>
            <input
              type="text"
              name="another_name"
              placeholder="Enter Another Name"
              value={formData.another_name}
              onChange={handleChange}
            />
          </div>
          <div className="addleads-input-group">
            <label>Another Email</label>
            <input
              type="email"
              name="another_email"
              placeholder="Enter Another Email"
              value={formData.another_email}
              onChange={handleChange}
            />
          </div>
          <div className="addleads-input-group">
            <label>Another Phone Number</label>
            <input
              type="text"
              name="another_phone_number"
              placeholder="Enter Another Phone Number"
              value={formData.another_phone_number}
              onChange={handleChange}
            />
          </div>
          <div className="addleads-input-group">
            <label>Corporate ID</label>
            <input
              type="text"
              name="corporate_id"
              placeholder="Enter Corporate ID"
              value={formData.corporate_id}
              onChange={handleChange}
            />
          </div>
          <div className="addleads-input-group">
            <label>Description</label>
            <input
              type="text"
              name="description"
              placeholder="Enter Description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </div>
      );
    }

    return null; // In case none of the options are selected
  };

  return (
    <div className="salesViewLeadsContainer">
      <Navbar onToggleSidebar={setCollapsed} />
      <div className={`salesViewLeads ${collapsed ? "collapsed" : ""}`}>
        <div className="addleads-form-container">
          <h2 className="addleads-form-header">Add Leads</h2>
          <div className="mb-3">
            <label>
              <input
                type="radio"
                name="formType"
                value="individual"
                checked={selectedOption === "individual"}
                onChange={handleRadioChange}
              />
              Individual
            </label>
            <label style={{ marginLeft: "10px" }}>
              <input
                type="radio"
                name="formType"
                value="group"
                checked={selectedOption === "group"}
                onChange={handleRadioChange}
              />
              Group
            </label>
            <label style={{ marginLeft: "10px" }}>
              <input
                type="radio"
                name="formType"
                value="corporate"
                checked={selectedOption === "corporate"}
                onChange={handleRadioChange}
              />
              Corporate
            </label>
          </div>
          <form onSubmit={handleSubmit} className="addleads-form">
            {renderForm()}
            <div className="addleads-form-footer">
              <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                Back
              </button>
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DynamicForm;