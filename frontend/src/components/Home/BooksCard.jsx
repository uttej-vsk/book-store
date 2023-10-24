import Card from "./Card";

function BooksCard({ books }) {
  console.log(books);
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4">
      {books.map((book) => (
        <Card book={book} key={book._id} />
      ))}
    </div>
  );
}

export default BooksCard;
