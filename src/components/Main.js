import React from "react";

function Main() {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <img
            className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
            alt="leagueoflegends"
            src="https://www.leagueoflegends.com/static/logo-1200-04b3cefafba917c9c571f9244fd28a1e.png"
          />
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="title-font sm:text-4xl text-4xl mb-4 my-10 font-medium text-gray-900">
              소환사 협곡에 오신 걸 환영합니다.
            </h1>
            <div className="flex justify-center"></div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Main;
