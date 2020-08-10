import React, {useState, useEffect} from 'react';
import uuid from 'react-uuid';

//Components
import Tip from '../../../../../components/Tip';
import TextField from '../../../../../components/Input/TextField';
import Checkbox from '../../../../../components/Input/Checkbox';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Chip from '@material-ui/core/Chip';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './ItemsStyles';
const useStyles = makeStyles(styles);

const Bring = ({toBring, submitInput}) => {
    const classes = useStyles();

    //For managing the included items
    const [formVal, setFormVal] = useState('');
    const handleFormChange = (e) => { setFormVal(e.target.value); }
    const [items, setItems] = useState([...toBring]);
    const addItem = (e) => {
        if(formVal.length > 0) {
            setItems([...items, {key: uuid(), item: formVal}]);
            setFormVal('');
        }
    }
    const removeItem = (delKey) => {
        const newItems = items.filter(item => item.key !== delKey);
        setItems(newItems);
    }
    useEffect(() => {
        submitInput('toBring', items);
    }, [items, submitInput]);

    //For handling checkbox changes
    const [bring, setBring] = useState(toBring.length > 0);
    const [showForm, setShowForm] = useState(toBring.length > 0);
    const handleBringCheck = (e) => {
        if(e.target.name === 'bringYes') {
            setBring(true);
            setShowForm(true);
        } else { //e.target.name === 'bringNo'
            setShowForm(false);
            setItems([]);
            setBring(false);
        }
    }

    //Add item if user presses enter
    const handleEnter = (e) => {
        if(e.keyCode === 13) { addItem(); }
    }

    return (
        <div onKeyDown={handleEnter}>
            <div>
                <h1 className={classes.title}>What to bring</h1>
                <p className={classes.description}>Should your guests be bringing anything?</p>
                <div className={classes.checkboxContainer}>
                    <div>
                        <Checkbox 
                        checked={bring} 
                        onChange={handleBringCheck}
                        name="bringYes"/>
                        <label className={classes.description}>Yes</label>
                    </div>
                    <div>
                        <Checkbox
                        checked={!bring} 
                        onChange={handleBringCheck}
                        name="bringNo"/>
                        <label className={classes.description}>No</label>
                    </div>
                </div>
            </div>
            {showForm &&
            <><div>
                <p className={classes.description}>What should your guests bring?</p>
                <Tip>Be as precise as possible so your guests can prepare appropriately.</Tip>
                <TextField 
                label="My guests need..." 
                placeholder="Ex: Paint brushes" 
                style={{width: 340, marginTop: '0.5rem' }} 
                value={formVal} 
                onChange={handleFormChange}/>
                <AddCircleIcon className={classes.addIcon} onClick={addItem}
                style={{ marginTop: '0.5rem' }}/>
            </div>
            <div className={classes.itemList}>
                {items.map(({key, item}) => (
                    <Chip key={key} label={item} onDelete={() => removeItem(key)} className="chip"/>
                ))}
            </div></>}
        </div>
    );
}

export default Bring;