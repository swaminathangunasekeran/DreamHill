import { FC } from "react";
import style from "./Carousal.module.scss";
import cx from 'classnames';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { url } from "inspector";
import Arrow from '../../../svg/arrowDown.svg';
type localizastion = {
    url: string,

}
type carousalImage = {
    id: string,
    url: string
    context?:{
        custom:{
            caption:string
        }
    }
}

interface homePageType {
    carousalImages?: carousalImage[]

}


export const CarousalImage: FC<homePageType> = ({ carousalImages }) => {
    const imageges = carousalImages;
    const navigate = (id?:string) => {
        if(id){
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }else{
            document.getElementById("portfolioContainer")?.scrollIntoView({ behavior: 'smooth' });
        }
       
    }
    return (
        <>
            {carousalImages &&
                <>
                    <Carousel stopOnHover={false} autoPlay infiniteLoop showThumbs={false} showStatus={false} swipeable>
                        {carousalImages.map((carousal, index) =>
                            <div key={index} className={style.imageOne} style={{ backgroundImage: `url(${carousal.url})` }}>
                                <img className={style.imageHidden} src={carousal.url}></img>
                               <div className={style.viewGallery}>
                                <button onClick={() => navigate()} className={cx(style.button)}>{carousal?.context ?  carousal?.context?.custom.caption : " View Gallery"}</button>
                               </div>
                            </div>
                            
                        )}

                    </Carousel>
                    <div onClick={() => navigate("aboutUsContainer")}  className={style.arrowImage}>
                    <img src={Arrow} alt="" />
                    </div>
                </>

            }
            
            {!carousalImages &&
            <>
                <Carousel stopOnHover={false} autoPlay infiniteLoop showThumbs={false} showStatus={false} swipeable>
                    <div className={style.imageTwo} style={{backgroundImage: `url(https://res.cloudinary.com/dt0gcpi01/image/upload/v1671222296/Camera-pana_fhv84c.svg)`}}>
                         <img className={style.imageHidden} src="https://res.cloudinary.com/dt0gcpi01/image/upload/v1671222296/Camera-pana_fhv84c.svg"></img>   
                    </div>
                    <div className={style.imageTwo} style={{ backgroundImage: `url(https://res.cloudinary.com/dt0gcpi01/image/upload/v1671222296/Videographer-pana_isudtw.svg)` }}>
                    <img className={style.imageHidden} src="https://res.cloudinary.com/dt0gcpi01/image/upload/v1671222296/Videographer-pana_isudtw.svg"></img>        
                    </div>
                    <div className={style.imageTwo} style={{ backgroundImage: `url(https://res.cloudinary.com/dt0gcpi01/image/upload/v1671222296/Camera-amico_f9egjm.svg)` }}>
                    <img className={style.imageHidden} src="https://res.cloudinary.com/dt0gcpi01/image/upload/v1671222296/Camera-amico_f9egjm.svg"></img>        
                    </div>
  
                </Carousel>
                <div onClick={() => navigate("aboutUsContainer")}  className={style.arrowImageTwo}>
                <img src={Arrow} alt="" />
                </div>  
            </>
            
            }


            {/* <div className={style.carouselWrapper}>
            <div className={style.carouselContainer}>
            <div className={style.carousel}>
                {carousalImages && carousalImages.map((carousal,index) => 
                    <div key={index}>
                         <img className={style.imageOne} src={carousal.url}></img>
                    </div>
                )}
            </div>
            </div>

        </div> */}

        </>
    )

}

