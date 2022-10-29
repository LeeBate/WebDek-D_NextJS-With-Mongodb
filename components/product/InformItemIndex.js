import Link from "next/link";
import { useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import { addToCart } from "../../store/Actions";

const InformItem = ({ product, handleCheck }) => {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth } = state;

  const userLink = () => {
    return (
      <>
        <Link href={`Inform/${product._id}`}>
          <a
            className="btn btn-info mt-2 w-full"
            style={{ marginRight: "5px", flex: 1 }}
          >
            ดูข้อมูล
          </a>
        </Link>
      </>
    );
  };

  const adminLink = () => {
    return (
      <>
        <Link href={`/Admin/createInfo/${product._id}`}>
          <a className="btn btn-info" style={{ marginRight: "5px", flex: 1 }}>
            แก้ไข
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
                  type: "DELETE_PRODUCTS",
                },
              ],
            })
          }
        >
          ลขข้อมูล
        </button>
      </>
    );
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="transform bg-sky-100/75 rounded-t-lg border w-[325px] h-auto my-2 transition duration-700 hover:shadow-2xl  ">
        <img
          className=" w-full h-60 object-center object-cover rounded-t-lg hover:rounded-none md:object-center md:object-cover "
          src={product.images[0].url}
          alt={product.images[0].url}
        />
        <div className="p-6">
          <h2
            className="text-2xl font-bold text-gray-900 line-clamp-2"
            title={product.title}
          >
            {product.title}
          </h2>
          <p
            className="mt-3 text-gray-700 line-clamp-2"
            title={product.description}
          >
            {product.description}
          </p>

          <div className="row justify-content-between mx-0 mt-4 ">
            {!auth.user || auth.user.role !== "admin" ? userLink() : <></>}
          </div>
        </div>
      </div>
      </div>
  );
};

export default InformItem;
