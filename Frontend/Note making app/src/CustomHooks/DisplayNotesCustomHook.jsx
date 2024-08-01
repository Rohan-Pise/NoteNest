import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { formState, notesState, updateState } from "../stateStore/atoms";
import axios from "axios";

export function useDisplayNotesCustomHook() {
  const [notes, setNotes] = useRecoilState(notesState);
  const [updateForm, setUpdateForm] = useRecoilState(updateState);

  useEffect(() => {
    fetchNotes();
  }, []); // to Run the fetchNotes function on start of program
 
  // functions

  //function ->1
  const fetchNotes = async () => {
    //Fetches the notes
    const res = await axios.get("http://localhost:3000/notes",{withCredentials:true});

    //Set to State
    setNotes(res.data.notes);
    console.log(res);
  };

  const deleteNote = async (_id) => {
    //Delete the Note
    const res = await axios.delete(`http://localhost:3000/notes/${_id}`,{withCredentials:true});
    console.log(res);

    //update the state
    const newNotes = [...notes].filter((note) => {
      return note._id !== _id;
    });
    setNotes(newNotes);
  };

  //function ->6 will run after clicking update btn
  const toggleUpdate = (note) => {
    //set state on update form
    setUpdateForm({ title: note.title, body: note.body, _id: note._id });
  };
  return {
    deleteNote,
    notes,
    setNotes,
    toggleUpdate,
    setUpdateForm,
    fetchNotes
  };
}


