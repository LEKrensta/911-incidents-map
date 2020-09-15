import { useEffect } from "react";
import { loadModules } from "esri-loader";

const useGraphics = ({ mapView, jsonGraphics }) => {
    useEffect(() => {
        if (!mapView || !jsonGraphics) {
          return;
        }
    
        let graphics = [];
        loadModules(['esri/Graphic']).then(([Graphic]) => {
          graphics = jsonGraphics.map(jsonGraphic => new Graphic(jsonGraphic));
          mapView.graphics.addMany(graphics);
        });
        return function removeGraphics() {
          mapView && mapView.graphics.removeMany(graphics);
        };
      }, [mapView, jsonGraphics]);
};

export default useGraphics;

