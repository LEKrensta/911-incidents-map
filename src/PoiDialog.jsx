import React, { useState } from "react";
import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";

const PoiDialog = ({ selectedPoi, dialogOpen, setDialogOpen }) => {
  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onClose={handleClose}>
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        {selectedPoi.address.address_line1}
      </DialogTitle>
      <DialogContent>{JSON.stringify(selectedPoi, null, 2)}</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PoiDialog;
