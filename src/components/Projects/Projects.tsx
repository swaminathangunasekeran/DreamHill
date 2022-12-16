import React, { useContext, useEffect, useState } from "react";
import { NavContext } from "../../context/NavContext";
import { useNav } from "../../customhooks/useNav";
import style from "./Project.module.scss";
import { Nav } from "../Main/NavBar/Nav";
import { useParams } from "react-router-dom";
import { graphQLClient } from "../../api/api";
import Contact from "../Main/Contact/Contact";

type ProjectType = {
    id:string,
    title:string,
    titleImage:{
        url:string
    }
    gallery:[{
        url:string,
        public_id:string
    }]
}

const Project = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const [projectData, setProjectData] = useState<ProjectType>();
    let id = urlParams.get('id')?.toString();
    useEffect(() => {
        const fetchHome = async () => {
            const query = `query Projects {
                project(where: {id: "${id}"}) {
                    id
                    title
                    gallery
                  }
          }`
            const portfolioData = graphQLClient.request(query);
            portfolioData.then((data) => {
                setProjectData(data.project);
            })
        };

        fetchHome();
    }, []);
    return (
        <>
            <Nav />
            <section className={style.projectModuleContainer} id='contactContainer'>
                <h2 >{projectData?.title}</h2>
                <ul className={style.gallery}>
                    {projectData?.gallery.map((image) => 
                      <li> <img src={image.url} alt={image.public_id}/></li> 
                    )}
                </ul>
            </section>
            <Contact/>
        </>


    )
}

export default Project