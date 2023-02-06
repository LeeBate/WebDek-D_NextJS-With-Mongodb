import Link from "next/link";
import { useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";

const InformItem = ({ product}) => {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth } = state;

  const userLink = () => {
    return (
      <div className="flex items-center mt-4">
        <Link href={`Inform/${product._id}`}>
          <button className=" bg-[#1a237e] hover:bg-[#FFA500] text-white w-full py-2 rounded-full">
            อ่านเพิ่มเติม
          </button>
        </Link>
      </div>
    );
  };
  function ConvertDate(date) {
    const data = new Date(date).toLocaleString("th-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
      // hour: "2-digit",
      // minute: "2-digit",
    });

    return data;
  }

  return (
    <ThemeProvider theme={theme}>
      <section className="services-container py-10 ">
        <div className=" max-w-7xl mx-auto sm:px-6 h-full ">
          <article className="max-w-sm mx-auto md:max-w-none  gap-4 items-center">
            <a className="relative block group">
              <div
                className="absolute inset-0 bg-blue-900/50 hidden md:block transform md:translate-y-2 md:translate-x-4 xl:translate-y-4 xl:translate-x-8 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out pointer-events-none"
                aria-hidden="true"
              ></div>
              <figure className="relative h-0 pb-[56.25%] md:pb-[75%] lg:pb-[56.25%] overflow-hidden transform md:-translate-y-2 xl:-translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out">
                <img
                  className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition duration-700 ease-out"
                  src={product.images[0].url}
                  alt={product.images[0].url}
                  width="540"
                  height="303"
                />
              </figure>
            </a>
            <div>
              <header>
                <div className="my-3 ">
                  <ul className="flex flex-wrap text-xs font-medium -m-1">
                    <li className="m-1">
                      <p className="inline-flex text-center text-gray-100 py-1 px-3 rounded-full bg-blue-500 hover:bg-blue-600 transition duration-150 ease-in-out">
                        ข่าวสาร
                      </p>
                    </li>
                  </ul>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold leading-tight mb-2">
                  <p className=" transition duration-150 ease-in-out">
                    {product.title}
                  </p>
                </h3>
                <div className="news-card__post-date flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className=" ml-2"></div>
                  <p className="text-base text-gray-400/95">
                    {ConvertDate(product.createdAt)}
                  </p>
                </div>
              </header>
              <p className="text-lg text-gray-400 flex-grow indent-8  line-clamp-4 leading-relaxed">
                {product.description}
              </p>
              {userLink()}
            </div>
          </article>
          
          
        </div>
      </section>
    </ThemeProvider>
  );
};

export default InformItem;
