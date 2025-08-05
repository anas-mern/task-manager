import AddTask from "../components/AddTask";
import NavBar from "../components/NavBar";
import TaskContainer from "../components/TaskContainer";
import { TaskProvider } from "../context/TasksContext";

function HomePage() {
  return (
    <TaskProvider>
      <div className="page min-vh-100">
        <NavBar />
        <AddTask />
        <TaskContainer />
      </div>
    </TaskProvider>
  );
}

export default HomePage;
