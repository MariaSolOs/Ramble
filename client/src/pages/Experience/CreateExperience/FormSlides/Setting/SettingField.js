import React from 'react';

//Components and icons
import Checkbox from '../../../../../components/Input/Checkbox';
import Chip from '../../../../../components/Input/IconChip';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './SettingStyles';
const useStyles = makeStyles(styles);

const SettingField = ({title, description, icons, iconsLabels, checkBoxProps}) => {
    const classes = useStyles();

    return (
        <div className={classes.settingField}>
            <div className="checkbox">
                <Checkbox {...checkBoxProps}/>
            </div>
            <div className="content">
                <h3 className={classes.title}>{title}</h3>
                <p className={classes.description}>{description}</p>
                <div className="iconRow">
                    <div className={classes.iconBox}>
                        <Chip icon={icons[0]}/>
                        <span className={classes.iconLabel}>
                            {iconsLabels[0]}
                        </span>
                    </div>
                    <div className={classes.iconBox}>
                        <Chip icon={icons[1]}/>
                        <span className={classes.iconLabel}>
                            {iconsLabels[1]}
                        </span>
                    </div>
                    <div className={classes.iconBox}>
                        <Chip icon={icons[2]}/>
                        <span className={classes.iconLabel}>
                            {iconsLabels[2]}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default React.memo(SettingField, (prevProps, nextProps) => 
    (prevProps.checkBoxProps.checked === nextProps.checkBoxProps.checked));
