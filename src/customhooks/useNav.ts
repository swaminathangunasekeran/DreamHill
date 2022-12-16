import { useContext, useEffect, useRef } from "react";
import {NavContext} from "../context/NavContext";
import {useOnScreen } from './useOnscreen';

export const useNav = (navLinkId:any) =>{
    const ref = useRef(null);
    const { setActiveNavLinkId } = useContext(NavContext);
    const isOnScreen = useOnScreen(ref);
    useEffect(() => {
        if(setActiveNavLinkId){
            if (isOnScreen) {
                setActiveNavLinkId(navLinkId);
                window.history.pushState('', '', `${navLinkId}`);
            }
        }

	}, [isOnScreen, setActiveNavLinkId, navLinkId]);
    return ref;
}