import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function EditAttractionModal(props) {
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
        <li>{`${props.editName} (${props.editClassification}): ${props.editDescription}`}</li>
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Enter Attraction information:</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="none"
            id="editName"
            label="Attraction name"
            value={props.editName}
            onChange={props.handleChange}
            fullWidth
          />
          <TextField
            margin="none"
            id="editClassification"
            label="Classification"
            value={props.editClassification}
            onChange={props.handleChange}
            fullWidth
          />
          <TextField
            margin="none"
            id="editDescription"
            label="Description"
            value={props.editDescription}
            onChange={props.handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => {handleClose(); props.handleEditSubmit()}} color="primary">
            Edit Attraction
          </Button>
          <Button onClick={(e) => {handleClose(); props.handleDelete()}} color="primary">
            Delete Attraction
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditAttractionModal;
