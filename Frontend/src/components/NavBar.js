import { useContext } from "react";
import { AuthContext } from "../context/auth";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = () => {
    setAuth(null);
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate("/register");
  };
  return (
    <nav className="d-flex bg-primary align-items-center flex-wrap p-2 mb-3">
      {auth && (
        <div className="d-flex align-items-center justify-content-around flex-grow-1">
          <p className="m-0 text-white">Hello, {JSON.parse(localStorage.getItem('user')).username}</p>
          <Button variant="danger" onClick={logout}>
            Logout
          </Button>
        </div>
      )}
    </nav>
  );
}
