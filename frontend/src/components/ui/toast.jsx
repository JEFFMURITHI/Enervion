import * as React from "react";

export const toast = ({ message, type = "info" }) => {
  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-blue-500";

  return (
    <div className={`${bgColor} text-white p-3 rounded-md shadow-md`}>
      {message}
    </div>
  );
};
