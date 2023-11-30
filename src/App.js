import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SetBoard from "./components/SetBoard.js";
import UpdateBoard from "./components/UpdateBoard.js";
import GetBoard from "./components/GetBoard.js";
import DeleteBoard from "./components/DeleteBoard.js";
import Main from "./components/Main.js";
import "./App.css";
import AllBoard from "./components/AllBoard.js";

function App() {
  return (
    <div>
      <BrowserRouter>
        <header className="text-gray-600 body-font jumbotron">
          <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <Link
              to="/"
              className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
            >
              <img
                src="https://i.namu.wiki/i/Q2yS7PKGww04abPtNFHLS8npW_L0evvVmQkxqB0iRWA934Ecsea8rZPVZwh0eKJhj_quAfgLTCusaHCa4XVU2w.webp"
                className="w-16 h-16 text-white p-2 rounded-full"
                alt="icon"
              ></img>
              <span className="ml-3 text-white text-2xl">롤 상점</span>
            </Link>
            <nav className="md:ml-auto md:mr-auto text-2xl text-white flex flex-wrap items-center justify-center ">
              <Link to="/SetBoard" className="mr-5 hover:text-lolGold1">
                아이템 추가
              </Link>
              <Link to="/UpdateBoard" className="mr-5 hover:text-lolGold1">
                아이템 수정
              </Link>
              <Link to="/AllBoard" className="mr-5 hover:text-lolGold1">
                아이템 모두보기
              </Link>
              <Link to="/GetBoard" className="mr-5 hover:text-lolGold1">
                아이템 검색
              </Link>
              <Link to="/DeleteBoard" className="mr-5 hover:text-lolGold1">
                아이템 삭제
              </Link>
            </nav>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/SetBoard" element={<SetBoard />}></Route>
          <Route path="/UpdateBoard" element={<UpdateBoard />}></Route>
          <Route path="/AllBoard" element={<AllBoard />}></Route>
          <Route path="/GetBoard" element={<GetBoard />}></Route>
          <Route path="/DeleteBoard" element={<DeleteBoard />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
