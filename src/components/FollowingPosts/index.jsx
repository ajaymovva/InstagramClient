import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { getFollowingPosts, likePosts, unlikePosts, addComment, deletePosts } from '../../actions/postActions';
import { useSelector } from 'react-redux';
import PostView from '../PostView';
import BaseComponent from '../Base';

export default function FollowingPosts() {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState({});
    const [showComments, setShowComments] = useState({});
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.userReducer.user);
    const isAuthenticated = useSelector(state => state.userReducer.isAuthenticated);
    

    useEffect(() => {
        setLoading(true);
        getFollowingPosts().then(data => {
            setLoading(false);
            setPosts(data);
        })
        .catch(err => {
            setLoading(false);
            setPosts([]);
        })
    }, []);

    const likePost = (postId) => {
        likePosts(postId).then(data => {
            const newPosts = posts.map(post => {
                if (data._id === post._id) {
                    return data;
                }
                return post;
            });
            setPosts(newPosts);
        })
            .catch(err => {
                setPosts([]);
            })
    };

    const unlikePost = (postId) => {
        unlikePosts(postId).then(data => {
            const newPosts = posts.map(post => {
                if (data._id === post._id) {
                    return data;
                }
                return post;
            });
            setPosts(newPosts);
        })
        .catch(err => {
            setPosts([]);
        });
    };

    const addComments = (event, postId) => {
        if (event.key === 'Enter') {
            addComment({ text: event.target.value, postId }).then(data => {
                const newPosts = posts.map(post => {
                    if (data._id === post._id) {
                        return data;
                    }
                    else {
                        return post;
                    }
                });
                setPosts(newPosts);
            })
            .catch(err => {
                console.log(err);
            });
        }
    }

    const deletePost = (postId) => {
        deletePosts({ postId }).then(data => {
            const newPosts = posts.filter(post => {
                return post._id !== data._id;
            });
            setPosts(newPosts);
        })
        .catch(err => {
            console.log(err);
        });
    };

    return (
        <Box>
            { isAuthenticated ? <PostView
                deletePost={deletePost}
                addComments={addComments}
                unlikePost={unlikePost}
                likePost={likePost}
                user={user}
                posts={posts}
                loading={loading}
                comments={comments}
                showComments={showComments}
                setComments={setComments}
                setShowComments={setShowComments}
            /> : <BaseComponent />}
        </Box>
    );
}
