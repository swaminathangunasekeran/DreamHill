import React, { Dispatch,createContext, PropsWithChildren, useState, SetStateAction } from 'react';
import { Interface } from 'readline';

interface navContextProps {
	activeNavLinkId:string
	setActiveNavLinkId?: Dispatch<SetStateAction<string>> ;
}
const intialValue = {
	activeNavLinkId :"",
}
export const NavContext = createContext<navContextProps>(intialValue);

const NavProvider: React.FC<PropsWithChildren> = ({children}) => {

	const [activeNavLinkId, setActiveNavLinkId] = useState('');

	const providerValue = {
		activeNavLinkId,
		setActiveNavLinkId,
	};
	return (
		<NavContext.Provider value={providerValue}>{children}</NavContext.Provider>
	);
};

export default NavProvider;