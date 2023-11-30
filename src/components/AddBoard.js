import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../BE/firebase.js";
import { Link } from "react-router-dom";

function AddBoard() {
  const [formData, setFormData] = useState({
    itemName: "",
    price: "",
    imageUrl: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddDocument = async (e) => {
    e.preventDefault(); // 폼 제출 기본 동작 방지
    try {
      // 문서 추가
      const docRef = await addDoc(collection(firestore, "Tables"), {
        price: formData.price,
        imageUrl: formData.imageUrl,
        itemName: formData.itemName,
      });
      console.log("Document written with ID: ", docRef.id);
      console.log("Document added successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div>
      문서 추가해보기 id자동생성됨 add
      <form onSubmit={handleAddDocument}>
        <label>
          아이템이름 :
          <input
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          가격 :
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          이미지 :
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Add</button>
      </form>
      <Link to="/">메인화면</Link>
    </div>
  );
}

export default AddBoard;
