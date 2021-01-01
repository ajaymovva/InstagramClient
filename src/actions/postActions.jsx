import  api  from '../api/axios';
import { PATHS } from '../api/config';

export const getAllPosts = async () => {
    const response = await api.get(PATHS.allPosts, true);
    if(response && response.data && response.data.success){
        return response.data.success;
    }
    else{
        return [];
    }
};

export const getFollowingPosts = async () => {
    const response = await api.get(PATHS.followingPosts, true);
    if(response && response.data && response.data.success){
        return response.data.success;
    }
    else{
        return [];
    }
};

export const getMyPosts = async () => {
    const response = await api.get(PATHS.myPosts, true);
    if(response && response.data && response.data.success){
        return response.data.success;
    }
    else{
        return [];
    }
};

export const likePosts = async (postId) => {
    const response = await api.post(PATHS.likePosts, { postId}, true);
    if(response && response.data && response.data.success){
        return response.data.success;
    }
    else{
        return [];
    }
};

export const unlikePosts = async (postId) => {
    const response = await api.post(PATHS.unlikePosts, { postId}, true);
    if(response && response.data && response.data.success){
        return response.data.success;
    }
    else{
        return [];
    }
};

export const addComment = async (reqObj) => {
    const response = await api.post(PATHS.addComent, reqObj, true);
    if(response && response.data && response.data.success){
        return response.data.success;
    }
    else{
        return [];
    }
};

export const deletePosts = async (reqObj) => {
    const response = await api.post(PATHS.deletePost, reqObj, true);
    if(response && response.data && response.data.success){
        return response.data.success;
    }
    else{
        return [];
    }
};