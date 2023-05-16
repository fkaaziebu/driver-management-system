import React from "react";

function FAQ() {
  return (
    <div className="container-lg py-4 px-sm-5 mb-5 border d-flex flex-column">
      <h3 className="text-center display-3 mb-5">Frequently Asked Questions</h3>
      <div className="accordion px-lg-5" id="accordionExample">
        <div className="accordion-items mb-1">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Accordion Item #1
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <strong>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Deleniti, quas.
              </strong>{" "}
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi
              delectus sed sint, perspiciatis impedit natus iure sapiente ipsam
              fugit nostrum facilis molestias unde tempora porro commodi,
              quaerat inventore voluptate quia!
            </div>
          </div>
        </div>
        <div className="accordion-items mb-1">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="true"
              aria-controls="collapseTwo"
            >
              Accordion Item #1
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse show"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <strong>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Deleniti, quas.
              </strong>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum
              laudantium ullam illo, nulla amet consectetur minima accusantium
              tenetur reiciendis? Error explicabo perferendis quos obcaecati
              tempore. Ipsam distinctio doloremque qui quos.
            </div>
          </div>
        </div>
        <div className="accordion-items mb-1">
          <h2 className="accordion-header" id="headingThree">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="true"
              aria-controls="collapseThree"
            >
              Accordion Item #1
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse show"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <strong>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Deleniti, quas.
              </strong>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo id,
              dignissimos minima perferendis earum fugit voluptatibus eius
              dolorum, doloremque aut consectetur soluta perspiciatis!
              Doloribus, nam laudantium aut sint consequatur minima.
            </div>
          </div>
        </div>
        <div className="accordion-items mb-1">
          <h2 className="accordion-header" id="headingFour">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="true"
              aria-controls="collapseFour"
            >
              Accordion Item #1
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse show"
            aria-labelledby="headingFour"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <strong>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Deleniti, quas.
              </strong>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo id,
              dignissimos minima perferendis earum fugit voluptatibus eius
              dolorum, doloremque aut consectetur soluta perspiciatis!
              Doloribus, nam laudantium aut sint consequatur minima.
            </div>
          </div>
        </div>
        <div className="accordion-items mb-1">
          <h2 className="accordion-header" id="headingFive">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFive"
              aria-expanded="true"
              aria-controls="collapseFive"
            >
              Accordion Item #1
            </button>
          </h2>
          <div
            id="collapseFive"
            className="accordion-collapse collapse show"
            aria-labelledby="headingFive"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <strong>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Deleniti, quas.
              </strong>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo id,
              dignissimos minima perferendis earum fugit voluptatibus eius
              dolorum, doloremque aut consectetur soluta perspiciatis!
              Doloribus, nam laudantium aut sint consequatur minima.
            </div>
          </div>
        </div>
        <div className="accordion-items mb-1">
          <h2 className="accordion-header" id="headingSix">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSix"
              aria-expanded="true"
              aria-controls="collapseSix"
            >
              Accordion Item #1
            </button>
          </h2>
          <div
            id="collapseSix"
            className="accordion-collapse collapse show"
            aria-labelledby="headingSix"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <strong>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Deleniti, quas.
              </strong>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo id,
              dignissimos minima perferendis earum fugit voluptatibus eius
              dolorum, doloremque aut consectetur soluta perspiciatis!
              Doloribus, nam laudantium aut sint consequatur minima.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
