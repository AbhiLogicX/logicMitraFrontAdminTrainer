import React from "react";
import { Link } from "react-router-dom";

const QuaterlyEarningsCard = ({ data, detailChange }) => {
  return (
    <>
      <h1 className="text-2xl text-white mb-2">Quaterly Earnings Detail</h1>
      <hr className="border-2 border-amber-400 mb-2" />
      <div className="text-white">
        <h5 className="mb-1">Total Earnings of </h5>
        <div className="flex gap-2 mb-3">
          <select
            onChange={detailChange}
            name="quater"
            className="form-select  input focus-within:bg-none focus:border-none outline-none text-white py-[10px]"
          >
            <option value={1}>(JAN-MAR)</option>
            <option value={2}>(APR-JUN)</option>
            <option value={3}>(JUL-SEP)</option>
            <option value={4}>(OCT-MAR)</option>
          </select>
          <select
            onChange={detailChange}
            name="year"
            className="form-select  input focus-within:bg-none focus:border-none outline-none text-white py-[10px]"
          >
            <option value={2023}>2023</option>
            <option value={2024}>2024</option>
          </select>
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <h2 className="text-4xl text-amber-400 mb-3">
              ₹{data?.data?.summary?.debit + data?.data?.summary?.credit}/-
            </h2>
            <Link to={"/transactions"}>
              <button className="Add-btn py-2 px-3 rounded-md hover:bg-emerald-600">
                View Details
              </button>
            </Link>
          </div>
          <hr className="border-2 border-amber-400 mb-2" />
          <div className="flex gap-3">
            <div>
              <h5 className="mb-1">Paid ammount</h5>
              <h2 className="text-2xl text-lime-200 mb-3">₹0/-</h2>
            </div>
            <div>
              <h5 className="mb-1">Due ammount</h5>
              <h2 className="text-2xl text-red-600 mb-3">₹0/-</h2>
            </div>
          </div>
          <hr className="border-2 border-amber-400 mb-2" />
          <div className="flex gap-3">
            <div>
              <h5 className="mb-1">Total Enquries </h5>
              <h4 className="text-2xl">1</h4>
            </div>
            <div>
              <h5 className="mb-1">Total Enquries </h5>
              <h4 className="text-2xl">1</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuaterlyEarningsCard;
