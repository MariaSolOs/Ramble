import React, {useState, useEffect} from 'react';
import uuid from 'react-uuid';

//Components
import Tip from '../../../../../components/Tip/Tip';
import TextField from '../../../../../components/Input/TextField/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Chip from '@material-ui/core/Chip';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './ItemsStyles';
const useStyles = makeStyles(styles);

const Included = ({included, submitInput}) => {
    const classes = useStyles();

    //For managing the included items
    const [formVal, setFormVal] = useState('');
    const handleFormChange = (e) => { setFormVal(e.target.value); }
    const [items, setItems] = useState([...included]);
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
        submitInput('included', items);
    }, [items, submitInput]);

    //Add item if user presses enter
    const handleEnter = (e) => {
        if(e.keyCode === 13) { addItem(); }
    }

    return (
    <div onKeyDown={handleEnter}>
        <div style={{marginBottom: '0.5rem'}}>
           <h1 className={classes.title}>What's included</h1>
           <p className={classes.description}>Please list the items you will provide your guests for this experience.</p>
           <Tip>If your guests build or create something they will leave with, list it on here too.</Tip>
        </div>
        <div>
            <TextField label="I will provide..." placeholder="Ex: Paint brushes" style={{width: 340}} 
            value={formVal} onChange={handleFormChange}/>
            <AddCircleIcon className={classes.addIcon} onClick={addItem}/>
        </div>
        <div className={classes.itemList}>
            {items.map(({key, item}) => (
                <Chip 
                key={key} 
                label={item} 
                onDelete={() => removeItem(key)} 
                className="chip"/>
            ))}
        </div>
    </div>
   ); 
}

export default Included;