import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddStudent = () => {
  const { id } = useParams();

  const [isLoad, setIsLoad] = useState(true);

  const [validationMessage, setValidationMessage] = useState();

  const navigate = useNavigate();

  const [startYear, setStartYear] = useState();
  const [schoolId, setSchoolId] = useState();
  const [educationNumber, setEducationNumber] = useState();
  const [name, setName] = useState();
  const [department, setDepartment] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      startYear === "" ||
      schoolId === "" ||
      educationNumber === "" ||
      name === "" ||
      department === ""
    ) {
      setValidationMessage("All inputs are required.");
      return;
    }

    if (!id) {
      fetch("https://localhost:7261/api/Diak/AddStudent", {
        method: "POST",
        body: JSON.stringify({
          startYear: startYear,
          schoolId: schoolId,
          educationNumber: educationNumber,
          name: name,
          department: department,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response)
        .then(() => {
          navigate("/");
        })
        .catch(console.error);
    } else {
      fetch(`https://localhost:7261/api/Diak/UpdateStudent?id=${id}`, {
        method: "PUT",
        body: JSON.stringify({
          startYear: startYear,
          schoolId: schoolId,
          educationNumber: educationNumber,
          name: name,
          department: department,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response)
        .then(() => {
          navigate("/");
        })
        .catch(console.error);
    }
  };

  useEffect(() => {
    if (!id) {
      setStartYear("");
      setSchoolId("");
      setEducationNumber("");
      setName("");
      setDepartment("");

      setIsLoad(false);
      return;
    }

    fetch(`https://localhost:7261/api/Diak/GetStudentById?id=${id}`)
      .then((response) => response.json())
      .then((student) => {
        setStartYear(student.startYear);
        setSchoolId(student.schoolId);
        setEducationNumber(student.educationNumber);
        setName(student.name);
        setDepartment(student.department);
      })
      .catch(console.error)
      .finally(() => setIsLoad(false));
  }, [id]);

  return !isLoad ? (
    <form onSubmit={handleSubmit} className="container mt-3">
      <div className="input-group mb-3">
        <span className="input-group-text">Start Year</span>
        <input
          type="text"
          value={startYear}
          onChange={(event) => setStartYear(event.target.value)}
          className="form-control"
        />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text">SchoolId</span>
        <input
          type="number"
          value={schoolId}
          onChange={(event) => setSchoolId(event.target.value)}
          className="form-control"
        />
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text">Education Num.</span>
        <input
          type="text"
          value={educationNumber}
          onChange={(event) => setEducationNumber(event.target.value)}
          className="form-control"
        />
      </div>
      <div class="input-group mb-3">
        <span className="input-group-text">Name</span>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="form-control"
        />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text">Department</span>
        <input
          type="text"
          value={department}
          onChange={(event) => setDepartment(event.target.value)}
          className="form-control"
        />
      </div>
      <div className="text-danger">
        {validationMessage}
      </div>
      <button
        className="btn btn-primary"
        type="submit"
        style={{ width: 100, float: "right" }}
      >
        {id ? "Edit" : "Add"}
      </button>
    </form>
  ) : (
    <div>Loading...</div>
  );
};

export default AddStudent;
