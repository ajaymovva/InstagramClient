import React, { useState, useEffect } from 'react';
import { Box } from '@material-ui/core'
import { useSelector } from 'react-redux';
import PersonIcon from '@material-ui/icons/Person';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getUserDetails } from '../../actions/userActions';

function Profile() {
    const [userDetails, setUserDetails] = useState(null);
    const user = useSelector(state => state.userReducer.user);
    console.log(user);

    useEffect(() => {
        if(user && user._id){
            getUserDetails(user._id).then(data => {
                setUserDetails(data);
            })
                .catch(err => {
                    setUserDetails(null);
                });
        }
    }, [user]);

    return (
        <>
        { userDetails ? 
            <Box style={{ maxWidth: "1100px", margin: "0px auto" }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    margin: "18px 10px",
                    borderBottom: "1px solid grey"
                }}>
                    <Box>
                        <PersonIcon style={{ width: "100%", height: "20vh" }} />
                    </Box>
                    <div className="profile">
                        <h1>{userDetails.user.name}</h1>
                        <h3>{userDetails.user.email}</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '128%' }}>
                            <h4>{userDetails.posts ? userDetails.posts.length : "0"} posts </h4>
                            <h4>{userDetails.user.followers.length} followers</h4>
                            <h4>{userDetails.user.following.length} following</h4>
                        </div>
                    </div>
                </div>
                <div className="gallery">
                    {userDetails ? userDetails.posts.map((post, index) => {
                        return <img key={index} className="item" 
                            src={post.photo}
                            alt="profile"
                        />
                    }) : ""}
                </div>
            </Box>
            : <Box display="flex" justifyContent="center"><CircularProgress /></Box>}
        </>
    );
}

export default Profile;