import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
// eslint-disable-next-line
import Chart from "chart.js/auto";
import { Doughnut, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productAction.js";
import { dashboardAction } from "../../actions/dashBoardAction.js";

const Dashboard = () => {
  const dispatch = useDispatch();
  let outOfStock = 0;

  const { products } = useSelector((state) => state.products);
  const { carts: orders, users } = useSelector((state) => state.dashboard);
  products &&
    products.forEach((item) => {
      if (item.stock < 10) {
        outOfStock += 1;
      }
    });
  let totalAmount = 0;
  orders &&
    orders.carts.forEach((item) => {
      totalAmount += item.total;
    });
  useEffect(() => {
    dispatch(getProducts());
    dispatch(dashboardAction());
  }, [dispatch]);

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "Total Amount",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197,72,49)"],
        data: [0, totalAmount],
      },
    ],
  };
  const doughnutState = {
    labels: ["Out of Stock less than 10", "Full Stock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <div className="dashboard-C">
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount.toFixed(2)}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/dashboard">
              <p>Orders</p>
              <p>{orders && orders.carts.length}</p>
            </Link>
            <Link to="/dashboard">
              <p>Users</p>
              <p>{users && users.users.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
