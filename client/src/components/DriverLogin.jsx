import React from 'react'

const LoginForm = () => {
    return (
      <form>
        <fieldset className="d-flex flex-column">
          <legend className="fs-3 fw-bold mb-4">Signup as a driver below</legend>
          <div className="mb-3">
            <label for="email" className="form-label fs-5">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control fs-3"
              placeholder="john.doe@gmail.com"
            />
          </div>
          <div className="d-grid mt-3">
            <button className="btn btn-primary fs-4">Next</button>
          </div>
        </fieldset>
      </form>
    );

  };

function DriverLogin() {
  return (
 <div className="container d-flex flex-column flex-lg-row justify-content-center align-items-center py-2 my-2">
      <div className="vw-50 h-50">
        <h1 className="display-1 text-light">Drive with DMS</h1>
        <p className="text-light text-opacity-75 fs-2">Earn good money <em className="text-light fw-semibold">with your vehicle</em></p>
      </div>
      <div className="p-4 shadow-lg bg-light rounded-5">
        <LoginForm />
      </div>
    </div>
  )
}

export default DriverLogin
