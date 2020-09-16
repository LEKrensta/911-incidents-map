import React, { useEffect, useRef, useState } from "react";
import { loadModules } from "esri-loader";
import LayerManager from "./LayerManager";
import PoiDialog from "./PoiDialog";

const WebMapView = () => {
  const mapRef = useRef();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [state, setState] = useState({
    mapView: null,
    selectedPoi: null,
  });

  /**
   * Creates the ESRI scene view and handles any clicks on the markers
   */
  useEffect(() => {
    loadModules(["esri/Map", "esri/views/SceneView"]).then(
      ([ArcGISMap, MapView]) => {
        const map = new ArcGISMap({
          basemap: "hybrid",
        });
        const view = new MapView({
          container: mapRef.current,
          map: map,
          center: [-100, 30],
          zoom: 3,
        });
        setState({
          ...state,
          mapView: view,
        });

        view.on("click", (event) => {
          const screenPoint = {
            x: event.x,
            y: event.y,
          };

          view.hitTest(screenPoint).then((response) => {
            if (response.results.length) {
              const graphic = response.results[0];
              setState({
                ...state,
                selectedPoi: graphic.graphic.attributes,
              });
              setDialogOpen(true);
            }
          });
        });

        return () => {
          if (view) {
            view.container = null;
          }
        };
      }
    );
  }, []);

  return (
    <div>
      <LayerManager mapView={state.mapView} selectedPoi={state.selectedPoi} />
      {dialogOpen && (
        <PoiDialog
          selectedPoi={state.selectedPoi}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
        />
      )}
      <div className="webmap" ref={mapRef} />
    </div>
  );
};

export default WebMapView;
