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
      search_input: "",
      showImages: false,
      searchReady: true,
      bookData: [],
    };
    // Initially showing all books
    fetch("https://library-management-ssl.herokuapp.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ book_name: "" }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ bookData: data.Books });
      });
  }

  handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === "NumpadEnter") {
      this.handleSearch(event);
    }
  };

  handleSearch = (event) => {
    let searchText = document.getElementById("searchQuery");
    console.log(searchText.value);
    event.preventDefault();
    var requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ book_name: searchText.value }),
    };
    // console.log(requestOptions);

    fetch("https://library-management-ssl.herokuapp.com/search", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ bookData: data.Books });
      });
  };

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
                id="searchQuery"
                onKeyDown={this.handleKeyDown}
              />
              <button
                type="submit"
                className="search-button"
                onClick={this.handleSearch}
              >
                <i class="fa fa-search"></i>
              </button>
            </div>
          </div>
          <div className="search-results">
            <h3>Here are your search results</h3>
            <CardList books={this.state.bookData} />
          </div>
          <div className="search-image"></div>
        </div>
      </OnImagesLoaded>
    );
  }
}

export default LibStud;
