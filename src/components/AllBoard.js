import { useEffect, useState } from "react";
import { firestore } from "../BE/firebase.js";
import { collection, getDocs } from "firebase/firestore";

function AllBoard() {
  const [boardData, setBoardData] = useState([]);

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
  }, []); // useEffect를 빈 배열을 dependency로 사용하여 한 번만 실행되도록 설정
  return (
    <div>
      <section className="text-gray-600 body-font min-h-screen bg-lolGold1">
        <div className="container justify-center px-5 py-24 mx-auto">
          <div className="flex flex-wrap gap-4">
            {boardData.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-itemBox border-4 border-itemBoxBorder"
              >
                <a
                  href="#"
                  className="block relative h-48 rounded overflow-hidden"
                >
                  <img
                    alt="ecommerce"
                    className=" object-center object-contain w-full h-full block"
                    src={item.imageUrl} // 이미지 소스를 가져와서 출력
                  />
                </a>
                <div className="mt-4">
                  <h3 className="text-itemFontColor text-xs tracking-widest title-font mb-1">
                    {item.type}
                  </h3>
                  <h2 className="text-itemFontColor title-font text-lg font-medium">
                    {item.itemName} {/* 데이터에서 title 값을 가져와서 출력 */}
                  </h2>
                  <p className="mt-1 text-itemFontColor">${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AllBoard;
