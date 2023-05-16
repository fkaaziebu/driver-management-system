import React from "react";
import Map1 from "../../assets/map-1.jpg";
import Map2 from "../../assets/map-2.jpg";
import Map3 from "../../assets/map-3.png";


function Operation() {
  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
    >
      <div className="container d-flex justify-content-center align-items-center my-10">
        <div className="container d-flex flex-column justify-content-center align-items-center">
          <h2 className="display-4">How DMS works?</h2>
          <div className="d-flex flex-column flex-md-row justify-content-center">
            <div className="d-flex flex-column align-items-center m-3 w-100">
              <h3>Accept the request</h3>
              <img className="rounded-circle img-fluid mt-4 h-100 w-100 border border-5 border-primary" src={Map1} alt="Map-1" />
            </div>
            <div className="d-flex flex-column align-items-center m-3 w-100">
              <h3>Pickup the client</h3>
              <img className="rounded-circle img-fluid mt-4 h-100 w-100 border border-5 border-primary" src={Map1} alt="Map-2" />
            </div>
            <div className="d-flex flex-column align-items-center m-3 w-100">
              <h3>Drive to destination</h3>
              <img className="rounded-circle img-fluid mt-4 h-100 w-100 border border-5 border-primary" src={Map1} alt="Map-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Operation;
