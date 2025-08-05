import React from "react";
import EditTask from "../components/EditTask";
import NavBar from "../components/NavBar";

function EditPage() {
  return (
    <div className="page min-vh-100 pt-5">
      <NavBar />
      <EditTask />
    </div>
  );
}

export default EditPage;
