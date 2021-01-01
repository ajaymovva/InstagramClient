import React, {useEffect} from 'react';
import { Route, Switch, useHistory, useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Home from '../Home/index';
import Profile from '../Profile/index';
import Signin from '../Signin/index';
import Signup from '../Signup/index';
import CreatePost from '../CreatePost/index';
import UserProfile from '../UserProfile';
import FollowingPosts from '../FollowingPosts/index';

function Routing() {
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const pathName = location.pathname;

    const configureRoutes = () => {
        let user = JSON.parse(sessionStorage.getItem("user"));
        if(!user){
            user = JSON.parse(localStorage.getItem("user"));
            if(user){
                sessionStorage.setItem('user', localStorage.getItem('user'));
                sessionStorage.setItem('jwt', localStorage.getItem('jwt'));
            }
        }
        if(user){
            dispatch({ type: "SET_USER", payload: user});
            history.push(pathName);
        }
        else{
            if(pathName === '/signin' || pathName === '/signup' || pathName === '/'){
                history.push(pathName);
            }
            else{
                history.push('/signin');
            }
        }
    };
    
    useEffect(() => {
        configureRoutes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathName]);
    return <Switch>
        <Route exact path='/'>
            <Home />
        </Route>
        <Route exact path='/profile'>
            <Profile />
        </Route>
        <Route path='/signin'>
            <Signin />
        </Route>
        <Route path='/signup'>
            <Signup />
        </Route>
        <Route path="/createPost">
            <CreatePost />
        </Route>
        <Route exact path='/profile/:userId'>
            <UserProfile />
        </Route>
        <Route exact path='/myFollowingPosts'>
            <FollowingPosts />
        </Route>
    </Switch>
}

export default Routing;