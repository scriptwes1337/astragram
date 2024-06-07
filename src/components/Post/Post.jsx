import React, { useState } from "react";

export const Post = ({ data }) => {
  const [displayMore, setDisplayMore] = useState(false);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center border border-secondary my-4">
      <div className="row w-100">
        <div
          className="col-12 px-4 py-3 text-white"
          style={{
            backgroundColor: "rgb(35,35,35)",
            fontSize: "1.3rem",
          }}
        >
          {data.title}
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <img
            src={data.thumbnail_url ? data.thumbnail_url : data.url}
            className="img-fluid"
            style={{ width: "700px", maxHeight: "800px" }}
          ></img>
        </div>
      </div>
      <div className="row w-100" style={{ maxWidth: "700px" }}>
        <div
          className="col-12 px-4 py-3"
          style={{
            backgroundColor: "rgb(35,35,35)",
            color: "white",
            fontSize: "1rem",
          }}
        >
          <p className="text-warning">
            <i className="bi bi-person-circle"></i>{" "}
            {!data.copyright
              ? "National Aeronautics and Space Administration"
              : data.copyright}
          </p>
          <p>
            {displayMore
              ? `${data.explanation} `
              : `${data.explanation.split("").slice(0, 150).join("")}... `}
            {displayMore ? (
              <span
                className="text-secondary"
                style={{ cursor: "click" }}
                onClick={() => setDisplayMore(false)}
              > Show less
              </span>
            ) : (
              <span
                className="text-secondary"
                style={{ cursor: "click" }}
                onClick={() => setDisplayMore(true)}
              > Show more
              </span>
            )}
          </p>
          <p className="text-secondary">
            {new Date(data.date).toLocaleDateString("en-SG", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};
