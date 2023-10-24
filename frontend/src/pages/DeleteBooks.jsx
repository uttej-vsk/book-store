import { useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import { useSnackbar } from "notistack";

function DeleteBooks() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  async function handleDelete(id) {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5003/books/${id}`);
      setLoading(false);
      enqueueSnackbar("Book has been deleted", { variant: "success" });
      navigate("/");
    } catch (error) {
      setLoading(false);
      enqueueSnackbar("There is an error deleting this book", {
        variant: "error",
      });
      console.log("Error deleting the book", error);
    }
  }
  return (
    <div className="p-4">
      <BackButton />
      <h1>Delete Books</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-500 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are you sure, you want to delete?</h3>
        <button
          onClick={() => handleDelete(id)}
          className="p-4 bg-red-600 text-white m-8 w-full"
        >
          Yes, Delete It
        </button>
      </div>
    </div>
  );
}

export default DeleteBooks;
