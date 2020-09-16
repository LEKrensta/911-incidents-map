import React, { useState, useEffect } from "react";
import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/styles";
import moment from "moment";

const useStyles = makeStyles({
  container: {
    maxHeight: "500px",
  },
});

const PoiDialog = ({ selectedPoi, dialogOpen, setDialogOpen }) => {
  const [weatherData, setWeatherData] = useState(null);
  const styles = useStyles();

  /**
   * Gets additonal weather data
   */
  useEffect(() => {
    const lat = selectedPoi.address.latitude;
    const lon = selectedPoi.address.longitude;
    const date = moment(selectedPoi.description.event_opened).format(
      "YYYY-MM-DD"
    );
    fetch(
      `https://api.meteostat.net/v2/point/hourly?lat=${lat}&lon=${lon}&start=${date}&end=${date}`,
      {
        headers: {
          "X-Api-Key": "UmOjM6jvvrnpB5lNM3tbWPmP03FqGMQf",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setWeatherData(data.data));
  }, [selectedPoi]);

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onClose={handleClose}>
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        {selectedPoi.address.address_line1}
      </DialogTitle>
      <DialogContent className={styles.container}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Weather</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{JSON.stringify(weatherData, null, 2)}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Other Data</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{JSON.stringify(selectedPoi, null, 2)}</Typography>
          </AccordionDetails>
        </Accordion>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PoiDialog;
