import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

function ShowBooks() {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const { id } = useParams();

  useEffect(() => {
    async function getBooks() {
      try {
        setLoading(true);
        const results = await axios.get(`http://localhost:5003/books/${id}`);
        setBook(results.data);
        setLoading(false);
      } catch (error) {
        enqueueSnackbar("There is an error displying books", {
          variant: "error",
        });
        console.log("Error fetching data", error);
      }
    }
    getBooks();
  }, [id]);

  return (
    <div>
      <BackButton />
      <h1 className="text-3xl my-4">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[100%] p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id</span>
            <span>{book._id}</span>
          </div>

          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title</span>
            <span>{book.title}</span>
          </div>

          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Author</span>
            <span>{book.author}</span>
          </div>

          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Published Year</span>
            <span>{book.publishYear}</span>
          </div>

          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Created At</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowBooks;
