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
          <div className="bg-green-500/40 p-1">
          <a
            className="text-end mt-2 text-base w-full"
            style={{ marginRight: "5px", flex: 1 }}
          >
           อ่านเพิ่มเติม
          </a></div>
        </Link>
      </>
    );
  };
  function ConvertDate(date){
 const data  =  new Date(date).toLocaleString("en-GB", {year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit",})


  return data
}

  return (
   

    <div class="news-card">
    <a href={`Inform/${product._id}`} class="news-card__card-link"></a>
    <img src={product.images[0].url} alt="" ></img>
    <div class="news-card__text-wrapper">
      <h2 class="news-card__title line-clamp-2">{product.title}</h2>
      <div class="news-card__post-date">{ConvertDate(product.createdAt)}</div>
      <div class="news-card__details-wrapper">
        <p class="text-base line-clamp-3" >{product.description}&hellip;</p>
        <a href="#" class="news-card__read-more">Read more <i class="fas fa-long-arrow-alt-right"></i></a>
      </div>
    </div>
  </div>
  );
};

export default InformItem;
