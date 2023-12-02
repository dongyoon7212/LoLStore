import React, { useEffect, useState } from "react";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  const logout = async () => {
    await signOut(auth);
    setIsLoggedIn(false);
    navigate("/");
  }; // 🔥 4

  const handleAllBoardClick = (event) => {
    event.preventDefault();
    if (!isLoggedIn) {
      alert("로그인이 필요한 서비스 입니다.");
      navigate("/Login");
    } else if (isLoggedIn) {
      navigate("/AllBoard");
    }
  };

  const handleGetBoardClick = (event) => {
    event.preventDefault();
    if (!isLoggedIn) {
      alert("로그인이 필요한 서비스 입니다.");
      navigate("/Login");
    } else if (isLoggedIn) {
      navigate("/GetBoard");
    }
  };

  const handleLikeListClick = (event) => {
    event.preventDefault();
    if (!isLoggedIn) {
      alert("로그인이 필요한 서비스 입니다.");
      navigate("/Login");
    } else if (isLoggedIn) {
      navigate("/LikeItemList");
    }
  };
  return (
    <div>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            to="/"
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <img
              src="https://i.namu.wiki/i/Q2yS7PKGww04abPtNFHLS8npW_L0evvVmQkxqB0iRWA934Ecsea8rZPVZwh0eKJhj_quAfgLTCusaHCa4XVU2w.webp"
              className="w-16 h-16 text-lolGold p-2 rounded-full"
              alt="icon"
            ></img>
            <span className="ml-3 text-lolGold text-2xl hover:text-lolGold1">
              롤 상점
            </span>
          </Link>
          <nav className="w-fit md:ml-auto md:mr-auto text-2xl text-lolGold flex flex-wrap items-center ">
            <Link
              to="/AllBoard"
              className="mr-5 hover:text-lolGold1"
              onClick={handleAllBoardClick}
            >
              아이템 모두보기
            </Link>
            <Link
              to="/GetBoard"
              className="mr-5 hover:text-lolGold1 float-right"
              onClick={handleGetBoardClick}
            >
              아이템 검색
            </Link>
          </nav>
          {isLoggedIn ? (
            <>
              {/* 로그인 상태일 때 */}
              <div className="text-xl ml-11 text-lolGold">
                {auth.currentUser.email}
              </div>

              <Link
                to="/LikeItemList"
                className="inline-flex items-center bg-lolGold1 border-0 mx-4 py-1 px-3 focus:outline-none hover:bg-lolGold2 text-lolGold rounded text-xl mt-4 md:mt-0"
                onClick={handleLikeListClick}
              >
                좋아요 리스트
              </Link>
              <Link to="/ChangePw" className="mr-5 hover:text-lolGold1">
                <button className="inline-flex items-center bg-lolGold1 border-0 py-1 px-3 focus:outline-none hover:bg-lolGold2 text-lolGold rounded text-xl mt-4 md:mt-0">
                  회원정보
                </button>
              </Link>
              <button
                onClick={logout}
                className="inline-flex items-center bg-lolGold1 border-0 mx-5 py-1 px-3 focus:outline-none hover:bg-lolGold2 text-lolGold rounded text-xl mt-4 md:mt-0"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              {/* 로그아웃 상태일 때 */}
              <Link to="/Login" className="mr-5 hover:text-lolGold1">
                <button className="inline-flex items-center bg-lolGold1 border-0 py-1 px-3 focus:outline-none hover:bg-lolGold2 text-lolGold rounded text-xl mt-4 md:mt-0">
                  로그인
                </button>
              </Link>
              <Link to="/Join" className="mr-5 hover:text-lolGold1">
                <button className="inline-flex items-center bg-lolGold1 border-0 py-1 px-3 focus:outline-none hover:bg-lolGold2 text-lolGold rounded text-xl mt-4 md:mt-0">
                  회원가입
                </button>
              </Link>
            </>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
