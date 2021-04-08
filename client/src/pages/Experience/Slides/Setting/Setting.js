import React, { useState } from 'react';
import { SettingText as text } from '../SlidesText';

import HomeIcon from '@material-ui/icons/Home';
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat';
import PaletteIcon from '@material-ui/icons/Palette';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import SpaIcon from '@material-ui/icons/Spa';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import StorefrontIcon from '@material-ui/icons/Storefront';
import SettingField from './SettingField';

import { makeStyles } from '@material-ui/core/styles';
import styles from './SettingStyles';
const useStyles = makeStyles(styles);

const Setting = ({ setting, submitInput, lang }) => {
    const classes = useStyles();

    // Only one checkbox can be selected
    const [checked, setChecked] = useState({
        private: setting === 'private',
        semiPrivate: setting === 'semi-private',
        public: setting === 'public'
    });

    const handleChange = (e) => {
        if (e.target.name === 'private') {
            setChecked({
                private: true,
                semiPrivate: false,
                public: false
            })
        } else if (e.target.name === 'semi-private') {
            setChecked({
                private: false,
                semiPrivate: true,
                public: false
            })
        } else {
            setChecked({
                private: false,
                semiPrivate: false,
                public: true
            })
        }
        // Update value in form
        submitInput('setting', e.target.name);
    }

    return (
        <>
            <div>
                <h1 className={classes.title}>{text.title[lang]}</h1>
                <p className={classes.description}>{text.desc[lang]}</p>
            </div>
            <div className={classes.flexCol}>
                <SettingField 
                title={text.field1[lang]} 
                description={text.desc1[lang]}
                icons={[<HomeIcon/>, <DirectionsBoatIcon/>, <PaletteIcon/>]}
                iconsLabels={text.labels1[lang]}
                checkBoxProps={{
                    name: 'private',
                    checked: checked.private,
                    onChange: handleChange
                }}/>
                <SettingField 
                title={text.field2[lang]} 
                description={text.desc2[lang]}
                icons={[<LocalBarIcon/>, <SpaIcon/>, <MeetingRoomIcon/>]}
                iconsLabels={text.labels2[lang]}
                checkBoxProps={{
                    name: 'semi-private',
                    checked: checked.semiPrivate,
                    onChange: handleChange
                }}/>
                <SettingField 
                title="Public" 
                description={text.desc3[lang]}
                icons={[<NaturePeopleIcon/>, <LocationCityIcon/>, <StorefrontIcon/>]}
                iconsLabels={text.labels3[lang]}
                checkBoxProps={{
                    name: 'public',
                    checked: checked.public,
                    onChange: handleChange
                }}/>
            </div>
        </>
    );
}

export default Setting;