import React from "react";
import "./LibStud.css";
import Fade from "react-reveal/Fade";
import Typist from "react-typist";
import OnImagesLoaded from "react-on-images-loaded";
import CardList from "../CardList/CardList";

class LibStud extends React.Component {
  constructor(props) {
    super(props);
    this.props.showLoader();
    this.state = {
      showImages: false,
      searchReady: true,
      bookData: [],
    };
  }
  handleSearch = (event) => {};

  render() {
    return (
      <OnImagesLoaded
        onLoaded={() => {
          this.setState({ showImages: true });
          this.props.hideLoader();
        }}
        onTimeout={() => {
          this.setState({ showImages: true });
          this.props.hideLoader();
        }}
      >
        <div
          className="libstud"
          style={{ opacity: this.state.showImages ? 1 : 0 }}
        >
          <div className="search-bar">
            <div className="search-title">
              <h3>
                <Typist>Look up a book!</Typist>
              </h3>
            </div>

            <div className="search">
              <input
                type="text"
                className="search-text"
                placeholder="What are you looking for?"
              />
              <button type="submit" className="search-button">
                <i class="fa fa-search"></i>
              </button>
            </div>
          </div>
          <div className="search-results">
            <h3>Here are your search results</h3>
            <CardList
              books={[{ book_name: "Hello" }, { book_name: "Hello" }]}
            />
          </div>
          <div className="search-image"></div>
        </div>
      </OnImagesLoaded>
    );
  }
}

export default LibStud;
