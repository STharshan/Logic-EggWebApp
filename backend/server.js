const express = require ("express")
const mongoose = require ('mongoose');
const cors = require("cors")
const multer = require('multer');

const collection = require('./Models/AdminModel');
const Scan = require('./Models/scanModel');
const employee = require('./Models/UserModel');
const role = require('./Models/RoleModel');
const device = require('./Models/DeviceModel')


const app = express();
app.use(express.json());
app.use(cors());

const username = "Tharsan";
const password = "Tharsan#06";
const databaseName = "GenesysProject";

const encodedUsername = encodeURIComponent(username);
const encodedPassword = encodeURIComponent(password);

mongoose.connect(`mongodb+srv://${encodedUsername}:${encodedPassword}@cluster0.1tv9nwr.mongodb.net/${databaseName}?retryWrites=true&w=majority`)
.then(() => {
  console.log("Successfully connected to MongoDB");
})
.catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

 
app.post("/api/register", async (req, res) => {
  const { employeeId, password } = req.body;

  const data={
    employeeId:"100",
    password:"123456"
  }

  try {
    const user = await collection.findOne({ employeeId:employeeId});

    if (user) {
      // Authentication successful
      res.status(200).json("exits");
    } else {
      // Authentication failed
      res.status(401).json("NotExits" );
      await collection.insertMany([data])
    }
  } catch (error) {
    console.error("Error during register:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.post("/api/login", async (req, res) => {
  const { employeeId, password } = req.body;

  const data={
    employeeId:employeeId,
    password:password
  }

  try {
    const user = await collection.findOne({ employeeId:employeeId});

    if (user) {
      // Authentication successful
      res.status(200).json({ message: "Login successful" , status:"success"});
    } else {
      // Authentication failed
      res.status(401).json({ message: "Invalid credentials", status: "failure" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const port= process.env.PORT || 5000

app.listen(port, ()=>{
  console.log("Server running on port", port)
})

//new scan
app.post("/api/scans", async (req, res) => {
  const {
    scanId,
    eggType,
    automaticTermination,
    duration,
    device,
    scheduledExecution,
    scheduledDate,
    scheduledTime,
  } = req.body;

  try {
    const newScan = new Scan({
      scanId,
      eggType,
      automaticTermination,
      duration,
      device,
      scheduledExecution,
      scheduledDate,
      scheduledTime,
    });

    await newScan.save();

    res.status(201).json({ message: "Scan details saved successfully" });
  } catch (error) {
    console.error("Error saving scan details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//get data from scan model
app.get("/api/data", async (req, res) => {
  try {
    const data = await Scan.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})

// delete data from scan model
app.delete('/api/delete/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const deletedItem = await Scan.findByIdAndDelete({_id: id});
    res.json({ success: true, deletedItem });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


// add user 

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/api/user", upload.single('image'), async (req, res) => {
  const {
    firstname,
    employeeId,
    email,
    role,
    password,
  } = req.body;


  try {
    const newEmployee = new employee({
      firstname,
      employeeId,
      email,
      role,
      password,
      image: {
        data: req.file.buffer.toString('base64'), // Access the binary data from the uploaded file
        contentType: req.file.mimetype,
      },
    });

    await newEmployee.save();

    res.status(201).json({ message: "user details saved successfully" });
  } catch (error) {
    console.error("Error saving user details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//get data from user model
app.get("/api/get/user", async (req, res) => {
  try {
    const data = await employee.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})

app.get("/api/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await employee.findById({_id:id});
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})

// update data from user model
app.put("/api/updateuser/:id", upload.single('image'), async (req, res) => {
  const id = req.params.id;
  const {
    firstname,
    employeeId,
    email,
    role,
    password,
  } = req.body;

  try {
    await employee.findByIdAndUpdate(
      {_id: id},
      {firstname,
      employeeId,
      email,
      role,
      password,
    });

    res.status(201).json({ message: "user details saved successfully" });
  } catch (error) {
    console.error("Error saving user details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// addrole
app.post("/api/role", async (req, res) => {
  const {
    rolename
  } = req.body;


  try {
    const newRole = new role({
      rolename
    });

    await newRole.save();

    res.status(201).json({ message: "user role detail saved successfully" });
  } catch (error) {
    console.error("Error saving user role detail:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//get data from role model
app.get("/api/get/role", async (req, res) => {
  try {
    const data = await role.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})

app.get("/api/role/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await role.findById({_id:id});
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})

// update data from role model
app.put('/api/updaterole/:id', async (req, res) => {
    const id = req.params.id;
    const rolename = req.body.rolename;
  try{
    const update = await role.findByIdAndUpdate({_id: id}, {
      rolename: rolename}) 
    if(!update){
      return res.status(404).json({ message: "role not found" });
    }  
    return res.json({ status: "ok", data: "updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
});

// add device
app.post("/api/device", async (req, res) => {
  const {
    devicename,
    deviceId
  } = req.body;


  try {
    const newDevice = new device({
      devicename,
      deviceId
    });

    await newDevice.save();

    res.status(201).json({ message: "device detail saved successfully" });
  } catch (error) {
    console.error("Error saving device detail:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//get device
app.get("/api/get/device", async (req, res) => {
  try {
    const data = await device.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})
