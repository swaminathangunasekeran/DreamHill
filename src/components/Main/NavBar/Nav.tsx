import { FC, useContext, useEffect, useState } from "react";
import style from "./Nav.module.scss"
import cx from 'classnames';
import Logo from '../../../svg/logo.svg';
import { useNavigate } from "react-router-dom";
import { NavContext } from "../../../context/NavContext";
import { graphQLClient } from '../../../api/api';
import { BrowserView, MobileView, isBrowser, isMobile, TabletView } from 'react-device-detect';
type ContactType = {

    phone: string,

}

export const Nav = () => {
    const { activeNavLinkId, setActiveNavLinkId, menuToggle, setMenuToggle } = useContext(NavContext);
    let redirect = useNavigate();
    const [contact, setContact] = useState<ContactType>();
    useEffect(() => {
        const fetchHome = async () => {
            const query = `query Contact {
                contacts {
                    phone
                }
          }`
            const portfolioData = graphQLClient.request(query);
            portfolioData.then((data) => {
                if (data && data.contacts.length > 0) {
                    setContact(data.contacts[0]);
                }

            })
        };

        fetchHome();
    }, []);
    const navigate = (scrollToId: string, path?: string) => {
        if (path) {
            redirect(`/${path}`);
        }
        setMenuToggle(!menuToggle);
        document.getElementById(scrollToId)?.scrollIntoView({ behavior: 'smooth' });
    }

    const navHome = () => {
        redirect("/home");
        navigate('homeContainer')
    }

    const isContact = () => {
        if (activeNavLinkId !== "home" && activeNavLinkId !== "aboutus"
            && activeNavLinkId !== "services" && activeNavLinkId !== "photos") {
            return true
        } else {
            return false;
        }
    }

    return (
        <>
            {menuToggle &&
                <div className={cx(style.menu, activeNavLinkId !== 'home' ? style.mobileMenu : "")}>
                    {
                        <img className={cx(style.logo,style.hidemobile, activeNavLinkId !== 'home' ? style.mobileLogo : "")} src={Logo} alt="logo" onClick={() => navHome()} />
                    }
                    <ul className={cx(style.menuList, activeNavLinkId !== 'home' ? style.menuhover : "")}>
                        <li className={style.menuItem} onClick={() => null}>
                        <img className={cx(style.mobileLogo, style.hidedesktop)} src={Logo} alt="logo fd" onClick={() => navHome()} />

                        </li>

                        <li className={cx(style.menuItem, activeNavLinkId == 'aboutus' ? style.menuItemhover : '')} onClick={() => navigate('aboutUsContainer', "aboutus")}><a>About Us</a></li>

                        <li className={cx(style.menuItem, activeNavLinkId == 'services' ? style.menuItemhover : '')} onClick={() => navigate('serviceContainer', "services")}><a>Services</a></li>

                        <li className={cx(style.menuItem, activeNavLinkId == 'photos' ? style.menuItemhover : '')} onClick={() => navigate('portfolioContainer', "photos")}><a>Photos</a></li>

                        <li className={cx(style.menuItem, isContact() ? style.menuItemhover : "")}><a className={style.phone} href="tel:+91-7406077682">Call @ {contact?.phone}</a> </li>
                    </ul>
                </div>
            }

            { activeNavLinkId !== 'home' &&
                <img className={cx(style.mobileLogo)} src={Logo} alt="logo fd" onClick={() => navHome()} />

            }
        </>


    )
}


