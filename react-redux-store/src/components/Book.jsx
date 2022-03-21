import { Card } from "react-bootstrap";
import Scene from "./Scene";

const Book = ({ book, changeBook, bookSelected }) => (
  <Card
    className={bookSelected?.id === book.id ? "border-thick mt-3" : "mt-3"}
    onClick={() => changeBook(book)}
    style={{ cursor: "pointer" }}
  >
    <Card.Body className="d-flex">
      <Scene />
      <div>
        <Card.Text className="font-weight-bold">{book.title}</Card.Text>
        <p>{book.price}</p>
      </div>
    </Card.Body>
  </Card>
);

export default Book;
