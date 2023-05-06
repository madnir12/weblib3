import axios from 'axios';
// this function us to update doc fiield
export const updateDocField = (docId,fields,afterAction)=>{
    axios.post(`${window.location.href.includes("weblib3") ? process.env.REACT_APP_HOST_PATH : process.env.REACT_APP_LOCAL_PATH }/book/update-fields/${docId}`,fields)
.then((o)=>{
    afterAction(o)
}) // ends then
.catch((err)=>{
    console.log(err);
}) // ends catch
}// ends update doc field