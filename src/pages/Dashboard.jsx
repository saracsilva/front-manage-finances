import React, { useContext, useEffect, useState } from "react";
import FirstTime from "../components/FirstTime";
import { SessionContext } from "../contexts/session.context";
import FixedExpenses from "../components/FixedExpenses";

function Dashboard() {
  const { user } = useContext(SessionContext);
  const currentUser = user;
  const [finances, setFinances] = useState([]);
  const [greetings, setGreetings] = useState("");

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

      const date = new Date();

      const hour = date.getHours();
      if (hour < 12 && hour > 0) {
        setGreetings("Good Morning");
      } else if (hour > 12 && hour < 17) {
        setGreetings("Good Afternoon");
      } else {
        setGreetings("Good Night");
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <div className="grid grid-cols-12 h-full">
      <div className="col-span-2 border-r border-indigo-600 h-[100%] bg-white ">
        <h1 className=" text-4xl text-indigo-600 font-roboto  py-3.5">Menu</h1>
        <p className=" text-xl font-roboto"> please fill your fixed expanses</p>
        <FixedExpenses setFinances={setFinances} />
      </div>
      <div className="col-span-7 flex flex-col">
        {user && (
          <h1 className=" self-start text-6xl font-roboto text-indigo-600 p-20 ">
            {greetings}{" "}
            <span className="font-bold">{currentUser.firstName}</span>,
          </h1>
        )}
        {finances.length === 0 && (
          <>
            <FirstTime setFinances={setFinances} />
          </>
        )}
        {finances.length > 0 && (
          <div className="flex flex-row">
            <div className="max-w-md  overflow-hidden rounded-xl bg-white text-sm  shadow-3xl ring-1 ring-gray-900/5 flex flex-col text-indigo-600 font-roboto p-10  ml-20">
              <p className=" text-3xl text-dark-lilac">Your Bank Balance is</p>
              <h1 className=" text-5xl font-bold">{finances[0].totalValue}€</h1>
            </div>
            <div className="max-w-md  overflow-hidden rounded-xl bg-white text-sm  shadow-3xl ring-1 ring-gray-900/5 flex flex-col text-indigo-600 font-roboto p-10  ml-20">
              <p className=" text-3xl text-dark-lilac">
                Your Expanses in the last Week
              </p>
              <h1 className=" text-5xl font-bold">{finances[0].totalValue}€</h1>
            </div>
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
