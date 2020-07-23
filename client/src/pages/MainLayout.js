import React from 'react';
import {useLocation} from 'react-router-dom';

import Navbar from '../components/MainNavbar/MainNavbar';
import withIdleTimer from '../hoc/withIdleTimer/withIdleTimer';
import Footer from '../components/MainFooter/MainFooter';

const MainLayout = (props) => { 
    const {pathname} = useLocation();
    //TODO: Deal with the footer in a better way 
    const noFooterPages = ['/experience'];

    const showFooter = noFooterPages.every(route => !pathname.includes(route));
    return (
        <>
            <nav>
                <Navbar/>
            </nav>
            <main>
                {props.children}
            </main>
            {showFooter && <Footer/>}
        </>
)};

export default (withIdleTimer(MainLayout));