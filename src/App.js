import { Routes, Route } from "react-router-dom";
import GetBoard from "./components/GetBoard.js";
import Main from "./components/Main.js";
import "./App.css";
import AllBoard from "./components/AllBoard.js";
import Join from "./components/Join.js";
import Login from "./components/Login.js";
import ChangePw from "./components/ChangePw.js";
import Header from "./components/Header.js";
import LikeItemList from "./components/LikeItemList.js";
import ItemDetail from "./components/ItemDetail.js";

function App() {
  return (
    <div className="w-full h-screen jumbotron">
      <Header />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/AllBoard" element={<AllBoard />}></Route>
        <Route path="/GetBoard" element={<GetBoard />}></Route>
        <Route path="/Join" element={<Join />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/ChangePw" element={<ChangePw />}></Route>
        <Route path="/LikeItemList" element={<LikeItemList />}></Route>
        <Route path="/ItemDetail" element={<ItemDetail />}></Route>
      </Routes>
    </div>
  );
}

export default App;
