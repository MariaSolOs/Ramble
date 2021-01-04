import React, {useState} from 'react';

//Components and icons
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

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './SettingStyles';
const useStyles = makeStyles(styles);

const Setting = ({setting, submitInput}) => {
    const classes = useStyles();

    //Only one checkbox can be selected
    const [checked, setChecked] = useState({
        private: setting === 'private',
        semiPrivate: setting === 'semi-private',
        public: setting === 'public'
    });

    const handleChange = (e) => {
        if(e.target.name === 'private') {
            setChecked({
                private: true,
                semiPrivate: false,
                public: false
            })
        } else if(e.target.name === 'semi-private') {
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
        //Update value in form
        submitInput('setting', e.target.name);
    }

    return (
        <>
            <div>
                <h1 className={classes.title}>Setting</h1>
                <p className={classes.description}>
                    In what kind of environment will your experience take place?
                </p>
            </div>
            <div className={classes.flexCol}>
                <SettingField 
                title="Private" 
                description="There will be no one around except my guests."
                icons={[<HomeIcon/>, <DirectionsBoatIcon/>, <PaletteIcon/>]}
                iconsLabels={['Your home', 'Boat', 'Studio']}
                checkBoxProps={{
                    name: 'private',
                    checked: checked.private,
                    onChange: handleChange
                }}/>
                <SettingField 
                title="Semi Private" 
                description="This experience will be held in an enclosed setting but there 
                might be people other than my guests around."
                icons={[<LocalBarIcon/>, <SpaIcon/>, <MeetingRoomIcon/>]}
                iconsLabels={['Closed bar', 'Spa', 'Backroom']}
                checkBoxProps={{
                    name: 'semi-private',
                    checked: checked.semiPrivate,
                    onChange: handleChange
                }}/>
                <SettingField 
                title="Public" 
                description="This experience is held in a public space."
                icons={[<NaturePeopleIcon/>, <LocationCityIcon/>, <StorefrontIcon/>]}
                iconsLabels={['Park', 'Streets', 'Café']}
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