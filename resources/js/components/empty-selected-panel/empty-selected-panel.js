import React from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import './empty-selected-panel.scss'

const EmptySelectedPanel = () => (
    <div className="EmptySelectedPanel">
        <Card className="btmCard">
            <CardContent>
                <Typography variant="h5" component="h2">
                    Select some node
                </Typography>
            </CardContent>
        </Card>
    </div>
);
export default EmptySelectedPanel
