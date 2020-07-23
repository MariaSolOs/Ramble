import React, {useState, useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useRouteMatch, Switch, Route, useLocation, Redirect} from 'react-router-dom';
import * as types from './slideTypes';
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
    const creator = useSelector(state => state.user.data);
    const allLanguages = useLanguages();
    const [values, setValues] = useState({
        location: null,
        meetPoint: null,
        title: '',
        categories: [],
        creatorBio: '',
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
        const step = Object.keys(types).indexOf(loc);
        if(step > completedSteps) {
            setCompletedSteps(step);
        }
    }, [location, completedSteps]);

    //TODO: Create bio profile at submission

    return (
        <>
        <Switch location={location}>
            <Route path={`${path}/intro`}>
                <Intro/>
            </Route>
            <Route path={`${path}/${types.LOCATION}`}>
                <Layout 
                completedSteps={completedSteps}
                canContinue={values.location && values.meetPoint} 
                currStage={0} 
                nextLink={types.TITLE}>
                    <slides.Location 
                    location={values.location} 
                    meetPoint={values.meetPoint}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={`${path}/${types.TITLE}`}>
                <Layout 
                completedSteps={completedSteps}
                canContinue={values.title.length > 0} 
                currStage={1} 
                backLink={types.LOCATION}
                nextLink={types.CATEGORIES}>
                    <slides.Title 
                    title={values.title}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={`${path}/${types.CATEGORIES}`}>
                <Layout 
                completedSteps={completedSteps}
                canContinue={values.categories.length === 2} 
                currStage={2} 
                backLink={types.TITLE}
                nextLink={types.ABOUT}>
                    <slides.Categories
                    categories={values.categories}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={`${path}/${types.ABOUT}`}>
                <Layout 
                completedSteps={completedSteps}
                canContinue={values.creatorBio.length > 0} 
                currStage={3} 
                backLink={types.CATEGORIES}
                nextLink={types.DESCRIPTION}>
                    <slides.About
                    bio={values.creatorBio}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={`${path}/${types.DESCRIPTION}`}>
                <Layout
                completedSteps={completedSteps}
                canContinue={values.description.length > 0} 
                currStage={4} 
                backLink={types.ABOUT}
                nextLink={types.SETTING}>
                    <slides.Description
                    description={values.description}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={`${path}/${types.SETTING}`}>
                <Layout
                completedSteps={completedSteps}
                canContinue={values.setting} 
                currStage={4} 
                backLink={types.DESCRIPTION}
                nextLink={types.DURATION}>
                    <slides.Setting
                    setting={values.setting}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={`${path}/${types.DURATION}`}>
                <Layout
                completedSteps={completedSteps}
                canContinue={values.duration >= 1} 
                currStage={5} 
                backLink={types.SETTING}
                nextLink={types.LANGUAGE}>
                    <slides.Duration
                    duration={values.duration}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={`${path}/${types.LANGUAGE}`}>
                <Layout
                completedSteps={completedSteps}
                canContinue={values.languages.length > 0} 
                currStage={5} 
                backLink={types.DURATION}
                nextLink={types.CAPACITY}>
                    <slides.Language
                    allLanguages={allLanguages}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={`${path}/${types.CAPACITY}`}>
                <Layout
                completedSteps={completedSteps}
                canContinue={values.capacity} 
                currStage={5} 
                backLink={types.DURATION}
                nextLink={types.AGE}>
                    <slides.Capacity
                    capacity={values.capacity}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={`${path}/${types.AGE}`}>
                <Layout
                completedSteps={completedSteps}
                canContinue={values.ageRestricted} 
                currStage={5} 
                backLink={types.CAPACITY}
                nextLink={types.PREVIEW}>
                    <slides.Age
                    ageRestricted={values.ageRestricted}
                    ageRequired={values.ageRequired}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={`${path}/${types.PREVIEW}`}>
                <Layout
                completedSteps={completedSteps}
                canContinue={values.images.every(img => img)} 
                currStage={6} 
                backLink={types.AGE}
                nextLink={types.INCLUDED}>
                    <slides.Preview
                    images={values.images}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={`${path}/${types.INCLUDED}`}>
                <Layout
                completedSteps={completedSteps}
                canContinue={true} 
                currStage={7} 
                backLink={types.PREVIEW}
                nextLink={types.BRING}>
                    <slides.Included
                    included={values.included}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={`${path}/${types.BRING}`}>
                <Layout
                completedSteps={completedSteps}
                canContinue={true} 
                currStage={8} 
                backLink={types.INCLUDED}
                nextLink={types.PRICE}>
                    <slides.Bring
                    toBring={values.toBring}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={`${path}/${types.PRICE}`}>
                <Layout
                completedSteps={completedSteps}
                canContinue={values.price > 0} 
                currStage={9} 
                backLink={types.BRING}
                nextLink={types.SCHEDULE}>
                    <slides.Price
                    price={values.price}
                    privatePrice={values.privatePrice}
                    currency={values.currency}
                    capacity={values.capacity}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={`${path}/${types.SCHEDULE}`}>
                <Layout
                completedSteps={completedSteps}
                canContinue={[...values.schedule.keys()].length > 0} 
                currStage={10} 
                backLink={types.PRICE}
                nextLink={types.TIMEFRAME}>
                    <slides.Schedule
                    schedule={values.schedule}
                    duration={values.duration}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={`${path}/${types.TIMEFRAME}`}>
                <Layout
                completedSteps={completedSteps}
                canContinue={values.timeframe} 
                currStage={10} 
                backLink={types.SCHEDULE}
                nextLink={types.REVIEW}>
                    <slides.Timeframe
                    timeframe={values.timeframe}
                    updateFreq={values.scheduleUpdateFreq}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={`${path}/${types.REVIEW}`}>
                <Layout
                completedSteps={completedSteps}
                canContinue={values.canSubmit} 
                currStage={11} 
                backLink={types.TIMEFRAME}
                nextLink={types.SUBMITTED}>
                    <slides.Review
                    exp={values}
                    creator={creator}
                    submitExp={submitInput}/>
                </Layout>
            </Route>
            <Route path={`${path}/${types.SUBMITTED}`}>
                <Submitted 
                expTitle={values.title}/>
            </Route>
                <Redirect to="/"/>
            </Switch>
        </>
    );
}

export default CreateExperience;