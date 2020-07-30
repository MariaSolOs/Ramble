import React, {useState, useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useRouteMatch, Switch, Route, useLocation, Redirect} from 'react-router-dom';
import * as pages from './pageNames';
import useLanguages from '../../../hooks/useLanguages';

//Pages and components
import * as slides from './FormSlides';
import Intro from './Intro/Intro';
import Submitted from './Submitted';
import Layout from './Layout/Layout';

const CreateExperience = (props) => {
    const {path} = useRouteMatch();
    const location = useLocation();

    //Form values and options
    const creator = useSelector(state => state.user.userData);
    const allLanguages = useLanguages();
    const [values, setValues] = useState({
        location: null,
        meetPoint: null,
        title: '',
        categories: [],
        description: '',
        setting: null,
        duration: 1, //in hours
        languages: [],
        capacity: null,
        ageRestricted: true, 
        ageRequired: 18,
        images: [null, null, null, null],
        included: [],
        toBring: [],
        price: 0, //per person 
        privatePrice: 0, //for private bookings
        currency: 'CAD',
        schedule: new Map(),
        timeframe: null,
        scheduleUpdateFreq: 'weekly',
        canSubmit: false
    });
    //Called after validation
    const submitInput = useCallback((name, newVal) => {
        setValues(values => ({...values, [name]: newVal}));
    }, []);

    //For keeping track of the form completion
    const [completedSteps, setCompletedSteps] = useState(0);
    useEffect(() => {
        const loc = location.pathname.replace('/experience/new/', '').toUpperCase();
        const step = Object.keys(pages).indexOf(loc);
        if(step > completedSteps) {
            setCompletedSteps(step);
        }
    }, [location, completedSteps]);

    return (
        <Switch location={location}>
            <Route path={`${path}/${pages.INTRO}`}>
                <Intro/>
            </Route>
            <Route path={`${path}/${pages.LOCATION}`}>
                <Layout 
                completedSteps={completedSteps}
                canContinue={values.location && values.meetPoint} 
                currStage={0} 
                nextLink={pages.TITLE}>
                    <slides.Location 
                    location={values.location} 
                    meetPoint={values.meetPoint}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={`${path}/${pages.TITLE}`}>
                <Layout 
                completedSteps={completedSteps}
                canContinue={values.title.length > 0} 
                currStage={1} 
                backLink={pages.LOCATION}
                nextLink={pages.CATEGORIES}>
                    <slides.Title 
                    title={values.title}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={`${path}/${pages.CATEGORIES}`}>
                <Layout 
                completedSteps={completedSteps}
                canContinue={values.categories.length === 2} 
                currStage={2} 
                backLink={pages.TITLE}
                nextLink={pages.DESCRIPTION}>
                    <slides.Categories
                    categories={values.categories}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={`${path}/${pages.DESCRIPTION}`}>
                <Layout
                completedSteps={completedSteps}
                canContinue={values.description.length > 0} 
                currStage={3} 
                backLink={pages.CATEGORIES}
                nextLink={pages.SETTING}>
                    <slides.Description
                    description={values.description}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={`${path}/${pages.SETTING}`}>
                <Layout
                completedSteps={completedSteps}
                canContinue={values.setting} 
                currStage={3} 
                backLink={pages.DESCRIPTION}
                nextLink={pages.DURATION}>
                    <slides.Setting
                    setting={values.setting}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={`${path}/${pages.DURATION}`}>
                <Layout
                completedSteps={completedSteps}
                canContinue={values.duration >= 1} 
                currStage={4} 
                backLink={pages.SETTING}
                nextLink={pages.LANGUAGE}>
                    <slides.Duration
                    duration={values.duration}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={`${path}/${pages.LANGUAGE}`}>
                <Layout
                completedSteps={completedSteps}
                canContinue={values.languages.length > 0} 
                currStage={4} 
                backLink={pages.DURATION}
                nextLink={pages.CAPACITY}>
                    <slides.Language
                    allLanguages={allLanguages}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={`${path}/${pages.CAPACITY}`}>
                <Layout
                completedSteps={completedSteps}
                canContinue={values.capacity} 
                currStage={4} 
                backLink={pages.DURATION}
                nextLink={pages.AGE}>
                    <slides.Capacity
                    capacity={values.capacity}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={`${path}/${pages.AGE}`}>
                <Layout
                completedSteps={completedSteps}
                canContinue={values.ageRestricted} 
                currStage={4} 
                backLink={pages.CAPACITY}
                nextLink={pages.PREVIEW}>
                    <slides.Age
                    ageRestricted={values.ageRestricted}
                    ageRequired={values.ageRequired}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={`${path}/${pages.PREVIEW}`}>
                <Layout
                completedSteps={completedSteps}
                canContinue={values.images.every(img => img)} 
                currStage={5} 
                backLink={pages.AGE}
                nextLink={pages.INCLUDED}>
                    <slides.Preview
                    images={values.images}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={`${path}/${pages.INCLUDED}`}>
                <Layout
                completedSteps={completedSteps}
                canContinue={true} 
                currStage={6} 
                backLink={pages.PREVIEW}
                nextLink={pages.BRING}>
                    <slides.Included
                    included={values.included}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={`${path}/${pages.BRING}`}>
                <Layout
                completedSteps={completedSteps}
                canContinue={true} 
                currStage={7} 
                backLink={pages.INCLUDED}
                nextLink={pages.PRICE}>
                    <slides.Bring
                    toBring={values.toBring}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={`${path}/${pages.PRICE}`}>
                <Layout
                completedSteps={completedSteps}
                canContinue={values.price > 0} 
                currStage={8} 
                backLink={pages.BRING}
                nextLink={pages.SCHEDULE}>
                    <slides.Price
                    price={values.price}
                    privatePrice={values.privatePrice}
                    currency={values.currency}
                    capacity={values.capacity}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={`${path}/${pages.SCHEDULE}`}>
                <Layout
                completedSteps={completedSteps}
                canContinue={[...values.schedule.keys()].length > 0} 
                currStage={9} 
                backLink={pages.PRICE}
                nextLink={pages.TIMEFRAME}>
                    <slides.Schedule
                    schedule={values.schedule}
                    duration={values.duration}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={`${path}/${pages.TIMEFRAME}`}>
                <Layout
                completedSteps={completedSteps}
                canContinue={values.timeframe} 
                currStage={9} 
                backLink={pages.SCHEDULE}
                nextLink={pages.REVIEW}>
                    <slides.Timeframe
                    timeframe={values.timeframe}
                    updateFreq={values.scheduleUpdateFreq}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={`${path}/${pages.REVIEW}`}>
                <Layout
                completedSteps={completedSteps}
                canContinue={values.canSubmit} 
                currStage={10} 
                backLink={pages.TIMEFRAME}
                nextLink={pages.SUBMITTED}>
                    <slides.Review
                    exp={values}
                    creator={creator}
                    submitExp={submitInput}/>
                </Layout>
            </Route>
            <Route path={`${path}/${pages.SUBMITTED}`}>
                <Submitted 
                expTitle={values.title}/>
            </Route>
            </Switch>
    );
}

export default CreateExperience;