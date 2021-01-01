import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import { Box } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check';
import { useDispatch } from 'react-redux';
import api, { imageApi } from '../../api/axios';
import { PATHS, CLOUDINARY_URL } from '../../api/config';
import useStyles from './styles';
import { isEmpty, showSuccessAlert, showWarningAlert } from '../../actions/utilActions';

export default function CreatePost() {
    const classes = useStyles();
    const [description, setDescription] = useState('');
    const [imageUploading, setImageUploading] = useState(false);
    const [postloading, setPostLoading] = useState(false);
    const [image, setImage] = useState("");
    const [photo, setPhoto] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();

    const postData = () => {
        if(!isEmpty(description)){
            dispatch(showWarningAlert("Description should not be empty"));
            return;
        }
        if(!isEmpty(photo)){
            dispatch(showWarningAlert("Image should not be empty"));
            return;
        }
        if (photo) {
            setPostLoading(true);
            api.post(PATHS.createPost, { description, photo }, true).then(response => {
                setPostLoading(false);
                if (response.data.success) {
                    dispatch(showSuccessAlert("successfully uploaded"));
                    history.push('/');
                }
            })
                .catch(error => {
                    setPostLoading(false);
                    console.log("error while posting data");
                });
        }
    }

    const uploadingFile = (file) => {
        if (file) {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "insta-clone");
            data.append("cloud_name", "abcddcba");
            setImageUploading(true);
            imageApi.post(CLOUDINARY_URL, data)
                .then(response => {
                    setImageUploading(false);
                    if (response) {
                        setImage(file.name);
                        setPhoto(response.data.url);
                    }
                })
                .catch(err => {
                    setImageUploading(false);
                    console.log("error while uploading");
                    console.log(err.message);
                });
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={7}>
                <Box display="flex" justifyContent="center" my={20}>
                    <ImageSearchIcon style={{ width: "100%", height: "50vh" }} />
                </Box>
            </Grid>
            <Grid item xs={5}>
                <Box display="flex" justifyContent="center" my={30}>
                    <Box style={{ width: "80%" }}>
                        <Box className="home" display="flex" justifyContent="center">
                            Create Your Post
                        </Box>
                        {/* <form> */}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            multiline={true}
                            rows={4}
                            fullWidth
                            placeholder="What's on your mind"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            label="Description"
                            autoFocus
                        />
                        <Box my={2}>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <Box display="flex" justifyContent="center">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            style={{ display: "none" }}
                                            onChange={(event) => uploadingFile(event.target.files[0])}
                                            id="contained-button-file"
                                        />
                                        <label htmlFor="contained-button-file">
                                            <Button variant="contained" color="primary" startIcon={<PhotoCamera />} component="span">
                                                Add to post
                                        </Button>
                                        </label>
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box display="flex" justifyContent="center">
                                        <Button
                                            variant="contained"
                                            color={image ? "secondary" : ""}
                                            className={classes.button}
                                            startIcon={imageUploading ? <CircularProgress /> : image ? <CheckIcon /> : ""}
                                            onClick={() => {
                                                if (photo) {
                                                    window.open(photo);
                                                    return;
                                                }
                                            }}
                                        >
                                            {imageUploading ? "uploading" : image ? image : "No file chosen"}
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                        <Button
                            fullWidth
                            variant="contained"
                            color={postloading ? "" : "primary"}
                            onClick={postData}
                            className={classes.submit}
                        >
                            {postloading ? <CircularProgress /> : "POST"}
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}
