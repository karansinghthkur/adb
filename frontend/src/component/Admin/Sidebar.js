import React, { useState } from "react";
import "./sidebar.css";
import logo from "../../images/logos.png";
import { Link, useHistory } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";

const Sidebar = () => {
  const history = useHistory();
  const [expanded, setExpanded] = useState(["1"]); // Keep the Books node expanded by default

  const handleBookClick = (path) => {
    history.push(path);
  };

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="Ecommerce" />
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <div className="treeview-wrapper">
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
          expanded={expanded}
          onNodeToggle={handleToggle}
        >
          <TreeItem nodeId="1" label="Books" className="tree-item">
            <TreeItem
              nodeId="2"
              label="All"
              icon={<PostAddIcon />}
              onClick={() => handleBookClick("/admin/books")}
              className="tree-sub-item"
            />
            <TreeItem
              nodeId="3"
              label="Create"
              icon={<AddIcon />}
              onClick={() => handleBookClick("/admin/book")}
              className="tree-sub-item"
            />
          </TreeItem>
        </TreeView>
      </div>
      <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
