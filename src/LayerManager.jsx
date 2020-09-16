import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { loadModules } from 'esri-loader';

const files = ['data/F01705150050.json', 'data/F01705150090.json']

const LayerManager = ({ mapView, selectedPoi, dialogOpen, setDialogOpen }) => {
    const [markers, setMakers] = useState([]);
    
    useEffect(() => {
        Promise.all(files.map(file =>
            fetch(file).then(response => response.json())
            )).then(json => {
                 setMakers(json);
            });
    }, []);

    useEffect(() => {
        if (markers.length && mapView) {
            let graphics = [];
            loadModules(['esri/Graphic']).then(([Graphic]) => {
                const pois = markers.map(poi => ({
                    geometry: {
                        type: 'point',
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
                graphics = pois.map(poi => new Graphic(poi));
                mapView.graphics.addMany(graphics);
            });
        }
    }, [markers, mapView]);

    return (
        <div>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6">
                        911 Incident Map
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default LayerManager;
