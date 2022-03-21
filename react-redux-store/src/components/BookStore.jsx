import { Component, useState } from "react";
import BookList from "./BookList";
import BookDetail from "./BookDetail";
import { Col, Row } from "react-bootstrap";
import Scene from "./Scene";
import {data} from "./Data"

function BookStore() {
  const [books, setBooks] = useState([{data}])
  const [bookSelected, setBookSelected] = useState(null)

  const changeBook = (book) => setBookSelected({ bookSelected: book });

 
    return (
      <Row>
        <Col md={4}>
          <BookList
            bookSelected={bookSelected}
            changeBook={changeBook}
            books={books}
          />
        </Col>
        <Col md={8}>
          <BookDetail
            bookSelected={bookSelected}
            data={books}
          />
        </Col>
      </Row>
    );
  }


export default BookStore;
