import React, { useState, useCallback } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import * as slides from '../../../Experience/Slides';
import PAGES from './pages';
import useLanguages from '../../../../hooks/useLanguages';

import Page404 from '../../../Page404/Page404';
import Layout from './Layout/Layout';

const EditExperience = ({ exp }) => {
    console.log(exp)
    const location = useLocation();

    const allLanguages = useLanguages();

    const [values, setValues] = useState({
        description: exp.description,
        setting: exp.setting,
        duration: exp.duration,
        language: exp.languages.slice(0),
        capacity: exp.capacity,
        ageRestricted: exp.ageRestriction !== 0, 
        ageRequired: exp.ageRestriction,
        images: exp.images.slice(0),
        included: exp.included.slice(0),
        toBring: exp.toBring.slice(0),
        price: exp.price.perPerson,
        privatePrice: exp.price.private,
        currency: exp.price.currency
    });

    const handleInputChange = useCallback((name, newVal) => {
        setValues(values => ({
            ...values,
            [name]: newVal
        }));
    }, []);

    return (
        <Switch location={location}>
            <Route path={PAGES.planning}>
                <Layout 
                currStage={0} 
                backLink="/creator/dashboard/experiences"
                nextLink={PAGES.setting}>
                    <slides.Planning
                    description={values.description}
                    submitInput={handleInputChange}/>
                </Layout>
            </Route>
            <Route path={PAGES.setting}>
                <Layout
                currStage={0} 
                backLink={PAGES.planning}
                nextLink={PAGES.duration}>
                    <slides.Setting
                    setting={values.setting}
                    submitInput={handleInputChange}/>
                </Layout>
            </Route>
            <Route path={PAGES.duration}>
                <Layout
                currStage={1} 
                backLink={PAGES.setting}
                nextLink={PAGES.language}>
                    <slides.Duration
                    duration={values.duration}
                    submitInput={handleInputChange}/>
                </Layout>
            </Route>
            <Route path={PAGES.language}>
                <Layout
                currStage={1} 
                backLink={PAGES.duration}
                nextLink={PAGES.capacity}>
                    <slides.Language
                    allLanguages={allLanguages}
                    submitInput={handleInputChange}/>
                </Layout>
            </Route>
            <Route path={PAGES.capacity}>
                <Layout
                currStage={1} 
                backLink={PAGES.duration}
                nextLink={PAGES.age}>
                    <slides.Capacity
                    capacity={values.capacity}
                    submitInput={handleInputChange}/>
                </Layout>
            </Route>
            <Route path={PAGES.age}>
                <Layout
                currStage={1} 
                backLink={PAGES.capacity}
                nextLink={PAGES.preview}>
                    <slides.Age
                    ageRestricted={values.ageRestricted}
                    ageRequired={values.ageRequired}
                    submitInput={handleInputChange}/>
                </Layout>
            </Route>
            <Route path={PAGES.preview}>
                <Layout
                currStage={2} 
                backLink={PAGES.age}
                nextLink={PAGES.included}>
                    <slides.Preview
                    images={values.images}
                    submitInput={handleInputChange}/>
                </Layout>
            </Route>
            <Route path={PAGES.included}>
                <Layout
                currStage={3} 
                backLink={PAGES.preview}
                nextLink={PAGES.bring}>
                    <slides.Included
                    included={values.included}
                    submitInput={handleInputChange}/>
                </Layout>
            </Route>
            <Route path={PAGES.bring}>
                <Layout
                currStage={4} 
                backLink={PAGES.included}
                nextLink={PAGES.price}>
                    <slides.Bring
                    toBring={values.toBring}
                    submitInput={handleInputChange}/>
                </Layout>
            </Route>
            <Route path={PAGES.price}>
                <Layout
                currStage={5} 
                backLink={PAGES.bring}
                nextLink={PAGES.review}>
                    <slides.Price
                    price={values.price}
                    privatePrice={values.privatePrice}
                    currency={values.currency}
                    capacity={values.capacity}
                    submitInput={handleInputChange}/>
                </Layout>
            </Route>
            <Route path={PAGES.review}>
                <Layout
                currStage={6} 
                backLink={PAGES.price}
                nextLink="/creator/dashboard/experiences">
                    <slides.Review
                    review={exp}
                    images={values.images}/>
                </Layout>
            </Route>         
            <Route component={Page404}/>
        </Switch>
    );
}

export default EditExperience;