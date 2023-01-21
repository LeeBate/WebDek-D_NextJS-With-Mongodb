import Link from "next/link";
import { useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import { addToCart } from "../../store/Actions";
import { IoDocumentTextOutline } from "react-icons/io5";

const InformItem = ({ product, handleCheck }) => {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth } = state;

  const userLink = () => {
    return (
      <>
        <Link href={`product/${product.prodid}`}>
          <button className=" bg-[#1a237e] hover:bg-[#FFA500] w-[136.83px] py-2 rounded-full text-white ">
            <div className="flex items-center justify-center px-auto ">
              <IoDocumentTextOutline></IoDocumentTextOutline>
              <div className="mr-1"></div> ดูข้อมูล
            </div>
          </button>
        </Link>
        {/* <button className="btn btn-success"
                style={{marginLeft: '5px', flex: 1}}
                disabled={product.inStock === 0 ? true : false} 
                onClick={() => dispatch(addToCart(product, cart))} >
                    Buy
                </button> */}
      </>
    );
  };

  const adminLink = () => {
    return (
      <>
        <Link href={`booking/${product.prodid}`}>
          <button className=" text-center hover:bg-[#1a237e] text-blue-700 font-semibold hover:text-white py-2 px-3 border border-blue-500 hover:border-transparent rounded" style={{ marginRight: "5px", flex: 1 }}>
            ดูข้อมูล
          </button>
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
                  title: product.fullname,
                  type: "DELETE_Booking",
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
    // <div className="card shadow-md " style={{ width: "20rem" }}>
    //   {auth.user && auth.user.role === "admin" && (
    //     <input
    //       type="checkbox"
    //       checked={product.checked}
    //       className="position-absolute"
    //       style={{ height: "20px", width: "20px" }}
    //       onChange={() => handleCheck(product._id)}
    //     />
    //   )}
      
    //   <div className="card-body ">
    //     <h5
    //       className="card-title font-bold text-xl mb-2 text-capitalize"
    //       title={product.fullname}
    //     >
    //       {product.fullname}
    //     </h5>
    //     <h5 className="card-title text-capitalize" title={product.studentID}>
    //       {product.studentID}
    //     </h5>

    //     <div className="row justify-content-center mx-0 ">
    //       {!auth.user || auth.user.role !== "admin" ? adminLink() : adminLink()}
    //     </div>
    //   </div>
    // </div>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
            การจองเครื่องมือของฉัน
            </h1>
              <table class="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                <thead class=" font-medium text-center text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 "
                    >
                      ชื่อ-นามสกุล
                    </th>
                    <th scope="col" class="px-6 py-3">
                      รหัสนักศึกษา
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 "
                    >
                      อีเมล
                    </th>
                    <th scope="col" class="px-6 py-3">
                      เบอร์โทรศัพท์
                    </th>
                    <th scope="col" class="px-6 py-3">
                      วันที่จองและวันที่สิ้นสุด
                    </th>
                    <th scope="col" class="px-6 py-3">
                      การจัดการ
                    </th>
                    
                    
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b ">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {product.fullname}
                    </th>
                    <td class="px-6 py-4 ">
                      {product.studentID}
                    </td>
                    <td class="px-6 py-4">{product.email}</td>
                    <td class="px-6 py-4">{product.phone}</td>
                    <td class="px-6 py-4">{new Date(product.dateBooking).toLocaleString()} - {new Date (product.dateBookingEnd).toLocaleString()}</td>
                         <td className="row justify-content-center mx-0 px-6 py-4">
           {!auth.user || auth.user.role !== "admin" ? adminLink() : adminLink()}
       </td>
                  </tr>

                </tbody>
              </table>
            </div>
    
  );
};

export default InformItem;
