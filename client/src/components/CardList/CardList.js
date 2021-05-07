import React from 'react'
import './CardList.css'
import Card from "../Card/Card"

function CardList({books}) {
    return (
        <div className="search-content">
            {
                books.map((book)=> (
                    <Card 
                        book_name={book.book_name}
                        book_ISBN={book.book_ISBN}
                        book_author={book.book_author}
                        book_genre={book.book_genre}
                        book_count={book.book_count}
                    />
                ))
            }
        </div>
    )
}

export default CardList
