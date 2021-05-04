import React from "react";
import "./TeamCard.css";

const TeamCard = (props) => {
  return (
    <div class="teamcard__container col-12 col-sm-6 col-md-4 col-lg-3">
      <div class="our-team">
        <div class="picture">
          <img class="img-fluid" src={props.profile__image} />
        </div>
        <div class="team-content">
          <h3 class="name">{props.name}</h3>
          <h4 class="title">CSE Department</h4>
          <h4 class="title">{props.rollNo}</h4>
        </div>
        <ul class="social">
          <li><a href={props.link__github} class="fa fa-github" aria-hidden="true"></a></li>
          <li><a href={props.link__linkedin} class="fa fa-linkedin" aria-hidden="true"></a></li>
        </ul>
      </div>
    </div>
  );
};

export default TeamCard;
