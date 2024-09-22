import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Arrow({ direction, onClick }) {
  return (
    <span className="arrow" onClick={onClick}>
      <FontAwesomeIcon
        icon={direction === "left" ? faArrowLeft : faArrowRight}
      />
    </span>
  );
}

export default Arrow;
