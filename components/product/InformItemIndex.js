import Link from "next/link";
import { useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import Box from "@mui/material/Box";

const InformItem = ({ product, handleCheck }) => {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth } = state;

  const userLink = () => {
    return (
      <>
        <Link href={`Inform/${product._id}`}>
          <div className="bg-green-500/40 p-1">
            <a
              className="text-end mt-2 text-base w-full"
              style={{ marginRight: "5px", flex: 1 }}
            >
              อ่านเพิ่มเติม
            </a>
          </div>
        </Link>
      </>
    );
  };
  function ConvertDate(date) {
    const data = new Date(date).toLocaleString("th-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return data;
  }

  return (
    <ThemeProvider theme={theme}>
      <div id="blog" className="services-container">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <div className="service-card-container">
            <div className="service-cards-inform">
              <div className=" flex flex-col lg:flex-row">
                <img
                  className="h-52 w-full md:h-72 lg:h-80 2xl:h-[30rem] 2xl:w-[50rem]  object-cover"
                  src={product.images[0].url}
                  alt={product.images[0].url}
                />
                <div className=" lg:mx-5 xl:mx-5 2xl:mx-8">
                  <h3 className=" text-left text-lg font-bold lg:text-3xl">
                    {product.title}
                  </h3>
                  <ul className="list-disc text-lg ml-10 line-clamp-5 leading-relaxed">
                    <li>{product.description}</li>
                  </ul>
                  <a aria-hidden href={`Inform/${product._id}`}>
                    <div className=" flex pt-3 justify-center items-center"></div>
                  </a>
                  
                  <div className="flex flex-col lg:flex-row pt-3 justify-center items-center">
                        <button className=" bg-[#4761AD] hover:bg-[#627ac2] text-white w-full py-2 rounded-xl">
                          อ่านเพิ่มเติม
                        </button>
                      </div>
                </div>
                
              </div>
            </div>
          </div>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default InformItem;
