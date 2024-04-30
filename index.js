const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3001;

app.use(bodyParser.json());

// Create connection to MySQL
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.PORT
  });

connection.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.post('/api/appointments', (req, res) => {
  const { name, phoneNumber, ownerName, appointmentDate } = req.body;
  const sql = 'INSERT INTO appointments (name, phoneNumber, ownerName, appointmentDate) VALUES (?, ?, ?, ?)';
  connection.query(sql, [name, phoneNumber, ownerName, appointmentDate], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Error saving appointment');
      return;
    }
    console.log('Appointment saved:', result);
    res.status(201).json({ message: 'Appointment saved successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
