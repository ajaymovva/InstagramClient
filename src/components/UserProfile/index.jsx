import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserDetails, followUserAction, unFollowUserAction } from '../../actions/userActions';
import { Box } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { useDispatch } from 'react-redux';
import PersonIcon from '@material-ui/icons/Person';
import CircularProgress from '@material-ui/core/CircularProgress';
import {showSuccessAlert } from '../../actions/utilActions';
import SimpleUnFollowAlert from '../SimpleUnFollowAlert';

  
function UserProfile() {
    const [userDetails, setUserDetails] = useState(null);
    const [showFollow, setFollow] = useState(true);
    const { userId } = useParams();
    const dispatch = useDispatch();
    const [dialogDetails, setDialogDetails] = useState({});
    const user = useSelector(state => state.userReducer.user);

    const followUser = (followId, name) => {
        followUserAction(followId, dispatch).then(response => {
            const newUserDetails = { ...userDetails };
            newUserDetails.user = response.followedUser;
            setUserDetails(newUserDetails);
            dispatch(showSuccessAlert(`You are following ${name}`));
            setFollow(false);
        })
        .catch(err => {
            console.log(err);
        });
    }

    const unFollowUser = (followId, name) => {
        unFollowUserAction(followId, dispatch).then(response => {
            const newUserDetails = { ...userDetails };
            newUserDetails.user = response.followedUser;
            setUserDetails(newUserDetails);
            dispatch(showSuccessAlert(`You unfollowed ${name}`));
            setFollow(true);
            handleClose();
        })
        .catch(err => {
            console.log(err);
        });
    }

    const setUnFollow = (followId, name) => {
        setDialogDetails({
            open: true,
            followId,
            name
        });
    };

    const handleClose = () => {
        setDialogDetails({
            open: false,
            followId: "",
            name: ""
        });
    }

    useEffect(() => {
        getUserDetails(userId).then(userDetails => {
            if(userDetails.user && userDetails.user.followers && userDetails.user.followers.length > 0){
                userDetails.user.followers.forEach(eachUser => {
                    if(user && eachUser === user._id){
                        setFollow(false);
                    }
                });
            }
            setUserDetails(userDetails);
        })
    }, [user, userId]);

    return (
        <>
            { userDetails ? <div style={{ maxWidth: "1100px", margin: "0px auto" }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    margin: "18px 0px",
                    borderBottom: "1px solid grey"
                }}>
                    <Box>
                        <PersonIcon style={{ width: "100%", height: "30vh" }} />
                    </Box>
                    <div className="profile">
                        <h1>{userDetails.user.name}</h1>
                        <h3>{userDetails.user.email}</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '128%' }}>
                            <h4>{userDetails.posts ? userDetails.posts.length : "0"} posts </h4>
                            <h4>{userDetails.user.followers.length} followers</h4>
                            <h4>{userDetails.user.following.length} following</h4>
                        </div>
                        <Box my={2}>
                            {showFollow ? <Button variant="contained" color="primary" onClick={() => followUser(userDetails.user._id, 
                                    userDetails.user.name)}>
                                Follow
                                </Button> :
                                <Button startIcon={<CheckIcon/>} variant="contained" color="primary" onClick={() => setUnFollow(userDetails.user._id, 
                                    userDetails.user.name)}>
                                    Following
                                </Button>
                            }
                        </Box>
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
            </div> : <Box display="flex" justifyContent="center"><CircularProgress /></Box>}
            <SimpleUnFollowAlert dialogDetails={dialogDetails} handleClose={handleClose} unFollowUser={unFollowUser}/>
        </>
    );
}

export default UserProfile;