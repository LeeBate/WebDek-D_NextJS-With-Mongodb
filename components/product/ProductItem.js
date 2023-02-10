import Link from "next/link";
import { useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import { addToCart } from "../../store/Actions";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineScience } from "react-icons/md";

const ProductItem = ({ product, handleCheck }) => {
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  const alert = async (e) => {
    e.preventDefault();
    const { auth } = await state;
    if (Object.keys(auth).length === 0) {
      return dispatch({
        type: "NOTIFY",
        payload: { error: "กรุณาเข้าสู่ระบบ" },
      });
    }
  };
  const userLink = () => {
    return (
      <>
        <Link href={`product/${product._id}`}>
          <button className="btn bg-[#1a237e] hover:bg-[#FFA500] w-[136.83px] py-2 rounded-full text-white ">
            <div className="flex items-center justify-center px-auto ">
              <IoDocumentTextOutline></IoDocumentTextOutline>
              <div className="mr-1"></div> ข้อมูลเพิ่มเติม
            </div>
          </button>
        </Link>
        {Object.keys(auth).length !== 0 ? (
          <Link href={`booking/${product._id}`}>
            <button className="btn bg-[#FFA500] hover:bg-[#1a237e] px-2 py-2 rounded-full text-white">
              <div className="flex items-center justify-center px-auto ">
                <MdOutlineScience></MdOutlineScience>
                <div className="mr-1"></div> จองเครื่องมือ
              </div>
            </button>
          </Link>
        ) : (
          <Link href="#">
            <button
              className="btn bg-[#FFA500] hover:bg-[#1a237e] px-2 py-2 rounded-full text-white"
              onClick={alert}
            >
              <div className="flex items-center justify-center px-auto ">
                <MdOutlineScience></MdOutlineScience>
                <div className="mr-1"></div> จองเครื่องมือ
              </div>
            </button>
          </Link>
        )}
      </>
    );
  };

  const adminLink = () => {
    return (
      <>
        <Link href={`product/${product._id}`}>
          <button className="btn bg-[#1a237e] hover:bg-[#FFA500] w-[136.83px] py-2 rounded-full text-white ">
            <div className="flex items-center justify-center px-auto ">
              <IoDocumentTextOutline></IoDocumentTextOutline>
              <div className="mr-1"></div> ข้อมูลเพิ่มเติม
            </div>
          </button>
        </Link>
        {Object.keys(auth).length !== 0 ? (
          <Link href={`booking/${product._id}`}>
            <button className="btn bg-[#FFA500] hover:bg-[#1a237e] px-2 py-2 rounded-full text-white">
              <div className="flex items-center justify-center px-auto ">
                <MdOutlineScience></MdOutlineScience>
                <div className="mr-1"></div> จองเครื่องมือ
              </div>
            </button>
          </Link>
        ) : (
          <Link href="#">
            <button
              className="btn bg-[#FFA500] hover:bg-[#1a237e] px-2 py-2 rounded-full text-white"
              onClick={alert}
            >
              <div className="flex items-center justify-center px-auto ">
                <MdOutlineScience></MdOutlineScience>
                <div className="mr-1"></div> จองเครื่องมือ
              </div>
            </button>
          </Link>
        )}
      </>
    );
  };
  return (
    <div className="card shadow-md" style={{ width: "20rem" }}>
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
          className="card-title font-bold text-xl mb-2 text-capitalize text-[#1a237e]"
          title={product.en}
        >
          {product.en}
        </h5>
        <h5 className="card-title text-capitalize" title={product.title}>
          {product.title}
        </h5>

        <div className="row justify-between mx-0">
          {!auth.user || auth.user.role !== "admin" ? userLink() : adminLink()}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
