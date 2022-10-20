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
			<div style={{ width: "60px", marginRight: "0px", cursor: "pointer" }}>
				<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24"><path d="M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12zm7.58 0l5.988-5.995 1.414 1.416-4.574 4.579 4.574 4.59-1.414 1.416-5.988-6.006z"/></svg>
			</div>
		),
		nextArrow: (
			<div style={{ width: "60px", marginLeft: "-30px", cursor: "pointer" }}>
				<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.568 18.005l-1.414-1.415 4.574-4.59-4.574-4.579 1.414-1.416 5.988 5.995-5.988 6.005z"/></svg>
			</div>
		),
	};
	return (
		<section className='max-w-full p-5 '>
		
		<div >
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
		</section>
	);
};

export default Slideshow;