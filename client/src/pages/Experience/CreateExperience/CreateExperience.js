import React, {useState, useCallback, useEffect} from 'react';
import {connect} from 'react-redux';
import {Switch, Route, useLocation, Redirect} from 'react-router-dom';
import * as pages from './pageNames';
import useLanguages from '../../../hooks/useLanguages';
import {initValues, prepareReview} from './helpers';

import * as slides from '../Slides';
import Intro from './Intro/Intro';
import Submitted from './Submitted/Submitted';
import Layout from './Layout/Layout';
import Page404 from '../../Page404/Page404';

const CreateExperience = (props) => {
    const location = useLocation();

    //Form values and options
    const allLanguages = useLanguages();
    const [values, setValues] = useState(initValues());
    //Called after validation
    const submitInput = useCallback((name, newVal) => {
        setValues(values => ({...values, [name]: newVal}));
    }, []);

    //For keeping track of the form completion
    const [completedSteps, setCompletedSteps] = useState(0);
    useEffect(() => {
        const loc = location.pathname.replace('/experience/new/', '').toUpperCase();
        let pageNames = Object.keys(pages);
        if(values.isZoomExp) { //Skip setting page for Zoom experiences
            pageNames = pageNames.filter(page => page !== 'SETTING');
        }
        const step = pageNames.indexOf(loc);
        if(step > completedSteps) {
            setCompletedSteps(step);
        }
    }, [location, completedSteps, values.isZoomExp]);

    return (
        <Switch location={location}>
            {!props.isAuth && <Redirect to="/creator/become"/>}
            <Route path={pages.INTRO}>
                <Intro/>
            </Route>
            <Route path={pages.LOCATION}>
                <Layout 
                completedSteps={completedSteps}
                lang={props.lang}
                canContinue={(values.location && values.meetPoint) ||
                             (values.location && 
                              values.zoomMeetingId && 
                              values.zoomMeetingPassword)} 
                currStage={0} 
                nextLink={pages.TITLE}
                isZoomExp={values.isZoomExp}>
                    <slides.Location 
                    lang={props.lang}
                    location={values.location} 
                    meetPoint={values.meetPoint}
                    isZoomExp={values.isZoomExp}
                    zoomMeetingId={values.zoomMeetingId} 
                    zoomMeetingPassword={values.zoomMeetingPassword}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={pages.TITLE}>
                <Layout 
                lang={props.lang}
                completedSteps={completedSteps}
                canContinue={values.title.length > 0 && 
                             values.title.length <= 50} 
                currStage={1} 
                backLink={pages.LOCATION}
                nextLink={pages.CATEGORIES}
                isZoomExp={values.isZoomExp}>
                    <slides.Title 
                    lang={props.lang}
                    title={values.title}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={pages.CATEGORIES}>
                <Layout 
                lang={props.lang}
                completedSteps={completedSteps}
                canContinue={values.categories.length >= 1} 
                currStage={2} 
                backLink={pages.TITLE}
                nextLink={pages.PLANNING}
                isZoomExp={values.isZoomExp}>
                    <slides.Categories
                    lang={props.lang}
                    categories={values.categories}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={pages.PLANNING}>
                <Layout
                lang={props.lang}
                completedSteps={completedSteps}
                canContinue={values.description.length > 0 && 
                             values.description.length <= 1000} 
                currStage={3} 
                backLink={pages.CATEGORIES}
                nextLink={values.isZoomExp? pages.DURATION : pages.SETTING}
                isZoomExp={values.isZoomExp}>
                    <slides.Planning
                    lang={props.lang}
                    description={values.description}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={pages.SETTING}>
                <Layout
                lang={props.lang}
                completedSteps={completedSteps}
                canContinue={values.setting} 
                currStage={3} 
                backLink={pages.PLANNING}
                nextLink={pages.DURATION}
                isZoomExp={values.isZoomExp}>
                    <slides.Setting
                    lang={props.lang}
                    setting={values.setting}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={pages.DURATION}>
                <Layout
                lang={props.lang}
                completedSteps={completedSteps}
                canContinue={values.duration >= 0.5} 
                currStage={4} 
                backLink={values.isZoomExp? pages.PLANNING : pages.SETTING}
                nextLink={pages.LANGUAGE}
                isZoomExp={values.isZoomExp}>
                    <slides.Duration
                    lang={props.lang}
                    duration={values.duration}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={pages.LANGUAGE}>
                <Layout
                lang={props.lang}
                completedSteps={completedSteps}
                canContinue={values.languages.length > 0} 
                currStage={4} 
                backLink={pages.DURATION}
                nextLink={pages.CAPACITY}
                isZoomExp={values.isZoomExp}>
                    <slides.Language
                    lang={props.lang}
                    allLanguages={allLanguages}
                    selectedLanguages={values.languages}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={pages.CAPACITY}>
                <Layout
                lang={props.lang}
                completedSteps={completedSteps}
                canContinue={values.capacity} 
                currStage={4} 
                backLink={pages.DURATION}
                nextLink={pages.AGE}
                isZoomExp={values.isZoomExp}>
                    <slides.Capacity
                    lang={props.lang}
                    capacity={values.capacity}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={pages.AGE}>
                <Layout
                lang={props.lang}
                completedSteps={completedSteps}
                canContinue={(values.ageRestricted && values.ageRequired)
                             || !values.ageRestricted} 
                currStage={4} 
                backLink={pages.CAPACITY}
                nextLink={pages.PREVIEW}
                isZoomExp={values.isZoomExp}>
                    <slides.Age
                    lang={props.lang}
                    ageRestricted={values.ageRestricted}
                    ageRequired={values.ageRequired}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={pages.PREVIEW}>
                <Layout
                lang={props.lang}
                completedSteps={completedSteps}
                canContinue={values.images.every(img => img)} 
                currStage={5} 
                backLink={pages.AGE}
                nextLink={pages.INCLUDED}
                isZoomExp={values.isZoomExp}>
                    <slides.Preview
                    lang={props.lang}
                    images={values.images}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={pages.INCLUDED}>
                <Layout
                lang={props.lang}
                completedSteps={completedSteps}
                canContinue={true} 
                currStage={6} 
                backLink={pages.PREVIEW}
                nextLink={pages.BRING}
                isZoomExp={values.isZoomExp}>
                    <slides.Included
                    lang={props.lang}
                    included={values.included}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={pages.BRING}>
                <Layout
                lang={props.lang}
                completedSteps={completedSteps}
                canContinue={!values.mustBring || 
                             (values.mustBring && values.toBring.length > 0)} 
                currStage={7} 
                backLink={pages.INCLUDED}
                nextLink={pages.PRICE}
                isZoomExp={values.isZoomExp}>
                    <slides.Bring
                    lang={props.lang}
                    toBring={values.toBring}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={pages.PRICE}>
                <Layout
                lang={props.lang}
                completedSteps={completedSteps}
                canContinue={values.price > 0} 
                currStage={8} 
                backLink={pages.BRING}
                nextLink={pages.SCHEDULE}
                isZoomExp={values.isZoomExp}>
                    <slides.Price
                    lang={props.lang}
                    price={values.price}
                    privatePrice={values.privatePrice}
                    currency={values.currency}
                    capacity={values.capacity}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={pages.SCHEDULE}>
                <Layout
                lang={props.lang}
                completedSteps={completedSteps}
                canContinue={[...values.schedule.keys()].length > 0} 
                currStage={9} 
                backLink={pages.PRICE}
                nextLink={pages.CAL_UPDATES}
                isZoomExp={values.isZoomExp}>
                    <slides.Schedule
                    lang={props.lang}
                    schedule={values.schedule}
                    duration={values.duration}
                    submitInput={submitInput}/>
                </Layout>
            </Route>
            <Route path={pages.CAL_UPDATES}>
                <Layout
                lang={props.lang}
                completedSteps={completedSteps}
                canContinue={values.startDate} 
                currStage={9} 
                backLink={pages.SCHEDULE}
                nextLink={pages.REVIEW}
                isZoomExp={values.isZoomExp}>
                    <slides.CalendarUpdates
                    lang={props.lang}
                    startDate={values.startDate}
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
                        lang={props.lang}
                        completedSteps={completedSteps}
                        canContinue
                        currStage={10} 
                        backLink={pages.CAL_UPDATES}
                        nextLink={props.creatorId ? pages.SUBMITTED :
                                '/creator/join'}
                        isZoomExp={values.isZoomExp}>
                            <slides.Review
                            lang={props.lang}
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
            <Route component={Page404}/>
        </Switch>
    );
}

const mapStateToProps = (state) => ({
    isAuth: state.user.profile.id,
    userProfile: state.user.profile,
    creatorId: state.user.creator.id,
    creatorBio: state.user.creator.bio,
    lang: state.ui.language
});

export default connect(mapStateToProps, null)(CreateExperience);