import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const StudentsList = () => {
  const [isLoad, setIsLoad] = useState(true);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7261/api/Diak/GetAllStudents")
      .then((response) => response.json())
      .then((students) => {
        setStudents(students);
      })
      .catch(console.error)
      .finally(() => setIsLoad(false));
  }, []);

  return isLoad ? (
    <div>Loading...</div>
  ) : (
    <div className="container mt-3">
      <div className="d-flex gap-3">
        {students.map((student, index) => (
          <div key={index} className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">{student.name}</h5>
              <p className="card-text">
                {student.educationNumber}
              </p>
              <Link
                className="btn btn-primary"
                to={`single-student/${student.id}`}
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentsList;