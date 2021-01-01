import { Box, Button, Grid } from '@material-ui/core';
import React from 'react';
import InstagramIcon from '@material-ui/icons/Instagram';
import { useHistory } from 'react-router-dom';
export default function BaseComponent() {
    const history = useHistory();
    return <Grid container spacing={2}>
        <Grid item xs={7}>
            <Box display="flex" justifyContent="center" my={20}>
                <InstagramIcon style={{ width: "100%", height: "60vh" }} />
            </Box>
        </Grid>
        <Grid item xs={5}>
            <Box display="flex" justifyContent="center" my={40}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center" className="home">
                            Welcome to Instagram
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box display="flex" justifyContent="flex-end">
                        <Button variant="contained" color="primary" onClick={() => history.push("/signin")}>Login</Button>
                        </Box>
                    </Grid>
                    <Grid item={6}>
                        <Box display="flex" justifyContent="flex-start">
                        <Button variant="contained" color="primary" onClick={() => history.push("/signup")}>Signup</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    </Grid>
}