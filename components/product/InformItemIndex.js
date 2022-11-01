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

  return (
    // <div className="transform flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 transition duration-700 hover:shadow-2xl">
    //   <img
    //     className=" max-w-[200px] h-60 object-cover rounded-t-lg hover:rounded-none md:object-center md:object-cover "
    //     src={product.images[0].url}
    //     alt={product.images[0].url}
    //   />
    //   <div className="flex flex-row justify-between leading-normal">
    //     <h5
    //       className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2"
    //       title={product.title}
    //     >
    //       {product.title}
    //     </h5>
    //     <p
    //       className="font-normal text-gray-700 dark:text-gray-400 line-clamp-2"
    //       title={product.description}
    //     >
    //       {product.description}
    //     </p>

    //     <div className="row justify-content-between mx-0 mt-4 ">
    //       {!auth.user || auth.user.role !== "admin" ? userLink() : <></>}
    //     </div>
    //   </div>
    // </div>

    //  <div className="flex flex-row md:flex-col">
    //     <div class="flex flex-row md:flex-col md:space-x-5 space-y-3 md:space-y-0 m-2 rounded-xl shadow-lg p-3 md:max-w-xl mx-auto border border-white bg-white">
    //       <div class="w-full h-36 flex flex-col md:flex-row bg-white  place-items-center">
    //         <img src={product.images[0].url} alt="tailwind logo" class="rounded-xl w-full h-36 mr-3" />
    //         </div>
    //         <div className="">
    //           <h3 class="font-black text-gray-800 md:text-3xl text-xl line-clamp-2">The Majestic and Wonderful Bahamas</h3>
    //           <p class="md:text-lg text-gray-500 text-base line-clamp-2">The best kept secret of The Bahamas is the country’s sheer
    //             size and diversity. With 16 major islands, The Bahamas is an unmatched destination</p>
    //         </div>

    //      </div>
    //     </div>

    <div className="flex md:flex-col p-3 rounded-lg shadow-lg mt-2">
      <div className=" w-full h-36 bg-red-500 md:w-full place-items-center">
        <img
          src={product.images[0].url}
          className="rounded-xl w-full h-36 mr-3 object-cover  "
        ></img>
      </div>

      <div className="bg-yellow-500 w-full h-auto p-2">
        <h3 class="font-black text-gray-800 md:text-3xl text-md line-clamp-2">
          The Majestic and Wonderful Bahamas
        </h3>
        <p class="md:text-lg text-gray-500 text-sm line-clamp-2">
          The best kept secret of The Bahamas is the country’s sheer size and
          diversity. With 16 major islands, The Bahamas is an unmatched
          destination
        </p>
        {userLink()}
         
      </div>
    </div>
  );
};

export default InformItem;
