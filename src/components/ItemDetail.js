import React, { useEffect, useState } from "react";
import { firestore } from "../BE/firebase.js";
import { doc, getDoc } from "firebase/firestore";

function ItemDetail({ itemId }) {
  const [itemDetail, setItemDetail] = useState(null);

  useEffect(() => {
    const fetchItemDetail = async () => {
      try {
        const itemDoc = await getDoc(doc(firestore, "Tables", itemId));
        if (itemDoc.exists()) {
          setItemDetail(itemDoc.data());
        } else {
          console.log("문서를 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생: ", error);
      }
    };

    fetchItemDetail();
  }, [itemId]);

  const handleGoBack = () => {
    // 페이지 새로고침
    window.location.reload();
  };

  if (!itemDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto max-w-4xl border-8 bg-itemBox border-itemBoxBorder">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-contain object-center rounded"
              src={itemDetail.imageUrl}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                ITEM NAME
              </h2>
              <h1 className="text-itemFontColor text-3xl title-font font-medium mb-1">
                {itemDetail.itemName}
              </h1>
              <span className="flex items-center">
                {/* property 추가 예정 */}
                <span className="text-itemFontColor text-xl">
                  {itemDetail.type}
                </span>
              </span>
              <div className="flex mb-4"></div>
              <p className="leading-relaxed text-itemFontColor text-xl">
                {itemDetail.ability}
              </p>
              <p className="leading-relaxed text-itemFontColor mt-3 text-xl">
                {itemDetail.property}
              </p>
              <div className="flex mt-6 items-center pb-5 border-b-4 border-itemBoxBorder mb-5"></div>
              <div className="flex">
                <img
                  src="https://i.namu.wiki/i/fjKH80y7JBtWIVjtVv1P4mdRsrxisYqYiBJKMzGiiO0mt2gWcxq-z64VRKukH4WJ7gpuu9BlSit_Qa1jclDmAw.webp"
                  alt="price icon"
                  className="w-8 h-8"
                ></img>
                <span className="title-font font-medium text-2xl text-itemPriceColor">
                  {itemDetail.price}
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
          <button
            onClick={handleGoBack}
            className="middle none center rounded-lg bg-lolGold1 py-3 px-6 float-right font-sans text-xl font-bold uppercase text-white shadow-md shadow-lolGold2/20 transition-all hover:shadow-lg hover:shadow-lolGold2/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true"
          >
            이전으로
          </button>
        </div>
      </section>
    </div>
  );
}

export default ItemDetail;
