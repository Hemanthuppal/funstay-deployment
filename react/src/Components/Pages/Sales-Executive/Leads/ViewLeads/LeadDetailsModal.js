// src/components/LeadDetailsModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const LeadDetailsModal = ({ show, onHide, leadDetails }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Lead Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {leadDetails ? (
          <div>
            <p><strong>Name:</strong> {leadDetails.name}</p>
            <p><strong>Phone:</strong> {leadDetails.phone_number}</p>
            <p><strong>Email:</strong> {leadDetails.email}</p>
            <p><strong>Source:</strong> {leadDetails.sources}</p>
            <p><strong>Lead Date:</strong> {leadDetails.created_at}</p>
            <p><strong>Description:</strong> {leadDetails.description}</p>
            <p><strong>Status:</strong> {leadDetails.status}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LeadDetailsModal;
