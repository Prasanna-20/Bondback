const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a MySQL connection
const db = mysql.createConnection({
    host: 'localhost', // your MySQL server host
    user: 'root', // your MySQL username
    password: 'prasanna@1234', // your MySQL password
    database: 'bondback', // your database name
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('MySQL connected');
});

// Signup route
app.post('/student_signup', (req, res) => {
    console.log('Received a POST request to /student_signup');
    const { firstName, lastName, email, password, username, uec, contactNo, year, branch, linkedin_link } = req.body;
    
    // Logging request body to check form submission
    console.log('Form data received:', req.body);

    const query = `
    INSERT INTO students (firstName, lastName, email, password, username, uec, contactNo, year, branch, linkedin_link) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [firstName, lastName, email, password, username, uec, contactNo, year, branch, linkedin_link];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error inserting student:', err);
            return res.status(500).json({ message: 'Error registering student', error: err });
        }
        res.status(201).json({ message: 'Student registered successfully!' });
    });
});

// Alumni signup route
app.post('/alumni_signup', (req, res) => {
  console.log('Received a POST request to /alumni_signup');
  
  // Destructure form data from request body
  const { firstName, lastName, email, password, username, Cno, curr_org, pass_year, linkedin_link, prev_exp, domain, location, contactNo } = req.body;
  
  // Log form data to check submission
  console.log('Form data received:', req.body);

  // Define query to insert data into alumni table
  const query = `
  INSERT INTO alumni (firstName, lastName, email, password, username, Cno, curr_org, pass_year, linkedin_link, prev_exp, domain, location, contactNo) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  // Values to be inserted
  const values = [firstName, lastName, email, password, username, Cno, curr_org, pass_year, linkedin_link, prev_exp, domain, location, contactNo];

  // Execute the query
  db.query(query, values, (err, result) => {
      if (err) {
          console.error('Error inserting alumni:', err);
          return res.status(500).json({ message: 'Error registering alumni', error: err });
      }
      // Respond with success message
      res.status(201).json({ message: 'Alumni registered successfully!' });
  });
});

// Teacher signup route
app.post('/teacher_signup', (req, res) => {
  console.log('Received a POST request to /teacher_signup');
  const { firstName, lastName, username, email, password, branch, contactNo } = req.body;

  // Logging request body to check form submission
  console.log('Form data received:', req.body);

  const query = `
  INSERT INTO teachers (firstName, lastName, username, email, password, branch, contactNo) 
  VALUES (?, ?, ?, ?, ?, ?, ?)`;

  const values = [firstName, lastName, username, email, password, branch, contactNo];

  db.query(query, values, (err, result) => {
      if (err) {
          console.error('Error inserting teacher:', err);
          return res.status(500).json({ message: 'Error registering teacher', error: err });
      }
      res.status(201).json({ message: 'Teacher registered successfully!' });
  });
});


// Admin signup route
app.post('/admin_signup', (req, res) => {
  console.log('Received a POST request to /admin_signup');
  
  // Destructure form data from request body
  const { username, password, name, email, contactNo } = req.body;

  // Logging request body to check form submission
  console.log('Form data received:', req.body);

  // Define query to insert data into Admin table
  const query = `
  INSERT INTO admin (username, password, name, email, contact_no) 
  VALUES (?, ?, ?, ?, ?)`;

  // Values to be inserted
  const values = [username, password, name, email, contactNo];

  // Execute the query
  db.query(query, values, (err, result) => {
      if (err) {
          console.error('Error inserting admin:', err);
          return res.status(500).json({ message: 'Error registering admin', error: err });
      }
      res.status(201).json({ message: 'Admin registered successfully!' });
  });
});


// Default route for testing server status
app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
