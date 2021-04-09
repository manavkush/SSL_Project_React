import React from 'react'
import './Card.css'
import Fade from "react-reveal/Fade"

function Card(props) {
    const {book_name, book_author, book_ISBN, book_genre, book_count} = props;
    return (
        <div className="card">
        <Fade delay={250}>
            <div className="card-info">
                <div className="card-content">Book Name: </div>{book_name}<br />
                <div className="card-content">Author: </div>{book_author}<br />
                <div className="card-content">Genre: </div>{book_genre}<br />
                <div className="card-content">ISBN: </div>{book_ISBN}<br />
                <div className="card-content">Count (Available) : </div>{book_count}<br />
            </div>
        </Fade>
        </div>
    )
}

export default Card
