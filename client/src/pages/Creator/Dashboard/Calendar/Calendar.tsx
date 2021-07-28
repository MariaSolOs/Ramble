import React, { useEffect, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateTime } from 'luxon';
import LuxonUtils from '@date-io/luxon';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useReactiveVar } from '@apollo/client';

import { 
    useGetSlotableExperiencesQuery,
    useGetSlotableOccurrencesLazyQuery,
    useCreateOccurrenceMutation
} from 'graphql-api';
import { useLanguageContext } from 'context/languageContext';
import { useUiContext } from 'context/uiContext';
import { userProfileVar } from 'store/user-cache';
import useCalendarReducer, { BULLET_COLORS } from './useCalendarReducer';

import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import Button from 'components/GradientButton/GradientButton';
import Drawer from '@material-ui/core/Drawer';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import styles from './Calendar.styles';
const useStyles = makeStyles(styles);

const Calendar = () => {
    const { language, appText } = useLanguageContext();
    const { CreatorCalendar: text } = appText;
    const { uiDispatch } = useUiContext();
    const classes = useStyles();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { creatorId } = useReactiveVar(userProfileVar);

    const [state, dispatch] = useCalendarReducer();

    const collapseDrawer = useCallback(() => {
        dispatch({ type: 'TOGGLE_DRAWER', open: false });
    }, [dispatch]);

    // Close the navigation drawer when resizing the window
    useEffect(() => {
        if (!isMobile) {
            collapseDrawer();
        }
    }, [isMobile, collapseDrawer]);

    const [getOccurrences] = useGetSlotableOccurrencesLazyQuery({
        onCompleted: (occurrences) => {
            dispatch({ type: 'SET_OCCURRENCES', occurrences });
        }
    });

    // Query created experiences
    useGetSlotableExperiencesQuery({
        variables: { creatorId },
        onCompleted: ({ experiences }) => {
            dispatch({ 
                type: 'SET_EXPERIENCE_OPTIONS', 
                options: experiences 
            });
            // From the fetched experiences, grab occurrences
            getOccurrences({
                variables: {
                    experienceIds: experiences.map(({ _id }) => _id)
                }
            });
        }
    });

    const [createOccurrence] = useCreateOccurrenceMutation({
        onCompleted: (occurrence) => {
            dispatch({ type: 'ADD_OCCURRENCE', occurrence });
        }
    });

    const handleAddSlot = (event: React.FormEvent) => {
        event.preventDefault();
        collapseDrawer();

        // Check if the new slot overlaps with existing ones
        for (const event of calendarEvents) {
            if ((event.dateStart <= state.addForm.endDate) && 
                (state.addForm.startDate <= event.dateEnd)) {
                uiDispatch({
                    type: 'OPEN_SNACKBAR',
                    message: text.busySlotMessage
                });
                return;
            }
        }

        // Create slot
        createOccurrence({
            variables: {
                experienceId: state.addForm.experience!._id,
                experienceCapacity: state.addForm.experience!.capacity,
                dates: {
                    start: state.addForm.startDate.toISO(),
                    end: state.addForm.endDate.toISO()
                }
            }
        });
    }

    const firstDayOfMonth = DateTime.now().startOf('month').toISODate();
    const dayDetailTitle = DateTime.now().hasSame(state.detailedDay, 'day') ?
        text.today : state.detailedDay.setLocale(language).toLocaleString(DateTime.DATE_HUGE);
    // Show both start and end time in calendar input
    const dateTimeFormat = `MMMM dd, yyyy ${
        state.addForm.startDate.toLocaleString(DateTime.TIME_24_SIMPLE)
    } - ${
        state.addForm.endDate.toLocaleString(DateTime.TIME_24_SIMPLE)
    }`;
    const calendarEvents = Array.from(state.occurrences.values()).flat();

    const dayDetails = (
        <div className={classes.dayDetails}>
            <h3 className={classes.sectionTitle}>
                {dayDetailTitle}
            </h3>
            {state.occurrences.get(state.detailedDay.toISODate())?.map(slot =>
                <div key={slot.id} className={classes.slotContainer}>
                    <p className={classes.slotTime}>
                        {`${slot.dateStart.toLocaleString(DateTime.TIME_SIMPLE)} - ${
                            slot.dateEnd.toLocaleString(DateTime.TIME_SIMPLE)
                        }`}
                    </p>
                    <h3 className={classes.slotTitle}> 
                        <span 
                        className={classes.slotBullet}
                        style={{
                            backgroundColor: BULLET_COLORS.get(slot.groupId!)
                        }} /> 
                        {slot.title}
                    </h3>
                    <p>{slot.numGuests}</p>
                    <ul>
                        {slot.bookings.map(booking =>
                            <li key={booking._id}>
                                <Avatar src={booking.clientPhoto}>
                                    {booking.clientName.charAt(0)}
                                </Avatar>
                                {`${booking.clientName} (${booking.numGuests})`}
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );

    const addSlotForm = (
        <form className={classes.form} onSubmit={handleAddSlot}>
            <Tooltip 
            title={text.timezoneMessage}
            enterTouchDelay={50}
            placement="top-end">
                <InfoRoundedIcon className={classes.infoIcon} />
            </Tooltip>
            <h3 className={classes.sectionTitle}>{text.formTitle}</h3>
            <p className={classes.sectionSubtitle}>{text.formDescription}</p>
            <FormControl className={classes.formControl}>
                <FormLabel htmlFor="date" className={classes.formLabel}>
                    {text.dateAndTimeLabel}
                </FormLabel>
                <DateTimePicker 
                id="date"
                value={state.addForm.startDate} 
                onChange={date => {
                    dispatch({ 
                        type: 'SET_ADD_DATE', 
                        startDate: date as DateTime
                    });
                }}
                disablePast
                hideTabs
                minutesStep={5} 
                format={dateTimeFormat}
                className={classes.formInput}
                DialogProps={{ className: classes.dateDialog }} />
            </FormControl>
            <FormControl className={classes.formControl}>
                <FormLabel htmlFor="experience" className={classes.formLabel}>
                    {text.experienceLabel}
                </FormLabel>
                <Select 
                value={state.addForm.experience?._id || ''}
                onChange={e => {
                    dispatch({ 
                        type: 'SET_ADD_EXPERIENCE',  
                        id: e.target.value as string
                    });
                }}
                input={
                    <InputBase
                    className={`
                        ${classes.formInput}
                        ${classes.experienceSelect}
                    `} />
                }
                MenuProps={{ className: classes.experienceMenu }}>
                    {state.addForm.experienceOptions.map(exp =>
                        <MenuItem key={exp._id} value={exp._id}>
                            {exp.title}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
            <Button
            type="submit"
            variant="creator"
            disabled={state.addForm.experienceOptions.length === 0}
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
                    eventContent={({ event }) => (
                        <>
                            <span 
                            className={classes.slotBullet}
                            style={{
                                backgroundColor: BULLET_COLORS.get(event.groupId)
                            }} />
                            {event.title}
                        </>
                    )}
                    eventDisplay="list-item"
                    events={calendarEvents}
                    eventClick={({ event }) => {
                        dispatch({
                            type: 'SET_DETAILED_DATE',
                            date: DateTime.fromISO(event.startStr)
                        });
                    }}
                    height="100%"
                    longPressDelay={50}
                    select={({ startStr }) => {
                        dispatch({
                            type: 'SET_DETAILED_DATE',
                            date: DateTime.fromISO(startStr)
                        });
                    }}
                    headerToolbar={{
                        start: '',
                        center: '',
                        end: 'title prev next'
                    }}
                    validRange={{ start: firstDayOfMonth }} 
                    fixedWeekCount
                    // moreLinkClick={() => 'day'}
                    dayMaxEvents={3} />
                </div>
                {isMobile ?
                    <>
                        <button 
                        className={classes.openFormButton}
                        onClick={() => {
                            dispatch({ type: 'TOGGLE_DRAWER', open: true });
                        }}>
                            {text.formTitle}
                        </button>
                        <Drawer
                        open={state.isDrawerOpen}
                        onClose={collapseDrawer}
                        anchor="bottom"
                        className={classes.formDrawer}>
                            {addSlotForm}
                        </Drawer>
                    </> :
                    <div className={classes.infosContainer}>
                        {dayDetails}
                        {addSlotForm}
                    </div>}
            </main>
        </MuiPickersUtilsProvider>
    );
}

export default Calendar;