const fs = require("fs");
const path = require("path");

const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const axios = require("axios");

const PORT = 3000;
const app = express();
app.use(express.json());
const server = http.createServer(app);
const io = socketio(server);

const databaseFilePath = path.join(__dirname, "db.json");

io.on("connection", (socket) => {
  socket.on("join", (data) => {
    socket.join(data.room);
    socket.broadcast.to(data.room).emit("user joined");
  });
  socket.on("message", (data) => {
    io.in(data.room).emit("new message", {
      user: data.user,
      message: data.message,
    });
  });
});

// const newEntry = {
//   id: 2,
//   name: "Jane Smith",
//   email: "jane@example.com",
// };

function readDataFromDatabase() {
  try {
    const data = fs.readFileSync(databaseFilePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    // If the file doesn't exist or cannot be read, return an empty array as the initial data
    return [];
  }
}

function writeDataToDatabase(data) {
  fs.writeFileSync(databaseFilePath, JSON.stringify(data, null, 2), "utf8");
}

// Get all entries from the database
app.get("/api/data", (req, res) => {
  const database = readDataFromDatabase();
  res.json(database);
});

// Add a new entry to the database
app.post("/api/data", (req, res) => {
  const database = readDataFromDatabase();
  const newEntry = req.body;
  database.allUsers.push(newEntry);
  writeDataToDatabase(database);
  res.status(201).json(newEntry);
});

// Update an entry in the database
app.put("/api/data/:id", (req, res) => {
  const idToUpdate = parseInt(req.params.id);
  const updatedEntry = req.body;

  let database = readDataFromDatabase();
  database = database.map((entry) =>
    entry.id === idToUpdate ? { ...entry, ...updatedEntry } : entry
  );
  writeDataToDatabase(database);
  res.json(updatedEntry);
});

// Delete an entry from the database
app.delete("/api/data/:id", (req, res) => {
  const idToDelete = parseInt(req.params.id);
  let database = readDataFromDatabase();
  database = database.filter((entry) => entry.id !== idToDelete);
  writeDataToDatabase(database);
  res.sendStatus(204);
});

function addEntryToDatabase(newEntry) {
  return axios.post("http://localhost:3000/api/data", newEntry);
}

// Example usage of the addEntryToDatabase function
// addEntryToDatabase(newEntry)
//   .then((response) => {
//     console.log("Successfully added:", response.data);
//   })
//   .catch((error) => {
//     console.error("Error adding entry:", error.message);
//   });

app.get("/", (req, res) => res.send("Nothing here...it's just a server"));
server.listen(PORT, () => {
  console.log(`Server started on port:${PORT}`);
});
