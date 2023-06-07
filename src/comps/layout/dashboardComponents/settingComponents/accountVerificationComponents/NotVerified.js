import React, { useEffect, useState } from "react";
import RegisterForm from "./notVerifiedConponents/RegisterForm";
import { auth, getSingleDoc } from "../../../../../assets/config/firebase";
import Pending from "./notVerifiedConponents/Pending";
const NotVerified = () => {
  const [user, setUser] = useState(null);
  const [display, setDisplay] = useState("alert");
  const handleFetch = () => {
    auth.currentUser &&
      getSingleDoc("users", auth.currentUser.uid, (data) => {
        setUser(data);
      });
  };
  useEffect(() => {
    handleFetch();
  }, []);
  return user !== null && user.permissionStatus === undefined ? (
    <>
      {/* alert message  */}
      <div className={`transition-all duration-400  gap-2 bg-red-400 rounded-md
   items-center justify-between  md:flex-row  ${display === "alert" ? "w-full flex flex-col px-5 py-5 md:px-16" : "w-0 overflow-hidden h-0"}` }>
  <div className="message text-white">
    You are currently unverified, which means you are unable to publish any book at the moment.
  </div>
  <button
    onClick={() => setDisplay("register")}
    className="text-white bg-blue-600 hover:bg-blue-500 py-2 px-6 rounded-md"
  >
    Apply Now
  </button>
</div>

      {/* register form  */}
      <div className={`
       transition-all duration-400 delay-400 overflow-hidden ${
        display === "alert" ? 'h-0' : "h-70"
       }
      `}>
        <h3 className=" font-bold">Provide Your Details</h3>
        <RegisterForm handleFetch={handleFetch} />
      </div>
    </>
  ) : (
    <Pending />
  );
};

export default NotVerified;
