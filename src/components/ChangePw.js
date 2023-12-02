import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  updatePassword,
  onAuthStateChanged,
  getAuth,
  signOut,
} from "firebase/auth";
import { auth } from "../BE/firebase.js";

function ChangePw() {
  const [newPassword, setNewPassword] = useState("");
  const [user, setUser] = useState({});
  const auth2 = getAuth();
  const navigate = useNavigate();
  //   const currentUser = auth2.currentUser;
  //   console.log(currentUser);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [user]);

  //   console.log(user);

  const handleNewPassword = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        updatePassword(user, newPassword);
        await signOut(auth2);
        alert("비밀번호 변경완료! 다시 로그인 해주세요.");
        navigate("/Login");
      } else {
        alert("로그인 하세요.");
        navigate("/Login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                비밀번호 변경
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    새로운 비밀번호
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={(event) => {
                      setNewPassword(event.target.value);
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-lolGold bg-lolGold1 hover:bg-lolGold2 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={handleNewPassword}
                >
                  비밀번호 변경
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ChangePw;
