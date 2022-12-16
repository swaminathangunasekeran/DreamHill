import React, { useContext, useEffect, useState } from "react";
import { NavContext } from "../../../context/NavContext";
import { useNav } from "../../../customhooks/useNav";
import style from "./Contact.module.scss";
import { graphQLClient } from '../../../api/api';

type ContactType = {
    email: string,
    facebook: string,
    insta: string,
    phone: string,
    youtube: string,
    address: string,
}
const Contact = () => {
    const { activeNavLinkId, setActiveNavLinkId } = useContext(NavContext);
    const contactref = useNav("contact");
    const [contact, setContact] = useState<ContactType>();
    useEffect(() => {
        const fetchHome = async () => {
            const query = `query Contact {
                contacts {
                    email
                    facebook
                    insta
                    phone
                    youtube
                    address
                }
          }`
            const portfolioData = graphQLClient.request(query);
            portfolioData.then((data) => {
                if(data && data.contacts.length > 0){
                    setContact(data.contacts[0]);
                }
               
            })
        };

        fetchHome();
    }, []);
    return (
        <section ref={contactref} className={style.contact} id='contactContainer'>
            {/* <h2 >Contact</h2> */}
            <section>
                <div className={style.contactDiv}>
                    {contact &&
                        <div className={style.socialMedia}>
                            <div className={style.socialMediaEle}>
                                <a href={contact.insta} title="insta icons">
                                    <img src="https://media.graphassets.com/output=format:jpg/resize=height:40,fit:max/ii4BF6uHSRilH94srjD9"></img>
                                </a>
                            </div>
                            <div className={style.socialMediaEle}>
                                <a href={contact.facebook} title="fb icon">
                                    <img src="https://media.graphassets.com/output=format:jpg/resize=height:40,fit:max/CK9p4Wk4RYaTg4XQeBH5"></img>
                                </a>
                            </div>
                            <div className={style.socialMediaEle}>
                                <a href={contact.youtube} title="youtube icons">
                                    <img src="https://media.graphassets.com/output=format:jpg/resize=height:40,fit:max/FZczvpSSjuyoQhyO9MMD"></img>
                                </a>
                            </div>
                        </div>
                    }
                    {contact &&
                        <>
                            <div className={style.information}>
                                <b>Information</b>
                                <p>{contact.email}</p>
                            </div>
                            <div className={style.phone}>
                                <b>Phone</b>
                                <p>{contact.phone}</p>
                            </div>
                            <div className={style.address}>
                                <b>Address</b>
                                <p>{contact.address}</p>
                            </div>
                        </>
                    }

                </div>
            </section>
        </section>

    )
}

export default Contact