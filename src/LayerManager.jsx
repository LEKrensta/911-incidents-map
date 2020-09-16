import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { loadModules } from "esri-loader";

const files = ["data/F01705150050.json", "data/F01705150090.json"];

const useStyles = makeStyles({
  button: {
    color: "#fff",
  },
  input: {
    display: "none",
  },
});

const LayerManager = ({ mapView }) => {
  const styles = useStyles();
  const [markers, setMakers] = useState([]);

  /**
   * Fetches the local dummy data
   */
  useEffect(() => {
    Promise.all(
      files.map((file) => fetch(file).then((response) => response.json()))
    ).then((json) => {
      setMakers(json);
    });
  }, []);

  /**
   * Adds the markers to the map 
   */
  useEffect(() => {
    if (markers.length && mapView) {
      let graphics = [];
      loadModules(["esri/Graphic"]).then(([Graphic]) => {
        const pois = markers.map((poi) => ({
          geometry: {
            type: "point",
            latitude: poi.address.latitude,
            longitude: poi.address.longitude,
          },
          symbol: {
            type: "simple-marker",
            color: [226, 119, 40],
            outline: {
              color: [255, 255, 255],
              width: 2,
            },
          },
          attributes: poi,
        }));
        graphics = pois.map((poi) => new Graphic(poi));
        mapView.graphics.addMany(graphics);
      });
    }
  }, [markers, mapView]);

  /**
   * *Simulates* uploading a file to the server
   */
  const handleFileUpload = (file) => {
    const fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = (e) => {
      setMakers([...markers, JSON.parse(e.target.result)]);
    };
  };

  return (
    <div>
      <AppBar>
        <Toolbar>
          <Grid container justify="space-between">
            <Typography variant="h6">911 Incident Map</Typography>
            <input
              accept="application/JSON"
              className={styles.input}
              id="upload-button"
              type="file"
              onChange={(event) => handleFileUpload(event.target.files[0])}
            />
            <label htmlFor="upload-button">
              <Button variant="contained" color="primary" component="span">
                Upload
              </Button>
            </label>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default LayerManager;
