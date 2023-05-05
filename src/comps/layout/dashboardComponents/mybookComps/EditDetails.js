import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
const EditDetails = () => {
  const [details, setDetails] = useState(null),
    location = useLocation();
  useEffect(() => {
    axios(
      `${
        !window.location.href.includes("localhost")
          ? process.env.REACT_APP_HOST_PATH
          : process.env.REACT_APP_LOCAL_PATH
      }/book/${location.pathname.split("/dashboard/mybook/e/")[1]}`
    ).then((o) => {
      setDetails(
        (y) =>
          (y = {
            image: o.data.bookCover,
            name: o.data.name,
            visibility: o.data.visibility,
            categories: o.data.categories,
          })
      );
    });
    // getSingleDoc("books_array",location.pathname.split("/dashboard/mybook/")[1],setSingleBookData)
  }, []);
  return <div className="p-6">
          <img src={details.image} alt="" className="w-40" />
          <input type="text" className="border" />
  </div>;
};

export default EditDetails;
