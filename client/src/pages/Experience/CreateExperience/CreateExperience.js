import React, {useState, useCallback, useEffect} from 'react';
import {connect} from 'react-redux';
import {Switch, Route, useLocation, Redirect} from 'react-router-dom';
import * as pages from './pageNames';
import useLanguages from '../../../hooks/useLanguages';
import {prepareReview} from './helpers';

//Pages and components
import * as slides from './FormSlides';
import Intro from './Intro/Intro';
import Submitted from './Submitted/Submitted';
import Layout from './Layout/Layout';

const CreateExperience = (props) => {
    const location = useLocation();

    //Form values and options
    const allLanguages = useLanguages();
    const [values, setValues] = useState({
        location: null,
        meetPoint: null,
        coordinates: [],
        title: '',
        categories: [],
        description: '',
        setting: null,
        duration: 1, //in hours
        languages: [],
        capacity: null,
        ageRestricted: false, 
        ageRequired: 18,
        images: [null, null, null, null],
        included: [],
        toBring: [],
        price: 0, //per person 
        privatePrice: 0, //for private bookings
        currency: 'CAD',
        schedule: new Map(),
        startDate: null,
        scheduleUpdateFreq: 'weekly'
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
            {!props.isAuth && <Redirect to="/creator/become"/>}
            <Route path={pages.INTRO}>
                <Intro/>
            </Route>
            <Route path={pages.LOCATION}>
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
            <Route path={pages.TITLE}>
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
            <Route path={pages.CATEGORIES}>
                <Layout 
                completedSteps={completedSteps}
                canContinue={values.categories.length >= 1} 
                currStage={2} 
                backLink={pages.TITLE}
                nextLink={pages.PLANNING}>
                    <slides.Categories
                    categories={values.categories}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={pages.PLANNING}>
                <Layout
                completedSteps={completedSteps}
                canContinue={values.description.length > 0} 
                currStage={3} 
                backLink={pages.CATEGORIES}
                nextLink={pages.SETTING}>
                    <slides.Planning
                    description={values.description}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={pages.SETTING}>
                <Layout
                completedSteps={completedSteps}
                canContinue={values.setting} 
                currStage={3} 
                backLink={pages.PLANNING}
                nextLink={pages.DURATION}>
                    <slides.Setting
                    setting={values.setting}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={pages.DURATION}>
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
            <Route path={pages.LANGUAGE}>
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
            <Route path={pages.CAPACITY}>
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
            <Route path={pages.AGE}>
                <Layout
                completedSteps={completedSteps}
                canContinue={(values.ageRestricted && values.ageRequired)
                             || !values.ageRestricted} 
                currStage={4} 
                backLink={pages.CAPACITY}
                nextLink={pages.PREVIEW}>
                    <slides.Age
                    ageRestricted={values.ageRestricted}
                    ageRequired={values.ageRequired}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={pages.PREVIEW}>
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
            <Route path={pages.INCLUDED}>
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
            <Route path={pages.BRING}>
                <Layout
                completedSteps={completedSteps}
                canContinue={!values.mustBring || 
                             (values.mustBring && values.toBring.length > 0)} 
                currStage={7} 
                backLink={pages.INCLUDED}
                nextLink={pages.PRICE}>
                    <slides.Bring
                    toBring={values.toBring}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={pages.PRICE}>
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
            <Route path={pages.SCHEDULE}>
                <Layout
                completedSteps={completedSteps}
                canContinue={[...values.schedule.keys()].length > 0} 
                currStage={9} 
                backLink={pages.PRICE}
                nextLink={pages.CAL_UPDATES}>
                    <slides.Schedule
                    schedule={values.schedule}
                    duration={values.duration}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={pages.CAL_UPDATES}>
                <Layout
                completedSteps={completedSteps}
                canContinue={values.startDate} 
                currStage={9} 
                backLink={pages.SCHEDULE}
                nextLink={pages.REVIEW}>
                    <slides.CalendarUpdates
                    startDate={values.startDate}
                    updateFreq={values.scheduleUpdateFreq}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={pages.REVIEW} render={() => {
                const expReview = prepareReview(values, {
                    name: props.userProfile.fstName,
                    photo: props.userProfile.photo,
                    bio: props.creatorBio
                });
                return (
                    <>
                        {expReview?
                        <Layout
                        completedSteps={completedSteps}
                        canContinue
                        currStage={10} 
                        backLink={pages.CAL_UPDATES}
                        nextLink={props.creatorId ? pages.SUBMITTED :
                                '/creator/join'}>
                            <slides.Review
                        review={expReview}
                        images={values.images}/>
                        </Layout> : <Redirect to={pages.INTRO}/>}
                    </>
                );
            }}/>            
            {props.creatorId && 
                <Route path={pages.SUBMITTED}>
                    <Submitted/>
                </Route>}
            <Redirect to="/"/>
        </Switch>
    );
}

const mapStateToProps = (state) => ({
    isAuth: state.user.profile.id,
    userProfile: state.user.profile,
    creatorId: state.user.creator.id,
    creatorBio: state.user.creator.bio
});

export default connect(mapStateToProps, null)(CreateExperience);