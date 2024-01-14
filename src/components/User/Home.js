import React, { useEffect } from "react";
import "./Home.css";
import { clearErrors, getProducts } from "../../actions/productAction";
import MetaData from "../Layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import ProductCard from "../Product/ProductCard";

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { products, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProducts());
  }, [dispatch, alert, error]);

  return (
    <>
      <MetaData title="CRM - Home" />
      <h2 className="homeHeading">Home</h2>

      <div className="products">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </>
  );
};

export default Home;
