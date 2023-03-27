import React from "react";

function Navbar() {
  return (
    <div className=" grid grid-cols-4 border-b border-indigo-600  h-[60px] justify-center    ">
      <div className="col-span-1 border-r border-indigo-600 h-[60px] flex justify-center items-center  ">
        <h1 className=" font-playfair text-3xl text-indigo-600 ">
          Manage Finances
        </h1>
      </div>
      <div className="col-span-2 border-r border-indigo-600 h-[60px]  items-center">
        <ul className="flex flex-row gap-8  justify-center font-roboto  text-indigo-600">
          <li>Products</li>
          <li>About the Developer</li>
          <li>about</li>
        </ul>
      </div>
      <div className="col-span-1 ">Navbar</div>
    </div>
  );
}

export default Navbar;
