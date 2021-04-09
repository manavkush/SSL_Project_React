import React from 'react'
import './Card.css'
import Fade from "react-reveal/Fade"

function Card(props) {
    const {book_name, book_author, book_ISBN, book_genre, book_count} = props;
    return (
        <div className="card">
        <Fade delay={250}>
            <div className="card-info">
                <div className="card-content">Book Name: {book_name}</div>
                <div className="card-content">Author: {book_author}</div>
                <div className="card-content">Genre: {book_genre}</div>
                <div className="card-content">ISBN: {book_ISBN}</div>
                <div className="card-content">Count (Available) : {book_count}</div>
            </div>
        </Fade>
        </div>
    )
}

export default Card
