import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function EditItineraryVitalModal(props) {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false)
  }

  return (
    <div>
      <div onClick={handleClickOpen}>
      <h4>{props.editNotes}</h4>
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Enter Itinerary information:</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="none"
            id="editNotes"
            multiline
            rows="4"
            label="Notes"
            value={props.editNotes}
            onChange={props.handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => {handleClose(); props.handleEditSubmit(e)}} color="primary">
            Edit Itinerary
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditItineraryVitalModal;
