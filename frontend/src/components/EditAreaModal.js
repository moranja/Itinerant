import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function CreateAreaModal(props) {
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
        <h3>{props.editName}</h3>
        <p>{props.editContent}</p>
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Enter Area information:</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="none"
            id="editName"
            label="Area name"
            value={props.editName}
            onChange={props.handleChange}
            fullWidth
          />
          <TextField
            margin="none"
            id="editContent"
            label="Description"
            value={props.editContent}
            onChange={props.handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => {handleClose(); props.handleEditSubmit(e)}} color="primary">
            Edit Area
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateAreaModal;
