import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <p>
          <PostAddIcon />
          CRM
        </p>
      </Link>
      <Link to="/dashboard">
        <p>
          <DashboardIcon />
          Dashboard
        </p>
      </Link>
      <Link to="/product/create">
        Create <AddIcon />
      </Link>

      <Link to="/dashboard">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/dashboard">
        <p>
          <PeopleIcon />
          Users
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
