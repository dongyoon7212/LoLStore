import { useEffect, useState } from "react";
import { firestore, auth } from "../BE/firebase.js";
import { getDoc, doc } from "firebase/firestore";
import ItemDetail from "./ItemDetail";

function LikeItemList() {
  const [, setLikedItems] = useState([]);
  const [itemDetails, setItemDetails] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    const fetchLikedItems = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDocRef = doc(firestore, "Likes", user.uid);
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const likedItems = userDocSnapshot.data().likedItems || [];
            setLikedItems(likedItems);
            // console.log("좋아요 목록 불러오기 성공: ", likedItems);

            // 각 아이템에 대한 정보를 가져오는 비동기 작업
            const itemDetailPromises = likedItems.map(async (itemId) => {
              const itemDocRef = doc(firestore, "Tables", itemId);
              const itemDocSnapshot = await getDoc(itemDocRef);
              return itemDocSnapshot.data();
            });

            // 모든 작업이 완료된 후에 결과를 업데이트
            const itemDetails = await Promise.all(itemDetailPromises);
            setItemDetails(itemDetails);
            // console.log("아이템 상세 정보 불러오기 성공: ", itemDetails);
          }
        } catch (error) {
        //   console.error("좋아요 목록을 불러오는 중 오류 발생: ", error);
        }
      }
    };

    fetchLikedItems();
  }, []);

  const handleItemClick = (item) => {
    // console.log(item); // 클릭한 아이템의 정보를 콘솔에 출력
    setSelectedItemId(item.id);
    setShowDetail(true);
  };

  const handleBackToList = () => {
    setSelectedItemId(null);
    setShowDetail(false);
  };

  return (
    <div className="h-screen">
      <section className="body-font h-full">
        <div className="container justify-center px-5 py-24 mx-auto">
          {showDetail ? (
            <ItemDetail itemId={selectedItemId} onBack={handleBackToList} />
          ) : (
            <div className="flex flex-wrap justify-center mx-auto gap-5">
              {itemDetails.map((item) => (
                <div
                  key={item.id} // 여기서 item의 id를 사용
                  className="p-4 bg-itemBox border-4 border-itemBoxBorder"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="block relative h-48 rounded overflow-hidden">
                    <img
                      alt="ecommerce"
                      className=" object-center object-contain w-full h-full block"
                      src={item.imageUrl}
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-itemFontColor text-xs tracking-widest title-font mb-1">
                      {item.type}
                    </h3>
                    <h2 className="text-itemFontColor title-font text-lg font-medium">
                      {item.itemName}
                    </h2>
                    <p className="mt-1 text-itemFontColor">${item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default LikeItemList;
