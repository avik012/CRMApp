import React, { Fragment, useEffect, useState } from "react";
import "./Product.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProducts } from "../../actions/productAction.js";
import { useAlert } from "react-alert";
import { Loader } from "../Layout/Loader/Loader.js";
import ProductCard from "./ProductCard.js";
import { Link, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import MetaData from "../Layout/MetaData.js";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstant.js";

const categories = [
  "smartphones",
  "laptops",
  "fragrances",
  "skincare",
  "groceries",
  "home-decoration",
  "furniture",
  "tops",
  "womens-dresses",
  "womens-shoes",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "womens-watches",
  "womens-bags",
  "womens-jewellery",
  "sunglasses",
  "automotive",
  "motorcycle",
  "lighting",
];

const Product = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [currentPage, setCurrentPage] = useState(1);
  const { products, loading, error, productsCount } = useSelector(
    (state) => state.products
  );
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const {
    error: deleteError,
    isDeleted,
    delProduct,
  } = useSelector((state) => state.delProduct);

  const prevPageClick = () => {
    if (currentPage === 1) setSkip(0);

    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setSkip(currentPage * limit);
    }
  };
  const nextPageClick = () => {
    if (currentPage * limit < productsCount) {
      setSkip(currentPage * limit);
      setCurrentPage(currentPage + 1);
    }
  };

  const { keyword } = useParams();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      console.log(delProduct);
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(getProducts(keyword, category, limit, skip));
  }, [
    dispatch,
    isDeleted,
    delProduct,
    deleteError,
    keyword,
    category,
    alert,
    error,
    skip,
    limit,
  ]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="PRODUCTS" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end pagination">
            <button
              onClick={prevPageClick}
              className="btn btn-primary me-md-2"
              type="button"
            >
              Prev
            </button>
            <div>{currentPage}</div>
            <button
              onClick={nextPageClick}
              className="btn btn-primary"
              type="button"
            >
              Next
            </button>
          </div>

          <div className="filterBox">
            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <Link className="btn btn-primary btn-sm" to={"/product/create"}>
              Create Product
            </Link>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default Product;
