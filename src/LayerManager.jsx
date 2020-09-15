import React, { useEffect, useRef, useState } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import useGraphics from './hooks/useGraphics';

const LayerManager = () => {

    useEffect(() => {
        fetch('data/F01705150050.json')
        .then((r) => (r.json())
        .then((data) => console.log(data)));
    }, []);

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

