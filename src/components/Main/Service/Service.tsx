import React, { useContext, useEffect, useState } from "react";
import { NavContext } from "../../../context/NavContext";
import { useNav } from "../../../customhooks/useNav";
import style from "./Service.module.scss";
import cx from 'classnames';
import { graphQLClient } from '../../../api/api';

type ServiceType = {
    img: {
        url: string
    },
    title: string,
    description: string,
}
const Service = () => {
    const { activeNavLinkId, setActiveNavLinkId } = useContext(NavContext);
    const contactref = useNav("services");
    const [services, setServiceData] = useState<[ServiceType]>();
    useEffect(() => {
        const fetchHome = async () => {
            const query = `query Seriveces {
                services {
                  img
                  title
                  description
                }
              }
              `
            const servicesData = graphQLClient.request(query);
            servicesData.then((data) => {
                if (data && data.services.length > 0) {
                    setServiceData(data.services);
                }

            })
        };

        fetchHome();
    }, []);
    return (
        <section ref={contactref} className={style.serviceContainer} id='serviceContainer'>
            <h2 className={cx(style.serviceHeaderText, activeNavLinkId === "services" && style.logoAnimation)}>
                <span className={style.firstHalf}>Services</span>
            </h2>
            <section>
                <div className={style.serviceDiv}>
                    {services && services.map((service, index) =>
                        <div className={style.services} key={`Service-${index}-${service.title}`}>
                            <div className={style.serviceHeader}>
                                <img alt={service.title} src={service.img.url}></img>
                                <h3 className={style.serviceTitle}>{service.title}</h3>
                            </div>
                            <p className={style.description}>
                                {service.description}
                            </p>
                        </div>
                    )
                    }
                </div>
            </section>
        </section>

    )
}

export default Service