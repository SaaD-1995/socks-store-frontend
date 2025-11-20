import React from "react";

const Spinner = ({
  size = 24,
  color = "#ffffff",
  border = 3,
  speed = "animate-spin"
}) => {
  return (
    <div
      className={`${speed} rounded-full border-solid border-t-transparent`}
      style={{
        width: size,
        height: size,
        borderWidth: border,
        borderColor: color,
        borderTopColor: "transparent",
      }}
    ></div>
  );
};

export default Spinner;
