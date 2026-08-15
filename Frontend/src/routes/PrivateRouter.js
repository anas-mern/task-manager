import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import RedirectPage from "../pages/RedirectPage";
import { apiv1 } from "../constants/constants";

export default function PrivateRouter() {
  const token = localStorage.getItem("token");
  const [authorized, setAuthorized] = useState(null); // null: loading

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${apiv1}/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch (err) {
        setAuthorized(false);
      }
    };

    checkAuth();
  }, [token]);
  return authorized ? <Outlet /> : <RedirectPage />;
}
