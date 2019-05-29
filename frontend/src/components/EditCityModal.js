import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function CreateCityModal(props) {
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
        <h2>{props.editName}, {props.editCountry}</h2>
        <p>{props.editContent}</p>
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Enter City information:</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="none"
            id="editName"
            label="City name"
            value={props.editName}
            onChange={props.handleChange}
            fullWidth
          />
          <TextField
            margin="none"
            id="editCountry"
            label="Country"
            value={props.editCountry}
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
            Edit City
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateCityModal;
