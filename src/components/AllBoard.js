import { useEffect, useState } from "react";
import { firestore } from "../BE/firebase.js";
import { collection, getDocs } from "firebase/firestore";
import ItemDetail from "./ItemDetail";

function AllBoard() {
  const [boardData, setBoardData] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "Tables"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBoardData(data);
        console.log("데이터 불러오기 성공: ", data);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생: ", error);
      }
    };

    fetchData();
  }, []);

  const handleItemClick = (itemId) => {
    setSelectedItemId(itemId);
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
              {boardData.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-itemBox border-4 border-itemBoxBorder"
                  onClick={() => handleItemClick(item.id)}
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

export default AllBoard;
