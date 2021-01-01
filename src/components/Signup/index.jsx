import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Grid, Box } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link, useHistory } from 'react-router-dom';
import api from '../../api/axios';
import { PATHS } from '../../api/config';
import useStyles from './styles';
import { showSuccessAlert, showErrorAlert, isEmpty, showWarningAlert } from '../../actions/utilActions';
import { useDispatch } from 'react-redux';

export default function SignUp() {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEqual, setIsEqual] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [loading, setLoading] = useState(false); 
  const dispatch = useDispatch();
  const history = useHistory();

  const isAllFieldsValid = () => {
    if(!isEmpty(name)){
      dispatch(showWarningAlert('Username should not be empty'));
      return false;
    }
    else if(!isEmpty(email)){
      dispatch(showWarningAlert('Email should not be empty'));
      return false;
    }
    else if(!isEmpty(password)){
      dispatch(showWarningAlert('Password should not be empty'));
      return false;
    }
    else if(!isEmpty(confirmPassword)){
      dispatch(showWarningAlert('Confirm Password should not be empty'));
      return false;
    }
    else if(confirmPassword !== password){
      dispatch(showWarningAlert('Passwords Mismatch'));
      return false;
    }
    else if(!isValidEmail){
      dispatch(showWarningAlert("Email is not valid"));
      return false;
    }
    return true;
  }

  const postData = () => {
    if (isAllFieldsValid()) {
      setLoading(true);
      api.post(PATHS.signup, { name, email, password }).then(response => {
        setLoading(false);
        if (response.data.success) {
          dispatch(showSuccessAlert("Account created successfully please signin"));
          history.push('/signin');
        }
        else {
          setLoading(false);
          if (response.data.error) {
            dispatch(showErrorAlert(response.data.error));
          }
        }
      })
      .catch(error => {
        console.log(error.message);
      })
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={7}>
        <Box display="flex" justifyContent="center" my={20}>
          <PersonAddIcon style={{ width: "100%", height: "50vh" }} />
        </Box>
      </Grid>
      <Grid item xs={5}>
        <Box display="flex" justifyContent="center" my={25} mr={20}>
          <Box>
            <Box className="home" display="flex" mb={5} justifyContent="center">
              Create Your Account Here
              </Box>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    value={name}
                    fullWidth
                    onChange={(event) => setName(event.target.value)}
                    label="User Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    value={email}
                    error={!isValidEmail}
                    helperText={isValidEmail ? "" : "Email is not valid"}
                    fullWidth
                    onChange={(event) => {
                        setEmail(event.target.value);
                        // eslint-disable-next-line no-useless-escape
                        if(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(event.target.value)){
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
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    label="Password"
                    type="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    error={!isEqual}
                    fullWidth
                    value={confirmPassword}
                    helperText={isEqual ? "" : "Password Mismatched"}
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);
                      if(event.target.value.length > 0 && event.target.value !== password){
                        setIsEqual(false);
                      }
                      else{
                        setIsEqual(true);
                      }
                    }}
                    label="ConfirmPassword"
                    type="password"
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                color={loading ? "" : "primary"}
                variant="contained"
                onClick={postData}
                className={classes.submit}
              >
                { loading ? <CircularProgress />: "Sign Up" }
          </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to="/signin" variant="body2">
                    Already have an account? Sign in
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