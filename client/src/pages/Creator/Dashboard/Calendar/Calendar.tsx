import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateTime } from 'luxon';
import LuxonUtils from '@date-io/luxon';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useGetExperiencesQuery } from 'graphql-api';
import { useAppSelector } from 'hooks/redux';
import { useLanguageContext } from 'context/languageContext';

import { 
    MuiPickersUtilsProvider,  
    DateTimePicker
} from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import Button from 'components/GradientButton/GradientButton';
import Drawer from '@material-ui/core/Drawer';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import styles from './Calendar.styles';
const useStyles = makeStyles(styles);

type ExperienceOption = {
    _id: string;
    title: string;
}

const Calendar = () => {
    const { language, appText } = useLanguageContext();
    const { CreatorCalendar: text } = appText;
    const classes = useStyles();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const creatorId = useAppSelector(state => state.user.creatorId);

    // Start adding from the start of the next hour
    const [dateToAdd, setDateToAdd] = useState(DateTime.now().plus({ hour: 1 }).startOf('hour'));
    const [expToAdd, setExpToAdd] = useState('');
    const [openForm, setOpenForm] = useState(false);
    const [experienceOptions, setExperienceOptions] = useState<ExperienceOption[]>([]);

    const collapseDrawer = () => { setOpenForm(false); }

    // For closing the navigation drawer when resizing
    useEffect(() => {
        if (!isMobile) {
            collapseDrawer();
        }
    }, [isMobile]);

    useGetExperiencesQuery({
        variables: { creatorId },
        onCompleted: ({ experiences }) => {
            setExperienceOptions(experiences.map(({ _id, title }) => ({
                _id, title
            })));
        }
    });

    const handleAddSlot = (event: React.FormEvent) => {
        event.preventDefault();
    }

    const firstDayOfMonth = DateTime.now().startOf('month').toISODate();

    const addSlotForm = (
        <form className={classes.form} onSubmit={handleAddSlot}>
            <Tooltip 
            title={text.timezoneMessage}
            enterTouchDelay={50}
            placement="top-end">
                <InfoRoundedIcon className={classes.infoIcon} />
            </Tooltip>
            <h3 className={classes.formTitle}>{text.formTitle}</h3>
            <p className={classes.formDescription}>{text.formDescription}</p>
            <FormControl className={classes.formControl}>
                <FormLabel htmlFor="date" className={classes.formLabel}>
                    {text.dateAndTimeLabel}
                </FormLabel>
                <DateTimePicker 
                id="date"
                value={dateToAdd} 
                onChange={date => setDateToAdd(date as DateTime)}
                disablePast
                hideTabs
                minutesStep={30} 
                className={classes.formInput}
                DialogProps={{ className: classes.dateDialog }} />
            </FormControl>
            <FormControl className={classes.formControl}>
                <FormLabel htmlFor="experience" className={classes.formLabel}>
                    {text.experienceLabel}
                </FormLabel>
                <Select 
                value={expToAdd}
                onChange={e => setExpToAdd(e.target.value as string)}
                input={
                    <InputBase
                    className={`
                        ${classes.formInput}
                        ${classes.experienceSelect}
                    `} />
                }
                MenuProps={{ className: classes.experienceMenu }}>
                    {experienceOptions.map(exp =>
                        <MenuItem key={exp._id} value={exp._id}>
                            {exp.title}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
            <Button
            type="submit"
            variant="creator"
            className={classes.addSlotButton}>
                {text.addSlot}
            </Button>
        </form>
    );

    return (
        <MuiPickersUtilsProvider utils={LuxonUtils}>
            <main className={classes.root}>
                <div className={classes.calendar}>
                    <FullCalendar
                    plugins={[ 
                        dayGridPlugin,
                        interactionPlugin
                    ]}
                    // Use Montreal's timezone
                    timeZone="America/Toronto"
                    locale={language}
                    initialView="dayGridMonth"
                    selectable
                    // eventClick={handleUnselect}
                    eventTextColor="#2B2B2B"
                    eventColor="#ECEBE5"
                    // events={slots}
                    height="100%"
                    longPressDelay={50}
                    eventTimeFormat={{
                        hour: 'numeric',
                        minute: '2-digit',
                        meridiem: 'short'
                    }}
                    // selectAllow={info => {
                    //     // Allow clicking on a date or a single slot
                    //     return info.allDay ? 
                    //         true : isSlotValid(info.start, info.end, props.duration); 
                    // }}
                    // select={handleSelect}
                    headerToolbar={{
                        start: '',
                        center: '',
                        end: 'title prev next'
                    }}
                    validRange={{ 
                        start: firstDayOfMonth
                    }} 
                    fixedWeekCount
                    dayMaxEvents={3}
                    // moreLinkClick={() => 'day'}
                    />
                </div>
                {isMobile ?
                    <>
                        <button 
                        className={classes.openFormButton}
                        onClick={() => setOpenForm(true)}>
                            {text.formTitle}
                        </button>
                        <Drawer
                        open={openForm}
                        onClose={collapseDrawer}
                        anchor="bottom"
                        className={classes.formDrawer}>
                            {addSlotForm}
                        </Drawer>
                    </> :
                    <div className={classes.infosContainer}>
                        <div className={classes.dayDetails}>

                        </div>
                        {addSlotForm}
                    </div>}
            </main>
        </MuiPickersUtilsProvider>
    );
}

export default Calendar;