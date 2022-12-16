
import React, { useContext, useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import cx from 'classnames';
import { NavContext } from "../../../context/NavContext";
import { useNav } from "../../../customhooks/useNav";
import style from "./Portfolio.module.scss";
import { graphQLClient } from '../../../api/api';

type portFolioData = [{
    id: string,
    title: string,
    titleImage: {
        url: string
    },
    description: {
        html: string
    }
}]

export const Portfolio = () => {
    const { activeNavLinkId, setActiveNavLinkId } = useContext(NavContext);
    const portfolioref = useNav("photos");
    let redirect = useNavigate();
    const [portfolioData, setPortFolioData] = useState<portFolioData>();
    useEffect(() => {
        const fetchHome = async () => {
            const query = `query Projects {
            projects {
              id
              title
              titleImage
              description {
                html
              }
            }
          }`
            const portfolioData = graphQLClient.request(query);
            portfolioData.then((data) => {
                setPortFolioData(data.projects);
            })
        };

        fetchHome();
    }, []);
    const navigate = (id:string) => {
        redirect(`/project?id=${id}`);
    }
    
    return (
        <section ref={portfolioref} className={style.protfolioContainer} id='portfolioContainer'>
            <h2 className={cx(style.portfolioHeader, activeNavLinkId === "photos" && style.logoAnimation)}>
                <span className={style.firstHalf}>Photos</span>
            </h2>
            <div className={style.projectList}>
                {portfolioData && portfolioData.map((slide, index) =>

                    <div onClick={() => navigate(slide.id)} key={slide.id} className={style.projects}>
                         <>
                                <img src={slide.titleImage.url} />
                                <div className={style.description}>
                                    <h4 className={style.imageHeader}>{slide.title}</h4>
                                    <p className={style.descriptionText} dangerouslySetInnerHTML={{ __html: slide ? slide.description.html : "" }}></p>
                                    
                                </div>
                                <div className={style.footer}>
                                        <a href={`/project?id=${slide.id}`} className={style.learnMore}>View More  &#8594;</a>
                                </div>
                            </>
                    </div>
                )}
            </div>
        </section>



    )
}