import React, { useContext, useEffect, useState } from "react";
import FirstTime from "../components/FirstTime";
import { SessionContext } from "../contexts/session.context";
import FixedExpenses from "../components/FixedExpenses";

function Dashboard() {
  const { user } = useContext(SessionContext);
  const currentUser = user;
  const [finances, setFinances] = useState([]);
  const [time, setTime] = useState("");

  const fetchFinances = async () => {
    try {
      const response = await fetch(
        `http://localhost:5005/${currentUser._id}/finances/past-week`
      );
      const parsed = await response.json();
      console.log(parsed, "parsed");
      setFinances(parsed);
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
    if (user) {
      fetchFinances();
      const now = new Date();
      const date = new Date();

      const hour = date.getHours();
      const timeString = now.toLocaleTimeString();

      setTime(hour, timeString);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <div className="grid grid-cols-12 h-full">
      <div className="col-span-2 border-r border-indigo-600 h-[100%] bg-white ">
        <h1 className=" text-4xl text-indigo-600 font-roboto  py-3.5">Menu</h1>
      </div>
      <div className="col-span-7">
        {user && (
          <h1>
            Hello {currentUser.firstName}, {console.log(finances)},{" "}
            {console.log(time)}
          </h1>
        )}
        {finances.length === 0 && (
          <>
            <FirstTime setFinances={setFinances} />
          </>
        )}
        {finances.length > 0 && (
          <div>
            <h1 className=" text-3xl">
              You total Balance is {finances[0].totalValue}
            </h1>
            <p className=" text-xl font-roboto">
              {" "}
              please fill your fixed expanses
            </p>
            <FixedExpenses setFinances={setFinances} />
          </div>
        )}
      </div>
      <div className="col-span-3 border-r border-indigo-600 h-[100%] bg-white o">
        Test
      </div>
    </div>
  );
}

export default Dashboard;
