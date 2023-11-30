import React from "react";

function SearchResult({ boardData }) {
  if (!boardData || boardData.length === 0) {
    return <p>검색 결과가 없습니다.</p>;
  }
  const board = boardData[0];
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden bg-itemBox">
        <div className="container px-5 py-24 mx-auto max-w-4xl border-8 border-itemBoxBorder">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-contain object-center rounded"
              src={board.imageUrl}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                ITEM NAME
              </h2>
              <h1 className="text-itemFontColor text-3xl title-font font-medium mb-1">
                {board.itemName}
              </h1>
              <span className="flex items-center">
                {/* property 추가 예정 */}
                <span className="text-itemFontColor text-xl">{board.type}</span>
              </span>
              <div className="flex mb-4"></div>
              <p className="leading-relaxed text-itemFontColor text-xl">
                {board.ability}
              </p>
              <p className="leading-relaxed text-itemFontColor mt-3 text-xl">
                {board.property}
              </p>
              <div className="flex mt-6 items-center pb-5 border-b-4 border-itemBoxBorder mb-5"></div>
              <div className="flex">
                <img
                  src="https://i.namu.wiki/i/fjKH80y7JBtWIVjtVv1P4mdRsrxisYqYiBJKMzGiiO0mt2gWcxq-z64VRKukH4WJ7gpuu9BlSit_Qa1jclDmAw.webp"
                  alt="price icon"
                  className="w-8 h-8"
                ></img>
                <span className="title-font font-medium text-2xl text-itemPriceColor">
                  {board.price}
                </span>
                {/* 하트버튼 */}
                {/* <button className="rounded-full w-10 h-10 float-right bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SearchResult;
