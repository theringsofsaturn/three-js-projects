import Book from "./Book";
import Scene from "./Scene";
import { data } from "./Data";

const BookList = ({ books, changeBook, bookSelected }) => (
  <div>
    {data.object.map((book) => (
      <>
        <Book
          key={book.id}
          book={book}
          changeBook={changeBook}
          bookSelected={bookSelected}
        />
      </>
    ))}
  </div>
);

export default BookList;
