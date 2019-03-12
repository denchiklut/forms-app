import React from 'react';
import Grid from "@material-ui/core/Grid";
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
                <div className="noMsgContainer">
                    <div className="noList" >
                        <h1 className="noMsg">There is nothing yet </h1>
                    </div>
                </div>
            </Grid>
        </Grid>
    </div>
);

export default EmptyList;
