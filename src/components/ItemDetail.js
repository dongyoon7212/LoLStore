import React, { useEffect, useState } from "react";
import { firestore, auth } from "../BE/firebase.js";
import { useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

function ItemDetail({ itemId }) {
  const [itemDetail, setItemDetail] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItemDetail = async () => {
      // console.log(itemId);
      try {
        const itemDoc = await getDoc(doc(firestore, "Tables", itemId));
        if (itemDoc.exists()) {
          setItemDetail(itemDoc.data());
        } else {
          // console.log("문서를 찾을 수 없습니다.");
        }
      } catch (error) {
        // console.error("데이터를 불러오는 중 오류 발생: ", error);
      }
    };

    fetchItemDetail();
  }, [itemId]);

  useEffect(() => {
    const checkLikedStatus = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(firestore, "Likes", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const likedItems = userDocSnapshot.data().likedItems || [];
          setIsLiked(likedItems.includes(itemId));
        }
      }
    };
    checkLikedStatus();
  }, [itemId]);

  const handleLikeToggle = async () => {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(firestore, "Likes", user.uid);

      if (isLiked) {
        // 좋아요 취소
        await updateDoc(userDocRef, {
          likedItems: arrayRemove(itemId),
        });
      } else {
        // 좋아요 추가
        await updateDoc(userDocRef, {
          likedItems: arrayUnion(itemId),
        });
      }

      setIsLiked((prev) => !prev);
    }
  };

  const handleGoBack = (e) => {
    navigate("/");
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
                <button
                  className="text-white bg-lolGold1 hover:bg-lolGold2 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mx-5"
                  onClick={handleLikeToggle}
                >
                  {isLiked ? "좋아요 취소" : "좋아요"}
                </button>
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
