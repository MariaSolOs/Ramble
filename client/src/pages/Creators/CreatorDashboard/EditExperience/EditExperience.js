import React, { useState, useCallback } from 'react';
import { Switch, Route, Redirect, useLocation, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { showSnackbar, showError } from '../../../../store/actions/ui';
import axios from '../../../../tokenizedAxios';
import useLanguages from '../../../../hooks/useLanguages';
import { initValues, prepareReview } from './helpers';

import PAGES from './pages';
import * as slides from '../../../Experience/Slides';
import Page404 from '../../../Page404/Page404';
import Layout from './Layout/Layout';

const EditExperience = ({ exp, userProfile, creatorBio, 
                          showSnackbar, showError, onUpdatedExp, lang }) => {
    const location = useLocation();
    const history = useHistory();

    const allLanguages = useLanguages();

    const [values, setValues] = useState(initValues(exp));

    const handleInputChange = useCallback((name, newVal) => {
        setValues(values => ({
            ...values,
            [name]: newVal
        }));
    }, []);

    const handleNavButtonClick = useCallback((slideLink) => () => {
        history.push(slideLink);
    }, [history]);

    const handleSubmitChanges = useCallback((expReview) => () => {
        axios.patch(`/api/exp/${exp._id}`, {
            description: expReview.description,
            setting: expReview.setting,
            duration: expReview.duration,
            languages: expReview.languages,
            capacity: expReview.capacity,
            ageRestriction: expReview.ageRestriction, 
            images: expReview.images,
            included: expReview.included,
            toBring: expReview.toBring,
            price: expReview.price
        }).then((res) => {
            showSnackbar(`Your experience "${res.data.exp.title}" was updated!`);
            onUpdatedExp(res.data.exp);
        })
        .catch(() => {
            showError("We can't update your experience right now...");
            setTimeout(() => {}, 3000);
            history.push(PAGES.dashboard);
        });
    }, [exp._id, history, showError, showSnackbar, onUpdatedExp]);

    return (
        <Switch location={location}>
            <Route path={PAGES.planning}>
                <Layout 
                currStage={0} 
                isZoomExp={values.isZoomExp}
                onBackClick={handleNavButtonClick(PAGES.dashboard)}
                onNextClick={values.isZoomExp? handleNavButtonClick(PAGES.duration) : 
                             handleNavButtonClick(PAGES.setting)}>
                    <slides.Planning
                    lang={lang}
                    description={values.description}
                    submitInput={handleInputChange}/>
                </Layout>
            </Route>
            {values.setting &&
                <Route path={PAGES.setting}>
                    <Layout
                    currStage={0} 
                    isZoomExp={values.isZoomExp}
                    onBackClick={handleNavButtonClick(PAGES.planning)}
                    onNextClick={handleNavButtonClick(PAGES.duration)}>
                        <slides.Setting
                        lang={lang}
                        setting={values.setting}
                        submitInput={handleInputChange}/>
                    </Layout>
                </Route>}
            <Route path={PAGES.duration}>
                <Layout
                currStage={1} 
                isZoomExp={values.isZoomExp}
                onBackClick={values.isZoomExp? handleNavButtonClick(PAGES.planning) :
                             handleNavButtonClick(PAGES.setting)}
                onNextClick={handleNavButtonClick(PAGES.language)}>
                    <slides.Duration
                    lang={lang}
                    duration={values.duration}
                    submitInput={handleInputChange}/>
                </Layout>
            </Route>
            <Route path={PAGES.language}>
                <Layout
                currStage={1} 
                isZoomExp={values.isZoomExp}
                onBackClick={handleNavButtonClick(PAGES.duration)}
                onNextClick={handleNavButtonClick(PAGES.capacity)}>
                    <slides.Language
                    lang={lang}
                    allLanguages={allLanguages}
                    selectedLanguages={values.languages}
                    submitInput={handleInputChange}/>
                </Layout>
            </Route>
            <Route path={PAGES.capacity}>
                <Layout
                currStage={1} 
                isZoomExp={values.isZoomExp}
                onBackClick={handleNavButtonClick(PAGES.duration)}
                onNextClick={handleNavButtonClick(PAGES.age)}>
                    <slides.Capacity
                    lang={lang}
                    capacity={values.capacity}
                    submitInput={handleInputChange}/>
                </Layout>
            </Route>
            <Route path={PAGES.age}>
                <Layout
                currStage={1} 
                isZoomExp={values.isZoomExp}
                onBackClick={handleNavButtonClick(PAGES.capacity)}
                onNextClick={handleNavButtonClick(PAGES.preview)}>
                    <slides.Age
                    lang={lang}
                    ageRestricted={values.ageRestricted}
                    ageRequired={values.ageRequired}
                    submitInput={handleInputChange}/>
                </Layout>
            </Route>
            <Route path={PAGES.preview}>
                <Layout
                currStage={2} 
                isZoomExp={values.isZoomExp}
                onBackClick={handleNavButtonClick(PAGES.age)}
                onNextClick={handleNavButtonClick(PAGES.included)}>
                    <slides.Preview
                    lang={lang}
                    images={values.images}
                    submitInput={handleInputChange}/>
                </Layout>
            </Route>
            <Route path={PAGES.included}>
                <Layout
                currStage={3} 
                isZoomExp={values.isZoomExp}
                onBackClick={handleNavButtonClick(PAGES.preview)}
                onNextClick={handleNavButtonClick(PAGES.bring)}>
                    <slides.Included
                    lang={lang}
                    included={values.included}
                    submitInput={handleInputChange}/>
                </Layout>
            </Route>
            <Route path={PAGES.bring}>
                <Layout
                currStage={4} 
                isZoomExp={values.isZoomExp}
                onBackClick={handleNavButtonClick(PAGES.included)}
                onNextClick={handleNavButtonClick(PAGES.price)}>
                    <slides.Bring
                    lang={lang}
                    toBring={values.toBring}
                    submitInput={handleInputChange}/>
                </Layout>
            </Route>
            <Route path={PAGES.price}>
                <Layout
                currStage={5} 
                isZoomExp={values.isZoomExp}
                onBackClick={handleNavButtonClick(PAGES.bring)}
                onNextClick={handleNavButtonClick(PAGES.review)}>
                    <slides.Price
                    lang={lang}
                    price={values.price}
                    privatePrice={values.privatePrice}
                    currency={values.currency}
                    capacity={values.capacity}
                    submitInput={handleInputChange}/>
                </Layout>
            </Route>
            <Route path={PAGES.review} render={() => {
                const expReview = prepareReview(exp, values, {
                    name: userProfile.fstName,
                    photo: userProfile.photo,
                    bio: creatorBio
                });
                return (
                    <>
                    {expReview?
                        <Layout
                        currStage={6} 
                        isZoomExp={values.isZoomExp}
                        onBackClick={handleNavButtonClick(PAGES.dashboard)}
                        onNextClick={handleSubmitChanges(expReview)}>
                            <slides.Review
                            lang={lang}
                            review={expReview}
                            images={expReview.images}/>
                        </Layout> : 
                        <Redirect to={PAGES.dashboard}/>}
                    </>
                );
            }}/>  
            <Route component={Page404}/>
        </Switch>
    );
}

const mapStateToProps = (state) => ({
    userProfile: state.user.profile,
    creatorBio: state.user.creator.bio,
    lang: state.ui.language
});

const mapDispatchToProps = (dispatch) => ({
    showSnackbar: (msg) => dispatch(showSnackbar(msg)),
    showError: (msg) => dispatch(showError(msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExperience);