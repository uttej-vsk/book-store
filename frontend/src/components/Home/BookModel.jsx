import { AiOutlineClose } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { PiBookOpenTextLight } from "react-icons/pi";

function BookModel({ book, onClose }) {
  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative"
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer "
          onClick={onClose}
        />

        <h2 className=" px-4 py-1 w-fit rounded-lg bg-red-300">
          {book.publishYear}
        </h2>
        <h4 className="my-4 text-gray-500 flex justify-start">
          Book ID - {book._id}
        </h4>

        <div className="flex justify-start items-center gap-x-2">
          <PiBookOpenTextLight className="text-red-300 text-2xl" />
          <h2 className="my-1">{book.title}</h2>
        </div>

        <div className="flex justify-start items-center gap-x-2">
          <BiUserCircle className="text-red-300 text-2xl" />
          <h2 className="my-1">{book.author}</h2>
        </div>

        <div className="flex justify-start flex-col items-start gap-x-2 mt-4">
          <p className="bold underline">Description</p>
          <p className="my-2 items-start justify-start">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
            tincidunt vel ex nec varius. Pellentesque turpis mauris, condimentum
            id facilisis ut, luctus ut purus. Sed non elit vestibulum,
            consectetur libero id, mattis mi. Nunc congue, justo non luctus
            ullamcorper, justo orci luctus diam, sed elementum enim sem quis
            dolor. Cras ultrices, sapien sit amet dapibus suscipit, mauris est
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookModel;
