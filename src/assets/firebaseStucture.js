import { getProfile } from "./config/firebase"
export const newBook = (name,visibility)=>{
   const book = {
          name: name, // use to store book name provieded by auther
          autherId: getProfile().profileID, // use to store auther's id which provides when auther registered
          autherName: getProfile().profileName, // use to store auther's name
          autherPhoto: getProfile().profilePhoto, // use to store auther image
          visibility: visibility, // use to store book visibility status, if status is published any one can read this book, else only auther can see or edit, also user can give access to a specific user
          otherUsers: [ // use to store use to store users those have given access by the auther
          ],
          bookCreatedAt: new Date(), // use to store created date
          // lastEditAt: new Date(), // use to store last edit date
          categories: [], // use to store book related categories
          pages: [
                    
          ],
          numberOfPages: 0,
          bookCover: "https://raw.githubusercontent.com/madnir12/images/main/blank-book-cover.jpg",

}     
  return book;    
} // ends new books function
