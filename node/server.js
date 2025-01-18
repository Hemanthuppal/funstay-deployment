const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Replace with your DB password
  database: 'funstay', // Replace with your DB name
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to the database.');
});

// POST API for adding a lead
app.post('/api/leads', (req, res) => {
  const {
    lead_type,
    name,
    email,
    phone_number,
    sources,
    group_name,
    leader_name,
    leader_email,
    another_name,
    another_email,
    another_phone_number,
    corporate_id,
    description,
  } = req.body;

  const query = `
    INSERT INTO addleads (
      lead_type, name, email, phone_number, sources, group_name,
      leader_name, leader_email, another_name, another_email,
      another_phone_number, corporate_id, description,status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
  `;

  const values = [
    lead_type,
    name,
    email,
    phone_number,
    sources,
    group_name,
    leader_name,
    leader_email,
    another_name,
    another_email,
    another_phone_number,
    corporate_id,
    description,
    'lead', 
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting lead:', err);
      res.status(500).send('Failed to add lead.');
    } else {
      res.status(201).send({ message: 'Lead added successfully!', leadId: result.insertId });
    }
  });
});

// GET API to fetch all leads
app.get('/api/allleads', (req, res) => {
  const query = 'SELECT * FROM addleads ORDER BY created_at DESC'; // Sort by created_at in descending order

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching leads:', err);
      res.status(500).send('Failed to fetch leads.');
    } else {
      res.status(200).json(results);
    }
  });
});

app.post('/api/opportunities/create', (req, res) => {
  const {
    leadid,
    destination,
    start_date,
    end_date,
    duration,
    adults_count,
    children_count,
    child_ages,
    approx_budget,
    assignee,
    notes,
    comments,
    reminder_setting,
  } = req.body;

  // Log the request body for debugging
  console.log(req.body);

  // SQL query to insert data into the travel_opportunity table
  const insertOpportunityQuery = `
    INSERT INTO travel_opportunity 
      (leadid, destination, start_date, end_date, duration, adults_count, children_count, 
      child_ages, approx_budget, assignee, notes, comments, reminder_setting, created_at, updated_at)
    VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW());
  `;

  const updateLeadStatusQuery = `
    UPDATE addleads 
    SET status = 'opportunity', updated_at = NOW() 
    WHERE leadid = ?;
  `;

  const opportunityValues = [
    leadid,
    destination,          // destination (string)
    start_date,           // start_date (YYYY-MM-DD string)
    end_date,             // end_date (YYYY-MM-DD string)
    duration,             // duration (string)
    adults_count,         // adults_count (integer)
    children_count,       // children_count (integer)
    child_ages,           // child_ages (string)
    approx_budget,        // approx_budget (decimal)
    assignee,             // assignee (string)
    notes,                // notes (text)
    comments,             // comments (text)
    reminder_setting,     // reminder_setting (YYYY-MM-DD string)
  ];

  // Start a transaction to ensure both queries succeed
  db.beginTransaction((transactionErr) => {
    if (transactionErr) {
      console.error('Error starting transaction:', transactionErr);
      return res.status(500).json({ error: 'Failed to start transaction' });
    }

    // Insert into travel_opportunity
    db.query(insertOpportunityQuery, opportunityValues, (insertErr, results) => {
      if (insertErr) {
        console.error('Error inserting opportunity:', insertErr);
        return db.rollback(() => {
          res.status(500).json({ error: 'Failed to create opportunity', details: insertErr });
        });
      }

      const opportunityId = results.insertId;

      // Update the status in addleads table by leadid
      db.query(updateLeadStatusQuery, [leadid], (updateErr) => {
        if (updateErr) {
          console.error('Error updating lead status:', updateErr);
          return db.rollback(() => {
            res.status(500).json({ error: 'Failed to update lead status', details: updateErr });
          });
        }

        // Commit the transaction if both queries succeed
        db.commit((commitErr) => {
          if (commitErr) {
            console.error('Error committing transaction:', commitErr);
            return db.rollback(() => {
              res.status(500).json({ error: 'Failed to commit transaction', details: commitErr });
            });
          }

          console.log('Opportunity created and lead status updated successfully.');
          res.status(201).json({ 
            message: 'Opportunity created successfully', 
            opportunityId 
          });
        });
      });
    });
  });
});


// Fetch Comments for a Lead
app.get("/comments/:leadid", (req, res) => {
  const { leadid } = req.params;
  const query = "SELECT * FROM comments WHERE leadid = ? ORDER BY timestamp DESC";

  db.query(query, [leadid], (err, results) => {
      if (err) {
          console.error("Error fetching comments:", err); // Add better logging for debugging
          res.status(500).json({ error: "Error fetching comments" });
      } else {
          res.status(200).json(results);
      }
  });
});



// Add a New Comment
app.post("/comments/add", (req, res) => {
  const { leadid, timestamp, text } = req.body;

  if (!leadid || !timestamp || !text) {
      return res.status(400).send("All fields are required.");
  }

  const query = "INSERT INTO comments (leadid, timestamp, text) VALUES (?, ?, ?)";
  db.query(query, [leadid, timestamp, text], (err, result) => {
      if (err) {
          res.status(500).send(err);
      } else {
          res.json({ id: result.insertId, leadid, timestamp, text }); // Return the added comment with ID
      }
  });
});

app.put('/api/leads/status/:leadid', (req, res) => {
  const { leadid } = req.params; // Get lead ID from the URL
  const { primaryStatus, secondaryStatus } = req.body; // Get status fields from the request body

  // Validate input
  if (!primaryStatus || !secondaryStatus) {
    return res.status(400).send({
      message: 'Primary status and secondary status are required.',
    });
  }

  // SQL query to update the lead's status
  const query = `
    UPDATE addleads
    SET primaryStatus = ?, secondaryStatus = ?
    WHERE leadid = ?
  `;

  // Execute the query
  db.query(query, [primaryStatus, secondaryStatus, leadid], (err, result) => {
    if (err) {
      console.error('Error updating lead status:', err);
      return res.status(500).send({ message: 'Failed to update lead status.' });
    }

    // Check if a row was updated
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Lead not found.' });
    }

    // Success response
    res.status(200).send({ message: 'Lead status updated successfully.' });
  });
});


app.get('/api/leads/:leadid', (req, res) => {
  const leadid = req.params.leadid;
  db.query('SELECT * FROM addleads WHERE leadid = ?', [leadid], (error, results) => {
      if (error) {
          return res.status(500).send(error);
      }
      if (results.length > 0) {
          return res.status(200).json(results[0]);
      } else {
          return res.status(404).json({ message: "Lead not found" });
      }
  });
});

app.put('/api/leads/update/:leadid', (req, res) => {
  const leadid = req.params.leadid;
  const updatedData = req.body; // Assuming body contains fields to be updated

  db.query('UPDATE addleads SET ? WHERE leadid = ?', [updatedData, leadid], (error, results) => {
      if (error) {
          return res.status(500).send(error);
      }
      if (results.affectedRows > 0) {
          return res.status(200).json({ message: "Lead updated successfully" });
      } else {
          return res.status(404).json({ message: "Lead not found" });
      }
  });
});

app.put('/api/update-status/:leadId', (req, res) => {
  const { leadId } = req.params;
  const { opportunity_status1, opportunity_status2 } = req.body;

  let query = 'UPDATE addleads SET ';
  const params = [];

  if (opportunity_status1 !== undefined) {
    query += 'opportunity_status1 = ?, ';
    params.push(opportunity_status1);
  }
  if (opportunity_status2 !== undefined) {
    query += 'opportunity_status2 = ?, ';
    params.push(opportunity_status2);
  }

  // Remove trailing comma
  query = query.slice(0, -2);
  query += ' WHERE leadid = ?';
  params.push(leadId);

  db.query(query, params, (error, results) => {
    if (error) {
      console.error('Error updating status:', error);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.affectedRows > 0) {
      res.status(200).json({ message: 'Status updated successfully' });
    } else {
      res.status(404).json({ message: 'Lead not found' });
    }
  });
});


app.delete('/api/deleteByLeadId/:leadid', (req, res) => {
  const { leadid } = req.params;

  if (!leadid) {
    return res.status(400).json({ message: 'leadid is required' });
  }

  // SQL query to delete the record by leadId
  const sql = `DELETE FROM addleads WHERE leadid = ?`;

  db.query(sql, [leadid], (err, result) => {
    if (err) {
      console.error('Error deleting record:', err);
      return res.status(500).json({ message: 'Error deleting record' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.status(200).json({ message: 'Record deleted successfully' });
  });
});


app.delete('/opportunity/:leadid', (req, res) => {
  const { leadid } = req.params;

  if (!leadid) {
    return res.status(400).json({ message: 'leadid is required' });
  }

  // Start a transaction
  db.beginTransaction((err) => {
    if (err) {
      console.error('Error starting transaction:', err);
      return res.status(500).json({ message: 'Error starting transaction' });
    }

    // SQL queries for deleting from both tables
    const deleteFromAddLeads = `DELETE FROM addleads WHERE leadid = ?`;
    const deleteFromTravelOpportunity = `DELETE FROM travel_opportunity WHERE leadid = ?`;

    // Delete from `addleads` table
    db.query(deleteFromAddLeads, [leadid], (err, result) => {
      if (err) {
        return db.rollback(() => {
          console.error('Error deleting from addleads:', err);
          res.status(500).json({ message: 'Error deleting from addleads' });
        });
      }

      // If no record is found in addleads
      if (result.affectedRows === 0) {
        return db.rollback(() => {
          res.status(404).json({ message: 'Record not found in addleads' });
        });
      }

      // Delete from `travel_opportunity` table
      db.query(deleteFromTravelOpportunity, [leadid], (err, result) => {
        if (err) {
          return db.rollback(() => {
            console.error('Error deleting from travel_opportunity:', err);
            res.status(500).json({ message: 'Error deleting from travel_opportunity' });
          });
        }

        // If no record is found in travel_opportunity
        if (result.affectedRows === 0) {
          return db.rollback(() => {
            res.status(404).json({ message: 'Record not found in travel_opportunity' });
          });
        }

        // Commit the transaction if both deletions are successful
        db.commit((err) => {
          if (err) {
            return db.rollback(() => {
              console.error('Error committing transaction:', err);
              res.status(500).json({ message: 'Error committing transaction' });
            });
          }

          // Success response
          res.status(200).json({ message: 'Record deleted successfully from both tables' });
        });
      });
    });
  });
});


app.get('/get-lead-data/:leadid', (req, res) => {
  const leadid = req.params.leadid;

  // SQL query to join addleads and travel_opportunity
  const query = `
    SELECT 
      addleads.*, 
      travel_opportunity.*
    FROM 
      addleads
    INNER JOIN 
      travel_opportunity
    ON 
      addleads.leadid = travel_opportunity.leadid
    WHERE 
      addleads.leadid = ?;
  `;

  // Execute the query
  db.query(query, [leadid], (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      res.status(500).json({ error: 'Failed to fetch data' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
