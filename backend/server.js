require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    dbName: "clinicDB"
})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

const Patient = mongoose.model(
    "Patient",
    {
        tokenNumber: Number,
        name: String,
        department: String,
        status: String
    },
    "Patients"
);

app.get("/patients", async (req, res) => {
    const patients = await Patient.find();
    res.json(patients);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Clinic backend running on port " + PORT);
});