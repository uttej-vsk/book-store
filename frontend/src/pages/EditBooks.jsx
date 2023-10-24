import { useState, useEffect } from "react";
import BackButton from "../components/BackButton.jsx";
import Spinner from "../components/Spinner.jsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

function EditBooks() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function getBookById(id) {
      try {
        setLoading(true);
        const result = await axios.get(`http://localhost:5003/books/${id}`);
        setTitle(result.data.title);
        setAuthor(result.data.author);
        setPublishYear(result.data.publishYear);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("Cannot fetch books by Id", error);
      }
    }
    getBookById(id);
  }, []);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };

    if (Object.values(data).some((value) => value.trim() === "")) {
      setError(true);
      setTimeout(() => setError(false), 4000);
      return;
    }
    try {
      setError(false);
      axios.put(`http://localhost:5003/books/${id}`, data);
      setLoading(false);
      enqueueSnackbar(`You have updated the title ${title} successfully`, {
        variant: "success",
      });
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log("Cannot create new book", error);
    }
  };

  return (
    <>
      <div className="p-4">
        <BackButton />
        <h1 className="text-3xl my-4">Create new Book</h1>
        {loading ? <Spinner /> : ""}

        <div className="flex flex-col border-2 border-sky-500 rounded-xl w-[600px] p-4 mx-auto">
          <div className="my-4">
            <label htmlFor="" className="text-xl mr-4 text-gray-500">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="border-2 border-gray-500 px-4 py-2 w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your book title"
            />

            <label htmlFor="" className="text-xl mr-4 text-gray-500">
              Author
            </label>
            <input
              type="text"
              name="author"
              id="author"
              className="border-2 border-gray-500 px-4 py-2 w-full"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter your book title"
            />

            <label htmlFor="" className="text-xl mr-4 text-gray-500">
              Published Year
            </label>
            <input
              type="text"
              name="publishYear"
              id="publishYear"
              className="border-2 border-gray-500 px-4 py-2 w-full"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              placeholder="2023"
            />
          </div>
          <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
            Save
          </button>
          {error && (
            <div className="text-red-400 bg-black rounded-md p-2 w-full ml-auto">
              {" "}
              You cannot save empty form. Please enter all fields
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default EditBooks;
