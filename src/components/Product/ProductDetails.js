import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails
} from "../../actions/productAction";
import { useParams } from "react-router-dom";
import { Loader } from "../Layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../Layout/MetaData";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Rating,
} from "@mui/material";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { id } = useParams();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, alert, error]);

  const options = {
    size: "large",
    value: product.rating,
    precision: 0.5,
    readOnly: true,
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${product.title}--ECOMMERCE`} />
          <div className="ProductDetails">
            <div>
              <div>
                <Carousel>
                  {product.images &&
                    product.images.map((item, i) => (
                      <img
                        className="CarouselImage"
                        key={i}
                        src={item}
                        alt={`${i} Slide`}
                      />
                    ))}
                </Carousel>
              </div>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.title}</h2>
                <p>Product # {product.id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">Reviews</span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>

                <p>
                  Status:
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={submitReviewToggle}>
                Cancel
              </Button>
              <Button color="primary" onClick={reviewSubmitHandler}>
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
};

export default ProductDetails;
