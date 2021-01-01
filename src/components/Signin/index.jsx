import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Grid, Box } from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link, useHistory } from 'react-router-dom';
import api from '../../api/axios';
import { PATHS } from '../../api/config';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import { showSuccessAlert, showErrorAlert, showWarningAlert } from '../../actions/utilActions';

export default function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [email, setEmail] = useState('ajay@gmail.com');
  const [password, setPassword] = useState('Ajay@1');
  const [loading, setLoading] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [checked, setChecked] = useState(true);

  const isAllFieldsValid = () => {
    if(!isValidEmail){
      dispatch(showWarningAlert("Email is not Valid"));
      return false;
    }
    return true;
  };

  const postData = (event) => {
    if(isAllFieldsValid()){
      setLoading(true);
      api.post(PATHS.signin, { email, password }).then(response => {
        console.log(response);
        setLoading(false);
        if (response && response.data && response.data.success) {
          sessionStorage.setItem('jwt', JSON.stringify(response.data.success.token));
          sessionStorage.setItem('user', JSON.stringify(response.data.success.user));
          if(checked){
            localStorage.setItem('jwt', JSON.stringify(response.data.success.token));
            localStorage.setItem('user', JSON.stringify(response.data.success.user));
          }
          dispatch({ type: 'SET_USER', payload: response.data.success.user });
          dispatch(showSuccessAlert("Successfully logged in"));
          history.push('/');
        }
        else {
          if (response.data.error) {
            dispatch(showErrorAlert(response.data.error));
          }
        }
      })
        .catch(error => {
          setLoading(false);
          console.log(error.message);
        })
    }
    event.preventDefault();
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={7}>
        <Box display="flex" justifyContent="center" my={20}>
          <LockOpenIcon style={{ width: "100%", height: "50vh" }} />
        </Box>
      </Grid>
      <Grid item xs={5}>
        <Box display="flex" justifyContent="center" my={30} mr={20}>
            <Box>
            <Box className="home" display="flex" justifyContent="center">
                Sign In Here
              </Box>
              <form>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  error={!isValidEmail}
                  helperText={isValidEmail ? "" : "Email is not valid"}
                  fullWidth
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if(/^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/i.test(event.target.value)){
                      setIsValidEmail(true);
                    }
                    else{
                      if(event.target.value.length > 0){
                        setIsValidEmail(false);
                      }
                      else{
                        setIsValidEmail(true);
                      }
                    }
                  }}
                  label="Email Address"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <FormControlLabel
                  control={<Checkbox checked={checked} onChange={() => setChecked(!checked)} color="primary" />}
                  label="Remember me"
                />
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color={loading ? "" : "primary"}
                  onClick={postData}
                  className={classes.submit}
                >
                  { loading ? <CircularProgress />: "Sign In" }
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link to="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
