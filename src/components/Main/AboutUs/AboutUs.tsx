
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cx from 'classnames';
import { NavContext } from "../../../context/NavContext";
import { useNav } from "../../../customhooks/useNav";
import style from "./AboutUs.module.scss";
import Home2 from '../../svg/red.svg';
import { graphQLClient } from '../../../api/api';
import Arrow from '../../../svg/arrowDown.svg';

type AboutUsType = {
    aboutUsImage: { url: string },
    aboutUs: {
        html: string
    },
}

export const AboutUs = () => {
    const { activeNavLinkId, setActiveNavLinkId } = useContext(NavContext);
    const contactref = useNav("aboutus");
    const [aboutPage, setAboutData] = useState<AboutUsType>();
    const [textAnimationOn, setTextAnimationOn] = useState(false);
    const navigate = (scrollToId: string) => {
        document.getElementById(scrollToId)?.scrollIntoView({ behavior: 'smooth' });
    }
    useEffect(() => {
        const fetchAbout = async () => {
            const query = `query AboutUS {
                aboutuses {
                    aboutUs {
                      html
                    }
                    aboutUsImage
                  }
          }`
            const aboutData = graphQLClient.request(query);

            aboutData.then((data) => {
                setAboutData(data.aboutuses[0]);
            })
            // setProducts(products);
        };

        fetchAbout();
    }, []);

    return (
        <>
            <section ref={contactref} className={cx(style.aboutusContainer)} id='aboutUsContainer'>

                {
                    <>
                        <div className={style.aboutUS}>

                            <>
                                {aboutPage?.aboutUsImage &&
                                <>
                                <img className={style.aboutImg} src={aboutPage?.aboutUsImage.url} alt="" />
                                    <h2 className={cx(style.aboutHeader, activeNavLinkId === "aboutus" && style.logoAnimation)}>
                                    <span className={style.firstHalf}>About us</span>
                                </h2>
                                </>   
                                }
                            </>


                        </div>
                        <div className={style.aboutUSContent}>
                            {aboutPage?.aboutUs &&
                                <p dangerouslySetInnerHTML={{ __html: aboutPage?.aboutUs.html }}>
                                </p>
                            }
                        </div>
                    </>

                }
                <div onClick={() => navigate("serviceContainer")} className={style.arrowImage}>
                    <img src={Arrow} alt="" />
                </div>
            </section>

        </>


    )
}

