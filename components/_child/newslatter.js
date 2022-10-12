import React from "react";
import Button from "@mui/material/Button";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
export default function newslatter() {
  async function handleOnSubmit(e) {
    e.preventDefault();
    const formData = {};
    Array.from(e.currentTarget.elements).forEach((field) => {
      if (!field.name) return;
      formData[field.name] = field.value;
    });
    fetch("api/mail", {
      method: "post",
      body: JSON.stringify(formData),
    });
    console.log(formData);
  }

  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_8qhwn8r",
        "template_a0nrq3h",
        e.target,
        "urzLahGarV18K7U0b"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  }
  function sendEmail2(e) {
    e.preventDefault();
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "การกระทำนี้ คุณจะไม่สามารถย้อนกลับได้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ส่ง",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        emailjs
          .sendForm(
            "service_8qhwn8r",
            "template_a0nrq3h",
            e.target,
            "urzLahGarV18K7U0b"
          )
          .then(
            (result) => {
              console.log(result.text);
            },
            (error) => {
              console.log(error.text);
            }
          );
        e.target.reset();
        Swal.fire("ส่งสำเร็จ!", "คำขอถูกดำเนินการแล้ว.", "success");

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        // Toast.fire({
        //   icon: 'error',
        //   title: 'Signed in successfully'
        // })
      }
    });
  }
  return (
    // <section className="bg-white ">
    //   <div className="row">
    //     <div className="col-md-6 pl-20">
    //       <div id="map-container-2" className="z-depth-1-half map-container-2 ">
    //         <iframe
    //           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3856.061012646732!2d102.01505111484359!3d14.877866389626359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311eada28f2db4d3%3A0x8aecad30c8a44dad!2z4Lio4Li54LiZ4Lii4LmM4LmA4LiE4Lij4Li34LmI4Lit4LiH4Lih4Li34Lit4Lin4Li04LiX4Lii4Liy4Lio4Liy4Liq4LiV4Lij4LmM4LmB4Lil4Liw4LmA4LiX4LiE4LmC4LiZ4LmC4Lil4Lii4Li1IOC4oeC4q-C4suC4p-C4tOC4l-C4ouC4suC4peC4seC4ouC5gOC4l-C4hOC5guC4meC5guC4peC4ouC4teC4quC4uOC4o-C4meC4suC4o-C4tQ!5e0!3m2!1sth!2sth!4v1665308447758!5m2!1sth!2sth"
    //           allowFullScreen=""
    //           loading="lazy"
    //           referrerPolicy="no-referrer-when-downgrade"
    //           frameBorder="0"
    //         >
    //         </iframe>
    //       </div>
    //       <div className="row">
    //         <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md col-md-6">
    //           <h2 className="mb-4 text-xl tracking-tight font-extrabold text-center text-gray-900">
    //             ติดต่อเรา
    //           </h2>
    //           <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
    //             หากไม่ดูเป็นการรบกวนกูจะชวนเธอมารักกัน
    //           </p>
    //           <form method="post" onSubmit={sendEmail2} className="space-y-8">
    //             <div>
    //               <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
    //                 เรื่องติดต่อ
    //               </label>
    //               <input
    //                 type="text"
    //                 name="title"
    //                 className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900
    //                             text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
    //                             block w-full p-2.5 "
    //                 placeholder="เรื่อง..."
    //                 required
    //               />
    //             </div>
    //             <div>
    //               <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
    //                 อีเมล์ของคุณ
    //               </label>
    //               <input
    //                 type="email"
    //                 name="email"
    //                 className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900
    //                             text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
    //                             block w-full p-2.5 "
    //                 placeholder="Suranaree@g.sut.ac.th"
    //                 required
    //               />
    //             </div>
    //             <div>
    //               <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
    //                 ชื่อ-นามสกุลของคุณ
    //               </label>
    //               <input
    //                 type="text"
    //                 name="name"
    //                 className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900
    //                             text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
    //                             block w-full p-2.5 "
    //                 placeholder="นายเทคโน สุรนารี"
    //                 required
    //               />
    //             </div>
    //             <div className="sm:col-span-2">
    //               <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
    //                 รายละเอียดที่ต้องการติดต่อ
    //               </label>
    //               <textarea
    //                 rows="6"
    //                 name="detail"
    //                 className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 "
    //                 placeholder="เขียนรายละเอียด..."
    //                 required
    //               ></textarea>
    //             </div>
    //             <button
    //               type="submit"
    //               className="shadow-sm bg-blue-500 hover:bg-green-600 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-green-500 rounded
    //                             block w-full p-2.5 "
    //             >
    //               ส่งข้อมูล
    //             </button>
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>

    <footer className="bg-gray-900 text-white lg:grid lg:grid-cols-5">
      <aside className="hidden lg:relative lg:col-span-2 lg:block">
      <iframe
              alt="Art"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3856.061012646732!2d102.01505111484359!3d14.877866389626359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311eada28f2db4d3%3A0x8aecad30c8a44dad!2z4Lio4Li54LiZ4Lii4LmM4LmA4LiE4Lij4Li34LmI4Lit4LiH4Lih4Li34Lit4Lin4Li04LiX4Lii4Liy4Lio4Liy4Liq4LiV4Lij4LmM4LmB4Lil4Liw4LmA4LiX4LiE4LmC4LiZ4LmC4Lil4Lii4Li1IOC4oeC4q-C4suC4p-C4tOC4l-C4ouC4suC4peC4seC4ouC5gOC4l-C4hOC5guC4meC5guC4peC4ouC4teC4quC4uOC4o-C4meC4suC4o-C4tQ!5e0!3m2!1sth!2sth!4v1665308447758!5m2!1sth!2sth"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              frameBorder="0"
              class="absolute inset-0 h-full w-full object-cover"
            >
            </iframe>
      </aside>

      <div className="px-4 py-16 sm:px-6 lg:col-span-3 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <p className="font-medium">
              <span className="text-xs uppercase tracking-widest"> Call </span>

              <a
                className="block text-2xl hover:opacity-75 sm:text-3xl"
                href=""
              >
                0123456789
              </a>
            </p>

            <ul className="mt-8 space-y-2 text-sm">
              <li>Monday to Friday: 10am - 5pm</li>
              <li>Weekend: 10am - 3pm</li>
            </ul>

            <div className="mt-16 flex gap-3">
              <a
                className="rounded-full border border-white/25 p-2 hover:opacity-75"
                href=""
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only"> Facebook </span>

                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>

              <a
                className="rounded-full border border-white/25 p-2 hover:opacity-75"
                href=""
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only"> Instagram </span>

                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>

              <a
                className="rounded-full border border-white/25 p-2 hover:opacity-75"
                href=""
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only"> Twitter </span>

                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>

              <a
                className="rounded-full border border-white/25 p-2 hover:opacity-75"
                href=""
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only"> GitHub </span>

                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>

              <a
                className="rounded-full border border-white/25 p-2 hover:opacity-75"
                href=""
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only"> Dribbble </span>

                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="font-medium">Support</p>

              <nav className="mt-4 flex flex-col space-y-2 text-sm text-gray-300">
                <a className="hover:opacity-75" href="">
                  {" "}
                  Contact{" "}
                </a>
                <a className="hover:opacity-75" href="">
                  {" "}
                  FAQs{" "}
                </a>
                <a className="hover:opacity-75" href="">
                  {" "}
                  Live Chat{" "}
                </a>
                <a className="hover:opacity-75" href="">
                  {" "}
                  Forums{" "}
                </a>
              </nav>
            </div>

            <div>
              <p className="font-medium">Products</p>

              <nav className="mt-4 flex flex-col space-y-2 text-sm text-gray-300">
                <a className="hover:opacity-75" href="">
                  {" "}
                  1to1 Coaching{" "}
                </a>
                <a className="hover:opacity-75" href="">
                  {" "}
                  Lesson Plans{" "}
                </a>
                <a className="hover:opacity-75" href="">
                  {" "}
                  Meal Plans{" "}
                </a>
                <a className="hover:opacity-75" href="">
                  {" "}
                  Gym Sessions{" "}
                </a>
              </nav>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-12">
          <div className="text-sm text-gray-300 sm:flex sm:items-center sm:justify-between">
            <div className="flex gap-3">
              <a className="hover:opacity-75" href="">
                {" "}
                Privacy Policy{" "}
              </a>
              <a className="hover:opacity-75" href="">
                {" "}
                Terms & Conditions{" "}
              </a>
              <a className="hover:opacity-75" href="">
                {" "}
                Returns Policy{" "}
              </a>
            </div>

            <p className="mt-4 sm:mt-0">&copy; 2022 Company Name.</p>
          </div>

          <p className="mt-8 text-xs text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
            mollitia quia quod repellendus. Porro harum, odio dolore
            perspiciatis praesentium provident esse consequatur quibusdam
            aperiam, cupiditate omnis modi in quasi? In, maxime odio vel
            repellat sed earum? Debitis quaerat facilis animi. Odio natus
            nostrum laboriosam impedit magnam praesentium asperiores consectetur
            ipsum.
          </p>
        </div>
      </div>
    </footer>
  );
}
