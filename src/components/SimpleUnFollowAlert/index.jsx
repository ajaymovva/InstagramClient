import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

export default function SimpleUnFollowAlert(props) {
    return (
        <Dialog onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            open={props.dialogDetails.open}>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to unfollow
          </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.handleClose()} color="primary">
                    Cancel
          </Button>
                <Button onClick={() => props.unFollowUser(props.dialogDetails.followId, props.dialogDetails.name)}
                    color="primary" autoFocus>
                    Unfollow
          </Button>
            </DialogActions>
        </Dialog>
    );
}
