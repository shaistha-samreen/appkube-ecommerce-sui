'use client'
import React, { useEffect, useState } from "react";
import ProductCards from "../home/ProductCards";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

// import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";


const SaveForlater = () => {
const [products, setProducts] = useState([]);
const dispatch = useDispatch()
  const [filteredProducts, setFilteredProducts] = useState([]);

  const saveForlater = useSelector(state => state.saveForLaterSlice.saveForLater);



  const handleSearch = (query) => {
    // Filter products based on search query
    const filteredProducts = saveForlater.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filteredProducts);
  };

  return (
    <>
      {/* <Header onSearch={handleSearch} /> */}

      <main className="container-fluid w-[90%] min-h-[100vh] bg-[#E8E8E8] rounded shadow flex flex-col justify-start gap-6 ">
        <div className="flex justify-between p-3 items-center">
          <h1 className="md:text-2xl font-bold text-base ">Save For Later Products</h1>
          <div className="flex justify-between p-2 items-center gap-2">
            {/* <a href="#" className="text-sm sm:text-lg underline lg:font-bold">
              View All
            </a> */}
            <div className="sm:p-2 shadow p-1 bg-white rounded-md active:bg-transparent hover:bg-transparent">
              <FaChevronLeft />
            </div>
            <div className="sm:p-2 shadow p-1 bg-white rounded-md active:bg-transparent hover:bg-transparent">
              <FaChevronRight />
            </div>
          </div>
        </div>
        <div className="container-fluid flex justify-evenly items-center gap-3 flex-wrap mb-3">
          {/* Render ProductCards based on filtered products */}
          {filteredProducts.length > 0
            ? filteredProducts.map((product) => (
                <ProductCards key={product.id} data={product} />
              ))
            : products.map((product) => (
                <ProductCards key={product.id} data={product} />
              ))}
        </div>
      </main>
    </>
  );
};

export default SaveForlater;
