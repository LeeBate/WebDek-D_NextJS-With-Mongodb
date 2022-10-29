import React from "react";
//These are Third party packages for smooth slideshow
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Image from "next/image";
import { MdNavigateBefore ,MdNavigateNext } from "react-icons/md";

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
			<div style={{ cursor: "pointer" }} className="    ml-2 ">
				<div className=" bg-slate-50/90 shadow-md rounded-full">
				<MdNavigateBefore className=""  size={35}/>
				</div>
			</div>
		),
		nextArrow: (
			<div style={{ cursor: "pointer" }}  className="  mr-2" >
				<div className=" bg-slate-50/90 shadow-md rounded-full">
				<MdNavigateNext size={35}/>
				</div>
			</div>
		),
	};
	return (
		<section className='max-w-[800px] mx-auto'>
		
		{/* <div className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 " > */}
		<div className=""  >
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