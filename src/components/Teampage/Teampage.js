import React from "react";
import OnImagesLoaded from "react-on-images-loaded";
import team__image from "./teampg.svg";
import "./Teampage.css";
import TeamCard from "../Card/TeamCard";

class Teampage extends React.Component {
  constructor(props) {
    super(props);
    this.props.showLoader();
    this.state = {
      showImages: false,
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <OnImagesLoaded
        onLoaded={() => {
          this.props.hideLoader();
          this.setState({ showImages: true });
        }}
        onTimeout={() => {
          this.props.hideLoader();
          this.setState({ showImages: true });
        }}
        timout={7000}
      >
        <div
          className="teampage__container"
          style={{ opacity: this.state.showImages ? 1 : 0 }}
        >
          <h1 className="teampage__title">Our Team</h1>
          <img className="teampage__image" src={team__image} alt="teampage" />
          <div className="teampage_teamcards">
            <TeamCard
              name="Manav Kushwaha"
              rollNo={190010023}
              link__github="https://github.com/manavkush"
              link__linkedin="https://www.linkedin.com/in/manav-kushwaha/"
              profile__image="https://drive.google.com/uc?export=view&id=1g_oE_kYLL4N61zLwZCVpy-iracOEkysr"
            />
            <TeamCard
              name="Omkar Jadhav"
              rollNo={190010029}
              link__github="https://github.com/IamODJ"
              link__linkedin="https://www.linkedin.com/in/omkar-jadhav-56081a195/"
              profile__image="https://drive.google.com/uc?export=view&id=1k0w84Ejs2PlzY4xbDDIkqtt2agHvWL4G"
            />
            <TeamCard
              name="Pratik Jain"
              rollNo={190010034}
              link__github="https://github.com/jpratik15"
              link__linkedin="https://www.linkedin.com/in/pratik-manoj-jain-536855192/"
              profile__image="https://drive.google.com/uc?export=view&id=1wowZsPu9qqtqntddnx15q-T5ulKZoKEP"
            />
          </div>
        </div>
      </OnImagesLoaded>
    );
  }
}

export default Teampage;
