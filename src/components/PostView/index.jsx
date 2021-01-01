import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import CommentIcon from '@material-ui/icons/Comment';
import PersonIcon from '@material-ui/icons/Person';


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 800,
        margin: "10px auto"
    },
    media: {
        height: 500, // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: "#37474f",
        margin: "10px auto",
    },
}));

export default function PostView(props) {
    const classes = useStyles();
    const { user, posts, deletePost, comments,
        showComments, setComments, setShowComments,
        likePost, unlikePost, addComments, loading } = props;
    return (
        <Box>
            { loading ? <Box display="flex" justifyContent="center"><CircularProgress /></Box> :
                posts.length === 0 ? <Box display="flex" justifyContent="center">
                    <Box>
                        <VisibilityOffIcon style={{ width: "100%", height: "40vh" }} />
                        <Box display="flex" justifyContent="center" className="profile"><Box>
                            <h1>No Posts to Display</h1>
                            <h3>Follow Other Accounts To Improve Feed</h3>
                            </Box>
                        </Box>
                    </Box>
                </Box> :
                    posts.map((post, index) => <Card key={index} className={classes.root}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    <PersonIcon />
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    {post.postedBy._id === user._id && <DeleteIcon onClick={() => deletePost(post._id)} />}
                                </IconButton>
                            }
                            title={<Link to={post.postedBy._id !== user._id ? "/profile/" + post.postedBy._id : "/profile"}
                                style={{ color: 'black', textDecoration: 'none' }}><strong>{post.postedBy.name}</strong></Link>
                            }
                            subheader={new Date(post.createdAt).toLocaleString()}
                        />
                        <CardContent>

                            <Typography variant="body2" color="textSecondary" component="pre">
                                {post.description}
                            </Typography>
                            <img style={{ width: "100%", height: "600px" }}
                                src={post.photo}
                                alt="profile"
                            />
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <Box display="flex" justifyContent="flex-start" py={1} pl={2}>
                                        <Typography variant="button" color="textSecondary">
                                            <strong>{`${post.likes.length}${" likes"}`}</strong>
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box display="flex" justifyContent="flex-end" py={1} pr={2}>
                                        <Typography variant="button" color="textSecondary">
                                            <b>{`${post.comments.length} comments`}</b>
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <Box display="flex" justifyContent="center" py={1}>
                                        {post.likes.includes(user._id) ?
                                            <Box>
                                                <IconButton
                                                    onClick={() => unlikePost(post._id)}
                                                    color="inherit"
                                                >
                                                    <ThumbUpIcon style={{ color: '#2962ff' }} />&nbsp;
                                        <Box component="span" style={{ color: '#2962ff', fontSize: 16 }}>Like</Box>

                                                </IconButton>

                                            </Box> :
                                            <Box>
                                                <IconButton
                                                    onClick={() => likePost(post._id)}
                                                    color="inherit"
                                                >
                                                    <ThumbUpIcon />&nbsp;
                                        <Box component="span" style={{ fontSize: 16 }}>Like</Box>
                                                </IconButton>
                                            </Box>
                                        }

                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box display="flex" justifyContent="center" py={1}>
                                        <IconButton
                                            onClick={() => {
                                                const tempShowComments = { ...showComments };
                                                tempShowComments[post._id] = true;
                                                setShowComments(tempShowComments);
                                            }}
                                            color="inherit"
                                        >
                                            <CommentIcon /> &nbsp;<span style={{ fontSize: 16 }}>Comment</span>
                                        </IconButton>

                                    </Box>
                                </Grid>
                            </Grid>
                            {showComments[post._id] ? <FormControl fullWidth className={classes.margin} variant="outlined">
                                <InputLabel htmlFor={post._id}>Add a comment</InputLabel>
                                <OutlinedInput
                                    id={post._id}
                                    onChange={(event) => {
                                        const tempComment = { ...comments };
                                        tempComment[post._id] = event.target.value;
                                        setComments(tempComment);
                                    }}
                                    autoFocus
                                    value={comments[post._id]}
                                    endAdornment={<InputAdornment position="end">
                                        <Button color="secondary" disabled={!comments[post._id]} onClick={(event) => addComments(post._id)}>
                                            Post
                                </Button>
                                    </InputAdornment>}
                                    labelWidth={120}
                                />
                            </FormControl> : ""}
                        </CardContent>
                    </Card>)}
        </Box>);
}