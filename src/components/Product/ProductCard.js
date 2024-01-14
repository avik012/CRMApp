import { Button, Rating } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteProduct } from "../../actions/productAction";
import { useDispatch } from "react-redux";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const options = {
    size: "small",
    value: product.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <>
      <div className="productCardContainer">
        <Link className="productCard" to={`/products/${product.id}`}>
          <img src={product.images[0]} alt={product.name} />
          <p>{product.title}</p>
          <div>
            <Rating {...options} />{" "}
            <span className="productCardSpan"> ({product.rating} Reviews)</span>
          </div>
          <span>{`₹${product.price}`}</span>
        </Link>
        <div className="edit-btn">
          <Link to={`/product/update/${product.id}`}>
            <EditIcon />
          </Link>

          <Button
            onClick={() => {
              console.log("params.id", product.id);
              deleteProductHandler(product.id);
            }}
          >
            <DeleteIcon />
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
