import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import "./App.css";
import StudentsList from "./pages/students-list/StudentsList";
import AddStudent from "./pages/add-student/AddStudent"
import SingleStudent from "./pages/single-student/SingleStudent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<StudentsList />} />
          <Route path="add-student" element={<AddStudent />}/>
          <Route path="add-student/:id" element={<AddStudent />}/>
          <Route path="single-student/:id" element={<SingleStudent/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;