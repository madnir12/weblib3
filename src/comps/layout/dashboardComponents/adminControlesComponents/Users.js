import React, { useEffect, useState } from "react";
import { getCollection, getDocsInCollection, updateDocField } from "../../../../assets/config/firebase";
import { objHas } from "../../../../assets/function";
import {BiSearch} from 'react-icons/bi'
const Users = () => {
  const [users, setUsers] = useState(null);
  const [details, setDetails] = useState(null)
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    getCollection("users",setUsers)
    // getDocsInCollection("users", "permissionStatus", "==", "pending", setUsers);
  }, []);
  return (
    <div className="px-10 py-10 main">
      <h4 className="pb-3 font-sans font-bold capitalize border-b-2 text-slate-800 border-b-green-800">
        Requested for verification
      </h4>
      <div className="flex flex-col gap-2 py-5 "> 
      {users !== null &&
        users.map(function (doc) {
          const { permissionStatus,userPhoto, userName, userEmail } = doc.data();
          if(permissionStatus === "pending") return (
            <>
              <div className="flex flex-col items-center justify-between gap-10 px-8 py-5 rounded-md md:flex-row bg-slate-200">
              <div className="flex items-center gap-10">
              <img
              className="w-12 rounded-full "
              src={userPhoto} alt="" />
              <div className="flex flex-col">
                <span className="block text-xl">{userName}</span>
                <span className="block text-xs text-slate-500">{userEmail}</span>
              </div>
              </div>
              <button
              onClick={()=> updateDocField("users",doc.id,{permissionStatus: "allowed"},()=> "")}
              className="
              bg-blue-500 text-white rounded-full py-1.5 px-6 hover:bg-blue-400
              "
              >Accept Request</button>
              </div>

            </>
          );
        })}
      </div>
      <h4 className="pb-3 font-sans font-bold capitalize border-b-2 text-slate-800 border-b-green-800">
        complete information of users
      </h4>
      <div className="flex w-full gap-5">
        <div className="w-3/4 users">
        <span className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-200">
          <BiSearch/>
          <input
          onChange={(e)=> setSearchValue(e.target.value)}
          className="bg-transparent border-none outline-none " type="text" placeholder="search" />
        </span>
        <div className="grid grid-cols-3 gap-5 py-5 "> 
      {users !== null &&
        users.filter((doc)=> searchValue !== "" ? objHas(doc.data(),searchValue) && doc : doc).map(function (doc) {
          const { permissionStatus,userPhoto, userName, userEmail } = doc.data();
          return (
            <>
              <div
              onClick={()=> setDetails(doc.data())}
              className="items-center px-8 py-5 rounded-md cursor-pointer bg-slate-200">
              <div className="flex items-center gap-10">
              <img
              className="w-12 rounded-full "
              src={userPhoto} alt="" />
              <div className="flex flex-col">
                <span className="block text-xl">{userName}</span>
                <span className="block text-xs text-slate-500">{userEmail}</span>
              </div>
              </div>
              </div>

            </>
          );
        })}
      </div>
        </div>
        <div className="w-1/4 p-5 details bg-slate-200">
        {details === null ? <h4 className="text-center">select a user</h4> : <>
        <div className="items-center justify-center bg-slate-200">
              <div className="flex items-center gap-10">
              <img
              className="w-12 rounded-full "
              src={details.userPhoto} alt="" />
              <div className="flex flex-col">
                <span className="block text-xl">{details.userName}</span>
                <span className="block text-xs text-slate-500">{details.userEmail}</span>
              </div>
              </div>
              </div>
              <div className="flex flex-col gap-5 py-10">
              {Object.keys(details).map((key) => (
         !["emailVR","userPhoto","userID"].includes(key) && <h4 key={key}>
          {key}: <span className="text-slate-500">{details[key]}</span>
        </h4>
      ))}
                
              </div>
        </>}
        </div>
      </div>
    </div>
  );
};

export default Users;
