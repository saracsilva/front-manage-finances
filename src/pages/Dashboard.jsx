import React, { useContext, useEffect, useState } from "react";
import { SessionContext } from "../contexts/session.context";

function Dashboard() {
  const { user } = useContext(SessionContext);
  const currentUser = user;
  const [finances, setFinances] = useState([]);

  const fetchFinances = async () => {
    try {
      const response = await fetch(
        `http://localhost:5005/${currentUser._id}/finances`
      );
      const parsed = await response.json();
      if (response.status === 200) {
        setFinances(parsed);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchFinances();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {user && (
        <h1>
          Hello {currentUser.firstName}, {console.log(finances)}
        </h1>
      )}
      {finances.length === 0 && <h1>First Time</h1>}
      {finances.length > 0 && <h1>Lets go</h1>}
    </>
  );
}

export default Dashboard;
