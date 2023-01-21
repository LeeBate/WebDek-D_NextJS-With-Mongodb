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
            delivered,
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
          <div
            key={order._id}
            style={{ margin: "100px auto" }}
            className="row justify-content-around"
          >
            <div className="text-uppercase my-3 " style={{ maxWidth: "800px" }}>
              <div className=" text-secondary">
                <h3>ข้อมูลการจอง</h3>
                <p>ชื่อ: {order.user.name}</p>
                <p>อีเมล: {order.user.email}</p>
                {/* <p>titme: {product.title}</p>
                        <p>Mobile: {order.mobile}</p> */}

                <div
                  className={`alert ${
                    order.delivered ? "alert-success" : "alert-danger"
                  }
                        d-flex justify-content-between align-items-center`}
                  role="alert"
                >
                  {order.delivered
                    ? `ยืมยันเมื่อ ${order.updatedAt}`
                    : "รอการติดต่อเพื่ออนุมัติ"}
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
                    Method: <em>{order.method}</em>
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
                    ? `ชำระเงินเมื่อ ${order.dateOfPayment}`
                    : "ยังไม่ได้ชำระเงิน"}
                </div>
              </div>
            </div>

            {!order.paid && auth.user.role !== "admin" && (
              <div className="p-4">
                <h2 className="mb-4 text-uppercase">จำนวนเงิน: {order.total} ฿</h2>
                <PaypalBtn order={order} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrderDetail;
