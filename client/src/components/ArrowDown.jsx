import React from "react";

function ArrowDown() {
  return (
    <div className="container d-flex justify-content-center mt-lg-3 pt-lg-2">
      <a href="#info-driver-app">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="86"
          height="86"
          fill="currentColor"
          className="bi bi-chevron-down"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </a>
    </div>
  );
}

export default ArrowDown;
