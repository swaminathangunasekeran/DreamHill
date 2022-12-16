import react, { FC, useContext, useEffect, useState } from 'react';
import style from './Home.module.scss';
import cx from 'classnames';
import Home1 from '../../../svg/green.svg';
import Home2 from '../../../svg/red.svg';
import Arrow from '../../../svg/red-arrow.svg';
import { NavContext } from '../../../context/NavContext';
import { useNav } from '../../../customhooks/useNav';
import { useNavigate } from "react-router-dom";
import { CarousalImage } from '../Carousal/Carousal';
import { request } from 'graphql-request';
import { graphQLClient } from '../../../api/api';
import { Carousel } from 'react-responsive-carousel';


type localizastion = {
    url: string,

}
type carousalImage = {
    id:string,
    url: string
}

interface homePageType {
    homeDescription:string
    carousalImages:carousalImage[]

}



export const Home: FC = () => {
    const { activeNavLinkId, setActiveNavLinkId } = useContext(NavContext);
    const homeref = useNav("home");
    const [homepage, setHomePageData] = useState<homePageType>();    
    const navigate = (scrollToId: string) => {

        document.getElementById(scrollToId)?.scrollIntoView({ behavior: 'smooth' });
    }

    useEffect(() => {
        const fetchHome = async () => {
         const query = `query Homes {
            homes {
              id
              homeDescription
              carousalImages
            }
          }`
          const homeData = graphQLClient.request(query);
          homeData.then((data) => {
            setHomePageData(data.homes[0]);
          })
          // setProducts(products);
        };
    
        fetchHome();
    },[]);

    return (
        <>
            <section ref={homeref} className={cx(style.home)} id='homeContainer'>
               {/* {homepage && activeNavLinkId == "home" &&
                <img src={Home2} alt="arrow" className={cx(style.leafRed, style.animateBottom)} />
               } */}
               {homepage &&
               <div className={style.carousalImage}>
                 <CarousalImage carousalImages={homepage.carousalImages}/>
               </div>
               }
               {!homepage && 
               <div className={style.carousalImage}>
               <CarousalImage />
                </div>
               }
               {/* <Carousel> */}
               
               {/* </Carousel> */}
                
            </section>
        </>

    )
}