import { firestore } from "../BE/firebase.js";
import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import SearchResult from "./SearchResult.js";

function GetBoard() {
  const [searchItemName, setsearchItemName] = useState("");
  const [boardData, setBoardData] = useState([]);

  const handleInputSearchDoc = (e) => {
    setsearchItemName(e.target.value);
  };

  const handleSearchDoc = (e) => {
    e.preventDefault();

    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "Tables"));
        const data = querySnapshot.docs
          .filter((doc) => doc.id === searchItemName) // "board"인 문서만 필터링
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        setBoardData(data);
        console.log("데이터 불러오기 성공: ", data);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생: ", error);
      }
    };

    fetchData(); // 비동기 함수를 호출
  };

  return (
    <div className="container mx-auto my-6 flex px-5 py-24 items-center justify-center flex-col text-2xl text-lolGold2">
      아이템 검색
      <form onSubmit={handleSearchDoc}>
        <div className="flex w-72 flex-col gap-6 my-6">
          <div className="relative h-10 w-full min-w-[200px]">
            <input
              className="peer h-full w-full rounded-[7px] border border-lolGold2 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-lolGold2 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-lolGold2 placeholder-shown:border-t-lolGold2 focus:border-2 focus:border-lolGold2 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
              type="text"
              name="searchItemName"
              value={searchItemName}
              onChange={handleInputSearchDoc}
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-lolGold2 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-lolGold2 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-lolGold2 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-lolGold2 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-lolGold2 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-lolGold2 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-lolGold2 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-lolGold2">
              찾을 아이템 이름
            </label>
          </div>
          <button
            className="middle none center rounded-lg bg-lolGold1 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-lolGold2/20 transition-all hover:shadow-lg hover:shadow-lolGold2/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true"
            type="submit"
          >
            검색
          </button>
        </div>
      </form>
      <SearchResult boardData={boardData} />
    </div>
  );
}

export default GetBoard;
