import React, { useEffect, useRef, useState } from 'react';
import { loadModules } from 'esri-loader';
import LayerManager from './LayerManager';

const WebMapView = () => {
    const [mapView, setMapView] = useState(null);
    const mapRef = useRef();

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
                setMapView(view);

                view.on("click", function (event) {
                    var screenPoint = {
                        x: event.x,
                        y: event.y
                    };

                    view.hitTest(screenPoint).then(function (response) {
                        if (response.results.length) {
                            var graphic = response.results[0];
                            console.log(graphic.graphic.attributes);
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
            <LayerManager />
            <div className="webmap" ref={mapRef} />
        </div>
    );
};

export default WebMapView;

