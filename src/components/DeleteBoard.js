import { useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../BE/firebase";
import { Link } from "react-router-dom";

function DeleteBoard() {
  const [deleteItemName, setdeleteItemName] = useState("");

  const handleInputDeleteBoard = (e) => {
    setdeleteItemName(e.target.value);
  };

  const handleDeleteBoard = async (e) => {
    e.preventDefault();
    try {
      // 문서 추가
      await deleteDoc(doc(firestore, "Tables", deleteItemName));

      console.log("Document deleted successfully!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleDeleteBoard}>
        <label>
          삭제할 아이템
          <input
            type="text"
            name="deleteItemName"
            value={deleteItemName}
            onChange={handleInputDeleteBoard}
          ></input>
        </label>
        <button type="submit">삭제</button>
      </form>
      <Link to="/">메인화면</Link>
    </div>
  );
}
export default DeleteBoard;
