import React from "react";
import ButtonCustome from "./ButtonCustome";
import { Link } from "react-router-dom";

const ButtonViewMore = () => {
  return (
    <div>
      <Link to={"/menu"}>
        <ButtonCustome buttonText="Xem thêm" />
      </Link>
    </div>
  );
};

export default ButtonViewMore;
