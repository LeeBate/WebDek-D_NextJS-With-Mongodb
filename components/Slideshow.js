import React from "react";
//These are Third party packages for smooth slideshow
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Image from "next/image";

const Slideshow = (products) => {
	//Array of Images
	const images = [
		"images/1.jpg",
		"images/2.png",
		"images/3.png",
		"images/4.png",
	];

	//These are custom properties for zoom effect while slide-show
	const zoomInProperties = {
		indicators: true,
		scale: 1.2,
		duration: 5000,
		transitionDuration: 500,
        loop: true,
        navigator: true,
		infinite: true,
		prevArrow: (
			<div style={{ width: "30px", marginRight: "-30px", cursor: "pointer" }}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
					fill="#2e2e2e"
				>
					<path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z" />
				</svg>
			</div>
		),
		nextArrow: (
			<div style={{ width: "30px", marginLeft: "-30px", cursor: "pointer" }}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
					fill="#2e2e2e"
				>
					<path d="M512 256L270 42.6v138.2H0v150.6h270v138z" />
				</svg>
			</div>
		),
	};
	return (
		<div className="m-10">
			

			<Zoom {...zoomInProperties}>
				{products.product.map((each, index) => (
					<div key={index} className="flex justify-center w-full h-full">
						<Image
							className="w-full object-cover rounded-lg shadow-xl"
                            src={each.images[0].url}
                            width={800}
                            height={400}
						/>
					</div>
				))}
			</Zoom>
		</div>
	);
};

export default Slideshow;