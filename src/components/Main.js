import React from "react";
import { firestore } from "../BE/firebase.js";
import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import ItemDetail from "./ItemDetail.js";

function Main() {
  const [searchItemName, setsearchItemName] = useState("");
  const [boardData, setBoardData] = useState([]);
  const [itemId, setItemId] = useState(null);
  const [showItemDetail, setShowItemDetail] = useState(false);

  const handleInputSearchDoc = (e) => {
    setsearchItemName(e.target.value);
  };

  const handleSearchDoc = async (e) => {
    e.preventDefault();

    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "Tables"));
        const data = querySnapshot.docs
          .filter((doc) => doc.id === searchItemName)
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        setBoardData(data);
        console.log("데이터 불러오기 성공: ", data);

        if (data.length > 0) {
          setItemId(data[0].id);
          setShowItemDetail(true);
        } else {
          // 만약 검색 결과가 없다면 itemId를 null로 설정합니다.
          setItemId(null);
          setShowItemDetail(false);
        }
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생: ", error);
      }
    };

    fetchData();
  };

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div
          className={`container mx-auto flex px-5 py-24 items-center justify-center flex-col ${
            showItemDetail ? "hidden" : ""
          }`}
        >
          <img
            className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
            alt="leagueoflegends"
            src="https://www.leagueoflegends.com/static/logo-1200-04b3cefafba917c9c571f9244fd28a1e.png"
          />
          <div className="text-center lg:w-2/3 justify-center w-full">
            <h1 className="title-font sm:text-4xl text-4xl mb-4 my-10 font-medium text-lolGold">
              소환사 협곡에 오신 걸 환영합니다.
            </h1>
            <form onSubmit={handleSearchDoc}>
              <div className="flex flex-row item-center gap-6 my-10">
                <div className="relative h-10 w-5/6 min-w-[200px] ">
                  <input
                    className="peer h-full w-full rounded-[7px] border border-lolGold border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-lolGold outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-lolGold placeholder-shown:border-t-lolGold focus:border-2 focus:border-lolGold focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" "
                    type="text"
                    name="searchItemName"
                    value={searchItemName}
                    onChange={handleInputSearchDoc}
                    autoComplete="off"
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-lolGold transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-lolGold before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-lolGold after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-lolGold peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-lolGold peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-lolGold peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-lolGold peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-lolGold">
                    찾을 아이템 이름
                  </label>
                </div>
                <button
                  className="middle none center rounded-lg bg-lolGold1 w-1/6 font-sans text-sm font-bold uppercase text-white shadow-md shadow-lolGold/20 transition-all hover:shadow-lg hover:shadow-lolGold/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  data-ripple-light="true"
                  type="submit"
                >
                  검색
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-10">{showItemDetail && <ItemDetail itemId={itemId} />}</div>
      </section>
    </div>
  );
}

export default Main;
