import Link from "next/link";
import { useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import { addToCart } from "../../store/Actions";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineScience } from "react-icons/md";

const ProductItem = ({ product, handleCheck }) => {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth } = state;

  const userLink = () => {
    return (
      <>
        <Link href={`product/${product._id}`}>
          <button className=" bg-[#1a237e] hover:bg-[#FFA500] w-[136.83px] py-2 rounded-full text-white ">
            <div className="flex items-center justify-center px-auto ">
              <IoDocumentTextOutline></IoDocumentTextOutline>
              <div className="mr-1"></div> ดูข้อมูล
            </div>
          </button>
        </Link>
        <button className="bg-[#FFA500] hover:bg-[#1a237e] px-3 py-2 rounded-full text-white">
          <div className="flex items-center justify-center px-auto ">
            <MdOutlineScience></MdOutlineScience>
            <div className="mr-1"></div> จองเครื่องมือ
          </div>
        </button>
      </>
    );
  };

  const adminLink = () => {
    return (
      <>
        <Link href={`/Admin/createProduct/${product._id}`}>
          <a className="btn btn-info" style={{ marginRight: "5px", flex: 1 }}>
            แก้ไขข้อมูล
          </a>
        </Link>
        <button
          className="btn btn-danger"
          style={{ marginLeft: "5px", flex: 1 }}
          data-toggle="modal"
          data-target="#exampleModal"
          onClick={() =>
            dispatch({
              type: "ADD_MODAL",
              payload: [
                {
                  data: "",
                  id: product._id,
                  title: product.title,
                  type: "DELETE_PRODUCT",
                },
              ],
            })
          }
        >
          ลบข้อมูล
        </button>
      </>
    );
  };
  return (
    <div className="card shadow-md" style={{ width: "20rem" }}>
      {auth.user && auth.user.role === "admin" && (
        <input
          type="checkbox"
          checked={product.checked}
          className="position-absolute"
          style={{ height: "20px", width: "20px" }}
          onChange={() => handleCheck(product._id)}
        />
      )}
      <Link href={`/product/${product._id}`}>
        <figure className="relative h-0 pb-[56.25%] md:pb-[75%] lg:pb-[70%] overflow-hidden transform group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out">
          <img
            className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition duration-700 ease-out"
            src={product.images[0].url}
            alt={product.images[0].url}
            width="540"
            height="303"
          />
        </figure>
      </Link>
      <div className="card-body">
        <h5
          className="card-title font-bold text-xl mb-2 text-capitalize"
          title={product.en}
        >
          {product.en}
        </h5>
        <h5 className="card-title text-capitalize" title={product.title}>
          {product.title}
        </h5>

        <div className="row justify-content-between mx-0 ">
          {!auth.user || auth.user.role !== "admin" ? userLink() : adminLink()}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
