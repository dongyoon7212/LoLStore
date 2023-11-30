import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../BE/firebase.js";
import { Link } from "react-router-dom";

function AddBoard() {
  const [formData, setFormData] = useState({
    itemName: "",
    price: "",
    contents: "",
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
      await setDoc(doc(firestore, "Tables", formData.itemName), {
        price: formData.price,
        contents: formData.contents,
        imageUrl: formData.imageUrl,
        itemName: formData.itemName,
      });
      alert("아이템 추가 성공");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="container mx-auto my-6 flex px-5 py-24 items-center justify-center flex-col text-2xl text-lolGold2">
      아이템 추가
      <form onSubmit={handleAddDocument}>
        <div className="flex w-72 flex-col gap-6 my-6">
          <div className="relative h-10 w-full min-w-[200px]">
            <input
              className="peer h-full w-full rounded-[7px] border border-lolGold2 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-lolGold2 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-lolGold2 placeholder-shown:border-t-lolGold2 focus:border-2 focus:border-lolGold2 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleInputChange}
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-lolGold2 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-lolGold2 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-lolGold2 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-lolGold2 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-lolGold2 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-lolGold2 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-lolGold2 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-lolGold2">
              아이템 이름
            </label>
          </div>
          <div className="relative h-10 w-full min-w-[200px]">
            <input
              className="peer h-full w-full rounded-[7px] border border-lolGold2 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-lolGold2 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-lolGold2 placeholder-shown:border-t-lolGold2 focus:border-2 focus:border-lolGold2 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-lolGold2 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-lolGold2 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-lolGold2 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-lolGold2 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-lolGold2 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-lolGold2 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-lolGold2 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-lolGold2">
              가격
            </label>
          </div>
          <div className="relative h-10 w-full min-w-[200px]">
            <input
              className="peer h-full w-full rounded-[7px] border border-lolGold2 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-lolGold2 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-lolGold2 placeholder-shown:border-t-lolGold2 focus:border-2 focus:border-lolGold2 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
              type="text"
              name="contents"
              value={formData.contents}
              onChange={handleInputChange}
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-lolGold2 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-lolGold2 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-lolGold2 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-lolGold2 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-lolGold2 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-lolGold2 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-lolGold2 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-lolGold2">
              아이템 상세 설명
            </label>
          </div>
          <div className="relative h-10 w-full min-w-[200px]">
            <input
              className="peer h-full w-full rounded-[7px] border border-lolGold2 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-lolGold2 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-lolGold2 placeholder-shown:border-t-lolGold2 focus:border-2 focus:border-lolGold2 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-lolGold2 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-lolGold2 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-lolGold2 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-lolGold2 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-lolGold2 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-lolGold2 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-lolGold2 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-lolGold2">
              이미지
            </label>
          </div>
          <button
            className="middle none center rounded-lg bg-lolGold1 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-lolGold2/20 transition-all hover:shadow-lg hover:shadow-lolGold2/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true"
            type="submit"
          >
            추가하기
          </button>
        </div>
      </form>
      <Link to="/">이전으로</Link>
    </div>
  );
}

export default AddBoard;
