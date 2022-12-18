import React, { Dispatch,createContext, PropsWithChildren, useState, SetStateAction } from 'react';
import { Interface } from 'readline';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
interface navContextProps {
	activeNavLinkId:string
	setActiveNavLinkId?: Dispatch<SetStateAction<string>> ;
	setMenuToggle:Dispatch<SetStateAction<boolean>>,
	menuToggle:boolean
}
const intialValue = {
	activeNavLinkId :"",
	menuToggle:false,
	setMenuToggle: () => (isMobile || MobileView)
}
export const NavContext = createContext<navContextProps>(intialValue);

const NavProvider: React.FC<PropsWithChildren> = ({children}) => {

	const [activeNavLinkId, setActiveNavLinkId] = useState('');
	const [menuToggle, setMenuToggle] = useState<boolean>(!isMobile);

	const providerValue = {
		activeNavLinkId,
		setActiveNavLinkId,
		setMenuToggle,
		menuToggle
	};
	return (
		<NavContext.Provider value={providerValue}>{children}</NavContext.Provider>
	);
};

export default NavProvider;