const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");

// middlewares
app.use(bodyParser.json());

// create MySQL database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dbschool",
});

// connect MySQL database
db.connect((error) => {
  if (error) {
    console.log("database not connected!!!");
  } else {
    console.log("awesome! database connected!");

    // endpoints start here

    // insert student to database
    app.post("/api/students", (req, res) => {
      const { studentName, course, fee } = req.body;
      const query =
        "INSERT INTO student (`Student Name`, `Course`, `Fee`) VALUES (?, ?, ?)";
      db.query(query, [studentName, course, fee], (error, results) => {
        if (error) {
          res.json({
            status: false,
            message: `student inserted fail`,
          });
        } else {
          res.json({
            status: true,
            message: "successfully inserted the student",
            results: results,
          });
        }
      });
    });

    // get all student info from database
    app.get("/api/students", (req, res) => {
      const query = "SELECT * FROM student";
      db.query(query, (error, results) => {
        if (error) {
          res.json({
            status: false,
            message: `student got fail`,
          });
        } else {
          res.json({
            status: true,
            statusCode: 200,
            message: "successfully got the student",
            results: results,
          });
        }
      });
    });

    // update a student info from database
    app.patch("/api/students", (req, res) => {
      const query = `
      UPDATE student
      SET Fee = 303030
      WHERE ID = 1
      `;
      db.query(query, (error, results) => {
        if (error) {
          res.json({
            status: false,
            message: `student updated fail`,
          });
        } else {
          res.json({
            status: true,
            statusCode: 200,
            message: "successfully updated",
            results: results,
          });
        }
      });
    });

    // delete a targeted student
    app.delete("/api/students", (req, res) => {
      const query = `
      DELETE FROM student
      WHERE ID = 5;
      `;
      db.query(query, (error, results) => {
        if (error) {
          res.json({
            status: false,
            message: `student deleted fail`,
          });
        } else {
          res.json({
            status: true,
            statusCode: 200,
            message: "successfully deleted",
            results: results,
          });
        }
      });
    });

    // get similar data between student and teacher
    app.get("/api/students/teachers", (req, res) => {
      const query =
        "SELECT `Student Name`, `Teacher Name`, `Department` FROM student JOIN teacher ON student.Course = teacher.Department;";

      db.query(query, (error, results) => {
        if (error) {
          res.json({
            status: false,
            message: `students and teachers got fail`,
          });
        } else {
          res.json({
            status: true,
            statusCode: 200,
            message: "successfully got the student and teacher",
            results: results,
          });
        }
      });
    });
  }
});

app.get("/", (req, res) => {
  res.json({ status: "server is ready to use!!!" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on: ${PORT}`);
});
