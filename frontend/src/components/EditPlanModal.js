import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import DatePicker from 'react-datepicker'

function CreatePlanModal(props) {
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
        <li>{`${props.formattedDate}, ${props.editTime}: ${props.editContent}`}</li>
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Enter Plan information:</DialogTitle>
        <DialogContent>
          <DatePicker
            placeholderText="Click to select a date"
            selected={props.editDate}
            onChange={props.handleDateChange}
          />
          <TextField
            margin="none"
            id="editTime"
            label="Approximate time"
            value={props.editTime}
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
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => {handleClose(); props.handleEditSubmit()}} color="primary">
            Edit Plan
          </Button>
          <Button onClick={(e) => {handleClose(); props.handleDelete()}} color="primary">
            Delete Plan
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreatePlanModal;
