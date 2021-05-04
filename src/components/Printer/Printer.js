import React, { Component } from "react";
import OnImagesLoaded from "react-on-images-loaded";
import { Form, Button } from "react-bootstrap";
import "./Printer.css";
import Typing from "react-typist";

export default class Printer extends Component {
  constructor(props) {
    super(props);
    this.props.showLoader();
    this.state = {
      showImages: false,
      driveLink: "",
      color: "",
      paperSize: "",
      copies: 1,
      printOnBothSides: true,
      printDetails: "",
    };
  }

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   var requestOptions = {
  //     method: "POST",
  //     headers: {'Content-Type': 'application/json'},
  //     body: JSON.stringify({link: this.state.driveLink, color: this.state.color, })
  //   }
  // }

  render() {
    return (
      <OnImagesLoaded
        onLoaded={() => {
          this.props.hideLoader();
          this.setState({
            showImages: true,
          });
        }}
        onTimeout={() => {
          this.props.hideLoader();
          this.setState({
            showImages: true,
          });
        }}
      >
        <Typing cursor={{ show: false }}>
          <h1 class="print-heading">Hassle Free Printing</h1>
        </Typing>
        <div className="container">
          <form className="formClass" encType="multipart/form-data">
            <div className="form-group">
              <label for="uploadLink">Google Drive Link</label>
              <input
                className="form-control uploadText"
                type="text"
                name="uploadLink"
              />
            </div>
            <div className="form-group">
              <label for="printColor">Color</label>
              <select className="form-control colorInput" name="printColor">
                <option value="b/w">Black and White</option>
                <option value="color">Color</option>
              </select>
            </div>
            <div className="form-group">
              <label for="printSize">Size</label>
              <select className="form-control sizeInput" name="printSize">
                <option value="A3">A3</option>
                <option value="A4">A4</option>
                <option value="A5">A5</option>
              </select>
            </div>
            <div className="form-group">
              <label for="copies">No of Copies</label>
              <input
                className="form-control printCopies"
                type="text"
                name="copies"
              />
            </div>
            <div className="form-group">
              <label for="printBothSides">Print On Both Sides</label>
              <select className="form-control sideInput" name="printBothSides">
                <option value="Yes"> Yes </option>
                <option value="No"> No </option>
              </select>
            </div>
            <div className="form-group">
              <label for="printDetails">Print Details</label>
              <textarea
                className="form-control printDetails"
                rows="3"
                type="text"
                name="printDetails"
              />
            </div>
            <div className="form-group">
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </OnImagesLoaded>
    );
  }
}
