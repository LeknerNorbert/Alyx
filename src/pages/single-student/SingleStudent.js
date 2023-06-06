import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const SingleStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetch(`https://localhost:7261/api/Diak/GetStudentById?id=${id}`)
      .then((response) => response.json())
      .then((student) => {
        console.log(student);
        setStudent(student);
      })
      .catch(console.error);
  }, []);

  const handleDelete = () => {
    fetch(`https://localhost:7261/api/Diak/DeleteStudent?id=${id}`, {
      method: "DELETE",
    })
      .then(() => {
        navigate("/");
      })
      .catch(console.error);
  };

  return student ? (
    <div className="container mt-3">
      <h3>{student.name}</h3>
      <ul>
        <li>Ed. Number: {student.educationNumber}</li>
        <li>Start Year: {student.startYear}</li>
      </ul>
      <button onClick={handleDelete} className="btn btn-danger">
        Delete
      </button>
      <Link className="btn btn-primary" to={`/add-student/${id}`}>
        Edit
      </Link>
    </div>
  ) : null;
};

export default SingleStudent;