import React, { useEffect, useState } from "react";
import NotVerified from "./accountVerificationComponents/NotVerified";
import Verified from "./accountVerificationComponents/Verified";
import { auth, getSingleDoc } from "../../../../assets/config/firebase";

const AccountVerification = () => {
  const [verified, setVerified] = useState(false);
  useEffect(() => {
    auth.currentUser && getSingleDoc("users",auth.currentUser.uid,(data)=>{
      if(data.permissionStatus === "allowed") setVerified(true)
    })
  }, []);
  return <div>{!verified ? <NotVerified /> : <Verified />}</div>;
};

export default AccountVerification;
