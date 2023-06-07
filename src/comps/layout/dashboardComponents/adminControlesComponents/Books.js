import React, { useEffect, useState, useContext } from "react";
import MyContext from "../../../../context/MyContext";
import { IoMdCloudDownload } from "react-icons/io";
import { downloadFile, handleOnContextMenu } from "../../../../assets/function";
import { auth } from "../../../../assets/config/firebase";
import { useNavigate } from "react-router-dom";
import ContextMenu from "../../ContextMenu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiTwotoneDelete } from "react-icons/ai";
import { getSingleDoc } from "../../../../assets/function";
import DeletePopup from "../../DeletePopup";
const Books = () => {
  const navigate = useNavigate();
  const [bookId, setBookId] = useState();
  const [deleteMessageDisplay, setDeleteMessageDisplay] = useState(false)
  const { deleteBook } = useContext(MyContext);
  useEffect(() => {
    auth.currentUser !== null &&
      auth.currentUser.email !== "aneesriaz984@gmail.com" &&
      navigate("/login");
  },[]);
  const options = [
    {
      value: "Delete",
      icon: <AiTwotoneDelete />,
      action: ()=> setDeleteMessageDisplay(true),
    },
  ];
  return (
    <div>
      <MyContext.Consumer>
        {(value) => {
          return (
            <>
              <div className="admin-books-container">
                {value.bookMetaContent.length < 1 ? (
                  <h4>Loading...</h4>
                ) : (
                  value.bookMetaContent.map((doc,index) => {
                    const { bookCover, name, _id } = doc;
                    return (
                      <div
                        key={index}
                        className="book"
                        onContextMenu={(event) => {
                          setBookId(_id);
                          handleOnContextMenu(event);
                        }}
                      >
                        <div className="info">
                          <img src={bookCover} alt={name} />
                          <span className="urdu">{name}</span>
                          <span>Id: {_id}</span>
                        </div>
                        <div className="actions">
                          <h4
                            onClick={() => downloadFile(getSingleDoc(_id))}
                            className="download center"
                          >
                            <IoMdCloudDownload /> Download
                          </h4>
                          <span
                            className="target-menu"
                            onClick={(event) => handleOnContextMenu(event)}
                          >
                            <BsThreeDotsVertical />
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
                <ContextMenu options={options} />
              </div>
              <span
              style={{display: deleteMessageDisplay ? "block" : "none" }}
              >
              <DeletePopup
              message="Are you sure you want to delete this item?"
              onDelete={() =>{
                deleteBook(bookId);
                setDeleteMessageDisplay(false);
              }}
              onCancel={()=> setDeleteMessageDisplay(false)}
              />
              </span>
              
            </>
          );
        }}
      </MyContext.Consumer>
    </div>
  );
};

export default Books;
