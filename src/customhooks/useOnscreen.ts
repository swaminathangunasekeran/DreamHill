import { useEffect, useState } from "react";

export const useOnScreen = (ref:any) => {
    const [isOnScreen, setOnScreen] = useState(false);
	let observer:any;
	if(ref){
		 observer = new IntersectionObserver(
			([entry]) => setOnScreen(entry.isIntersecting),
			//callback,
			{
				threshold: [0.25, 0.5, 0.75] ,
			}
		);
	}

	useEffect(() => {
		if(observer){
			observer.observe(ref.current);
			return () => {
				observer.disconnect();
			};
		}
	},[ref]);



	return isOnScreen;
}