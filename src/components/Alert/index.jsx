import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { clearAlert } from '../../actions/utilActions';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars() {
  const classes = useStyles();
  const alertInfo = useSelector(state => state.utilReducer.alertInfo);
  const [open, setOpen] = useState(alertInfo.open);
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
      dispatch(clearAlert());
    setOpen(false);
  };

  useEffect(() => {
    setOpen(alertInfo.open);
  },[alertInfo.open])

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={3000} 
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertInfo.severity}>
          {alertInfo.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
