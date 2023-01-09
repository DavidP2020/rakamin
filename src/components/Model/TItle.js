import React from "react";

const Title = ({ data, ...props }) => {
  return (
    <div>
      <div className={"title"}>
        <div>
          <span className={"title-text"}>{data.title}</span>
        </div>
        <div className={"title-month"}>
          <b>{data.description}</b>
        </div>
      </div>
    </div>
  );
};

export default Title;
