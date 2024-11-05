// const express = require('express');
// const app = express();

// // Define the port
// const PORT = 3000;

// // Create a basic route
// app.get('/', (req, res) => {
//   res.send('Hello, Express!');
// });




// FRAMEWORK CONFIGURATION

const express = require("express");
const connectDb = require("./config/dbConnection"); // Ensure this path is correct
const errorHandler = require("./middleware/errorHandler"); // Ensure this path is correct
const cors = require("cors");
const hbs=require("hbs")
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
// Connect to the database

// Create an Express application
// Middleware


// Basic route
// app.get("/", (req, res) => {
//     res.send("Hello World");
// });

// Error handling middleware
// app.use(errorHandler);

// Start the server
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

// env file configz
const dotenv=require("dotenv");
dotenv.config();
connectDb();
const app = express();
app.set('view engine','hbs');

hbs.registerPartials(__dirname + '/views/partials'); // Path to your partials
app.use(express.json());
app.use(cors());

app.use("/api/register",require("./routes/userRoutes"));
app.use("/api/doctor", require("./routes/doctorRoutes"))

// app.post('/profile', upload.single('avatar'), function (req, res, next) {
//     // req.file is the `avatar` file
//     // req.body will hold the text fields, if there were any
//     console.log(req.body);
//     console.log(req.file);
// return res.redirect("/home");
//   })

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
//   })
  
//   const uploads = multer({ storage: storage })

const Upload = require("./model/UploadModel")

app.post("/profile", upload.single('avatar'), async (req, res, next) => {
    try {
        const profileData = {
            username: req.body.username,
            avatar: req.file.path, // Save the file path
        };

        const newProfile = new Upload(profileData);
        await newProfile.save();

        console.log("Profile saved:", newProfile);
        res.redirect("/home");
    } catch (error) {
        console.error("Error saving profile:", error);
        res.status(500).send("Error saving profile.");
    }
});

app.get("/home",(req,res)=>{

    res.render("home",{
        username:"Krishna",
    })
})

const port = process.env.PORT || 5000;
// jha package.json hoti hai whi installation hoti hai

// Server listens on the defined port
app.get("/users",(req,res)=>{
    res.render("users",{

        people:[
            {
                username:"Krihsna",
                age:20
            },
            {
                username:"Lakshay",
                age:21
            }
        ]

    })
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
