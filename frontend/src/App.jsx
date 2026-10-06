import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This will connect to your local backend for now
    fetch("http://localhost:3000/patients")
        .then((res) => res.json())
        .then((data) => {
          setPatients(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
  }, []);

  const filteredPatients = patients.filter((patient) =>
      patient.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
      <div className="container">
        <h1>ClinicFlow Queue</h1>
        <p className="subtitle">Live Patient Tracking</p>

        <input
            type="text"
            placeholder="Search patient name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />

        {loading ? (
            <p>Loading patient data...</p>
        ) : filteredPatients.length === 0 ? (
            <p>No patients found.</p>
        ) : (
            <div className="patient-list">
              {filteredPatients.map((patient) => (
                  <div className="card" key={patient._id}>
                    <h3>{patient.name}</h3>
                    <p>Token: {patient.tokenNumber}</p>
                    <p>Dept: {patient.department}</p>
                    <p>Status: {patient.status}</p>
                  </div>
              ))}
            </div>
        )}
      </div>
  );
}

export default App;