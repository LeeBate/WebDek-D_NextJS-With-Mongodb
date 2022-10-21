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
        loop: true,
		navigator: true,
		direction: "right",
		showDescription: true,
		prevArrow: (
			<div style={{ width: "45px", marginLeft: "50px", cursor: "pointer" }}>
				<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24"><path d="M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12zm7.58 0l5.988-5.995 1.414 1.416-4.574 4.579 4.574 4.59-1.414 1.416-5.988-6.006z"/></svg>
			</div>
		),
		nextArrow: (
			<div style={{ width: "45px", marginRight: "50px", cursor: "pointer" }}>
				<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.568 18.005l-1.414-1.415 4.574-4.59-4.574-4.579 1.414-1.416 5.988 5.995-5.988 6.005z"/></svg>
			</div>
		),
	};
	return (
		<section className='max-w-full'>
		
		<div className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 " >
			<Zoom {...zoomInProperties}>
				{products.product.map((each, index) => (
					<div key={index} className="flex justify-center w-full h-full pt-3">
						<Image
							
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