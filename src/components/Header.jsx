import { Youtube } from "lucide-react";
import React, { useContext, useState } from "react";
import { AppContext } from "../App";

const Header = ({ option }) => {
  const { setUrl } = useContext(AppContext);
  
  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };
  return (
    <header className=" bg-red-700 h-[80px] w-full flex justify-center items-center px-6">
      <div className="w-4/5 flex justify-between items-center px-6">
        <h3 className=" text-2xl font-bold text-white tracking-wider">
          lectureNotes
        </h3>
        <div className="flex justify-center items-center gap-4">
          <div className=" border bg-white p-2 rounded flex justify-center items-center gap-2 hover:border-2">
            <Youtube className="text-red-700" />
            <input
              className=" focus:outline-none "
              placeholder="Insert video URL here"
              type="text"
              name="videoUrl"
              id="videoUrl"
              onChange={(e) => handleUrlChange(e)}
            />
          </div>
          <div className="relative">
            <button
              className="text-gray-200 text-2xl text-center rounded-full"
              onClick={option}
            >
              ⋮
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
