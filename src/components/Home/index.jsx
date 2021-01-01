import React, { useEffect, useState } from 'react';
import { getAllPosts, likePosts, unlikePosts, addComment, deletePosts } from '../../actions/postActions';
import { useSelector } from 'react-redux';
import { Box } from '@material-ui/core';
import PostView from '../PostView';
import BaseComponent from '../Base';

export default function RecipeReviewCard() {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState({});
    const [showComments, setShowComments] = useState({});
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.userReducer.user);
    const isAuthenticated = useSelector(state => state.userReducer.isAuthenticated);
    
    useEffect(() => {
        if (isAuthenticated) {
            setLoading(true);
            getAllPosts().then(data => {
                console.log(data);
                setPosts(data);
                setLoading(false)
            })
                .catch(err => {
                    setPosts([]);
                    setLoading(false);
                })
        }
    }, [isAuthenticated]);

    const likePost = (postId) => {
        likePosts(postId).then(data => {
            const newPosts = posts.map(post => {
                if (data._id === post._id) {
                    return data;
                }
                return post;
            });
            console.log(newPosts);
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
            console.log(newPosts);
            setPosts(newPosts);
        })
            .catch(err => {
                setPosts([]);
            });
    };

    const addComments = (postId) => {
        if (comments[postId] && comments[postId].length > 0) {
            addComment({ text: comments[postId], postId }).then(data => {
                const tempComments = { ...comments };
                tempComments[postId] = "";
                setComments(tempComments);
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
            console.log(data);
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
