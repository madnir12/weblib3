
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { signOut, updateProfile, signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getDoc, collection, addDoc, getFirestore, doc, setDoc, query, where, getDocs, arrayRemove,updateDoc, onSnapshot } from "firebase/firestore";
import { MdPrivateConnectivity } from "react-icons/md";
import { getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-u4wg4zaaUXRcU1u4JScumTULz-dGXKM",
  authDomain: "web-library-abfd7.firebaseapp.com",
  projectId: "web-library-abfd7",
  storageBucket: "gs://web-library-abfd7.appspot.com",
  // storageBucket: "web-library-abfd7.appspot.com",
  messagingSenderId: "82374180136",
  appId: "1:82374180136:web:d60e833ad334381144e41d",
  measurementId: "G-3JZWR7RE93"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();
// Create a storage reference from our storage service
const bookCoversRef = ref(storage,"bookCovers");
// ---------- Functions -----------
export const signinWidthGoogle = () => {
  const provider = new GoogleAuthProvider(app);

  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      let myObj = {
        userName: user.displayName,
        userID: getProfile().profileID,
        userPhoto: user.photoURL,
        userEmail: user.email,
        emailVR: user.emailVerified,
        phoneNumber: user.phoneNumber,
        country: "null",
        city: "null"


      }
      setNewDoc("users", getProfile().profileID, myObj)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}
// geting user profile 
export const getProfile = () => {
  const loginUser = auth.currentUser;
  if (loginUser !== null) {
    // The user object has basic properties such as display name, email, etc.
    const displayName = loginUser.displayName;
    const email = loginUser.email;
    const photoURL = loginUser.photoURL;
    const emailVerified = loginUser.emailVerified;


    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    const uid = loginUser.uid;
    return {
      profileName: displayName,
      profilePhoto: photoURL,
      profileEmail: email,
      profileVR: emailVerified,
      profileID: uid
    }
  }

}
// ends geting user profile 
// this function will update user profile to initial user detail, name will be user profile image will be blanck profile image
export const updateProfileToInitialValues = () => {

  updateProfile(auth.currentUser, {
    displayName: "none",
    photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCvIQEdbJs-ZGwXXa5GRQqd8qDGlQaUEaolA&usqp=CAU"
  }).then(() => {

  }).catch((error) => {

    // An error occurred
    // ...
  });

} // ends fuction to update inithal user profile
// this function will use to logout user
export const handleLogout = () => {
  signOut(auth).then(() => {
  }).catch((error) => {
    // An error happened.
  });
} // ends handle logout method
// ----------- firestore -----------
export const createNewCollection = async (collectionName, docObject) => { // this method will create new collection in firstore,first parameter use as collection name and second use as document
  try {
    const docRef = await addDoc(collection(db, collectionName), docObject);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
} // ends method create new collection
export const setNewDoc = async (collection, docName, docOject) => { // function use to set a new doc in firestore
  await setDoc(doc(db, collection, docName), docOject);
  console.log("created successfull")
} // ends setNewDoc
export const getSingleDoc = async (collection, docName, setState) => { // this method use to get a single doc from firestore
  const docRef = doc(db, collection, docName);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    setState(docSnap.data())
  } else {
    // doc.data() will be undefined in this case
    setState("No such document!");
  }
}
export const addNewDoc = async (collectionName, docObj,after) => {
  try {
    await addDoc(collection(db, collectionName), docObj);
    after()
  } catch (e) {

  }
} // endws adddoc method
export const getDocsInCollection = (collectionName, keyName, conditionalOperator, valueName, setter) => {
  try {
    const q = query(collection(db, collectionName), where(keyName, conditionalOperator, valueName));
    onSnapshot(q, (querySnapshot) => {
      setter(querySnapshot.docs.map((doc) => doc));
    })
  } catch (error) {
    console.log(error)
  }
} // ends getDocsInCollection method
export const updateDocField = (collectionName,docID,docWantsToAdd,{action})=>{
  const docRef = doc(db, collectionName, docID);

      //Atomically add a new region to the "regions" array field.
        try{
          updateDoc(docRef,docWantsToAdd).then((responce)=>{
            action()
          })
        }catch (error) {
          
        }
        
     
     
} // ends add in arry method
// -----x----- firestore -----------
// ---------- storage ----------
export const uploadImageFile = (fileName,file,action)=>{
  const fullRef = ref(bookCoversRef,fileName);
  uploadBytes(fullRef, file).then((snapshot) => {
    action(snapshot);
  }).catch((err)=>{
    console.log(err);
  });
} // ends uploadImageFile
// -----x----- storage ----------
// -----x----- Functions ----------
