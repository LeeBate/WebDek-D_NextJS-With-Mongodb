import Link from "next/link";
import PaypalBtn from "./paypalBtn";
import { patchData } from "../utils/fetchData";
import { updateItem } from "../store/Actions";

const OrderDetail = ({ orderDetail, state, dispatch }) => {
  const { auth, orders } = state;

  const handleDelivered = (order) => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    patchData(`order/delivered/${order._id}`, null, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });

      const { delivered } = res.result;

      dispatch(
        updateItem(
          orders,
          order._id,
          {
            ...order,
            // paid,
            // dateOfPayment,
            // method,
            delivered,
          },
          "ADD_ORDERS"
        )
      );

      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  const handlePaid = (order) => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    patchData(`order/delivered/${order._id}`, null, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });

      const { paid, dateOfPayment, method, delivered } = res.result;

      dispatch(
        updateItem(
          orders,
          order._id,
          {
            ...order,
            paid,
            dateOfPayment,
            method,
            // delivered,
          },
          "ADD_ORDERS"
        )
      );

      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  if (!auth.user) return null;
  return (
    <section class="text-gray-700 body-font overflow-hidden bg-white">
      <div class="container px-5 py-5 mx-auto ">
        {orderDetail.map((order) => (
          <div key={order._id} className="row justify-content-around">
            <div className="text-uppercase my-3 ">
              <div className=" text-secondary">
                <h2 className=" text-black text-xl">ข้อมูลการจอง</h2>

                <p>ชื่อเครื่องมือ: {order.title}</p>
                {order.prodOrder.map((item) => (
                  <div key={item._id}>
                    <p>ชื่อ-นามสกุล: {item.fullname}</p>
                    <p>รหัสนักศึกษา: {item.studentID}</p>
                    <p>อีเมลมหาวิทยาลัย: {item.email}</p>
                    <p>เบอร์โทรศัพท์: {item.phone}</p>
                    <p>
                      วันที่เริ่ม-สิ้นสุด:{" "}
                      {new Date(item.dateBooking).toLocaleString()} -{" "}
                      {new Date(item.dateBookingEnd).toLocaleString()}
                    </p>
                  </div>
                ))}

                <img
                  className="lg:w-1/2 xl:w-1/2 object-cover py-3 rounded h-[100%] max-h-[589px] w-full mx-auto "
                  src={order.images}
                />

                <div
                  className={`alert ${
                    order.delivered ? "alert-success" : "alert-danger"
                  }
                        d-flex justify-content-between align-items-center`}
                  role="alert"
                >
                  {order.delivered
                    ? `อนุมัติการจองเมื่อ ${new Date(
                        order.updatedAt
                      ).toLocaleString()} น.`
                    : "โปรดรออนุมัติการจองเครื่องมือ"}
                  {auth.user.role === "admin" && !order.delivered && (
                    <button
                      className="btn btn-dark text-uppercase"
                      onClick={() => handleDelivered(order)}
                    >
                      ยืนยันการจอง
                    </button>
                  )}
                </div>

                <h3>การชำระเงิน</h3>
                {order.method && (
                  <h6>
                    ชำระเงินด้วย:{" "}
                    <em>
                      {order.method}จำนวน {order.total} ฿
                    </em>
                  </h6>
                )}

                {order.paymentId && (
                  <p>
                    PaymentId: <em>{order.paymentId}</em>
                  </p>
                )}

                <div
                  className={`alert ${
                    order.paid ? "alert-success" : "alert-danger"
                  }
                        d-flex justify-content-between align-items-center`}
                  role="alert"
                >
                  {order.paid
                    ? `ชำระเงินเมื่อ ${new Date(
                        order.dateOfPayment
                      ).toLocaleString()} น.`
                    : "ยังไม่ได้ชำระเงิน"}
                  {auth.user.role === "admin" && !order.paid && (
                    <button
                      className="btn btn-dark text-uppercase"
                      onClick={() => handlePaid(order)}
                    >
                      ยืนยันการรับเงินสด
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div>
              {!order.paid && auth.user.role !== "admin" && (
                <div className="p-4">
                  <h2 className="mb-4 text-uppercase">
                    จำนวนเงิน: {order.total} ฿
                  </h2>
                  <PaypalBtn order={order} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrderDetail;
