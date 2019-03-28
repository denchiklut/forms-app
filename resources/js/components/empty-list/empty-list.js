import React from 'react';
import Grid from "@material-ui/core/Grid";
import History from '@material-ui/icons/History'
import './empty-list.scss'

const EmptyList = () => (
    <div className="EmptyList">
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className="empty-grid"
        >
            <Grid item xs={12}>
                <History className="noIcon"/>
            </Grid>
        </Grid>
    </div>
);

export default EmptyList;
