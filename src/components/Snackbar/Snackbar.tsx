import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {makeStyles, Theme} from '@material-ui/core/styles';
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../state/store";
import {setErrorText} from "../../state/reducers/app-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));


export default function ErrorSnackbar() {
    const error = useSelector<RootReducerType, string | null>(state => state.app.error)
    const classes = useStyles();
    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {

        if (reason === 'clickaway') {
            return;
        }
        dispatch(setErrorText(null))
    };

    return (
        <div className={classes.root}>
            <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {error} &#128557;
                </Alert>
            </Snackbar>
        </div>
    );
}


