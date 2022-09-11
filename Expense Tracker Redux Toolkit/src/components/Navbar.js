import React from "react";
import Search from "./Search";
import searchImage from "../assets/images/search.svg";
import { useDispatch } from "react-redux";
import { setSortedBy, setType } from "../features/filter/filterSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const handleSortBy = (e) => {
    dispatch(setSortedBy(e.target.value));
  };
  return (
    <nav className="bg-slate-100 shadow-md lg:w-3/4 md:w-3/4 w-96">
      <div className="max-w-7xl mx-auto px-5 lg:px-0 lg:flex justify-center gap-5 items-center py-3">
        <div className="lg:flex lg:gap-5">
          <div className="flex items-center">
            <input
              defaultChecked
              id="all"
              type="radio"
              value="all"
              name="radio"
              onClick={() => dispatch(setType(""))}
              className="w-4 h-4 bg-gray-100 border-gray-300"
            />
            <label htmlFor="all" className="ml-2 text-sm font-medium">
              All
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="income"
              type="radio"
              value="income"
              name="radio"
              onClick={() => dispatch(setType("income"))}
              className="w-4 h-4 bg-gray-100 border-gray-300"
            />
            <label htmlFor="income" className="ml-2 text-sm font-medium">
              Income
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="expense"
              type="radio"
              value="expense"
              name="radio"
              onClick={() => dispatch(setType("expense"))}
              className="w-4 h-4 bg-gray-100 border-gray-300"
            />
            <label htmlFor="expense" className="ml-2 text-sm font-medium">
              Expense
            </label>
          </div>
        </div>
        <div className="border border-slate-200 flex items-center bg-white h-10 px-5 my-2 rounded-lg text-sm ring-emerald-200">
          <Search />
          <img
            className="inline h-4 cursor-pointer"
            src={searchImage}
            alt="Search"
          />
        </div>
        <div className="flex items-center">
          <p className="mr-3 font-bold">Sort by</p>
          <select name="sort" id="sort" className="p-2" onChange={handleSortBy}>
            <option value="">Default</option>
            <option value="name">Name</option>
            <option value="amount">Amount</option>
            <option value="itoe">{"Income > Expense"}</option>
            <option value="etoi">{"Expense > Income"}</option>
          </select>
        </div>
      </div>
    </nav>
  );
}
