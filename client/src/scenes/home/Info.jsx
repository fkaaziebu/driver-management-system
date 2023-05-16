import React from "react";

function Info() {
  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      id="info-driver-app"
    >
      <div className="container d-flex justify-content-center align-items-center my-10">
        <div className="container d-flex flex-column justify-content-center align-items-center">
          <h2 className="display-4">Why DMS?</h2>
          <div className="d-flex flex-column flex-md-row justify-content-center">
            <div className="d-flex flex-column align-items-center m-2 w-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="106"
                height="106"
                fill="currentColor"
                className="bi bi-bar-chart-fill text-primary m-4"
                viewBox="0 0 16 16"
              >
                <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z" />
              </svg>
              <h3>Earn money</h3>
              <p className="mt-3 text-muted fs-5 text-center">Drive with DMS and earn extra income.</p>
            </div>
            <div className="d-flex flex-column align-items-center m-2 w-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="106"
                height="106"
                fill="currentColor"
                className="bi bi-stopwatch text-primary m-4"
                viewBox="0 0 16 16"
              >
                <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z" />
                <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z" />
              </svg>
              <h3>Drive anytime</h3>
              <p className="mt-3 text-muted fs-5 text-center">Work with your own schedule. No minimum hours and no boss.</p>
            </div>
            <div className="d-flex flex-column align-items-center m-2 w-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="106"
                height="106"
                fill="currentColor"
                className="bi bi-coin text-primary m-4"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z" />
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
              </svg>
              <h3>No monthly fees</h3>
              <p className="mt-3 text-muted fs-5 text-center">No risk, you only pay when you earn.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
