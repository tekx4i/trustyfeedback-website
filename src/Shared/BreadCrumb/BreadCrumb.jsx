import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ active, title, extra }) => {
  return (
    <div>
      <nav style={{ "--bs-breadcrumb-divider": "'>'" }} aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          {extra && (
            <li className="breadcrumb-item" aria-current="page">
              <Link to="/">{extra}</Link>
            </li>
          )}
          <li className="breadcrumb-item active" aria-current="page">
            {active}
          </li>

          {title && (
            <li className="breadcrumb-item active" aria-current="page">
              {title}
            </li>
          )}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
