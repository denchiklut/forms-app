import React from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import './empty-selected-panel.scss'

const EmptySelectedPanel = () => (
    <div className="EmptySelectedPanel">
        <Card className="btmCard">
            <CardActionArea>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Select one node
                    </Typography>
                </CardContent>
            </CardActionArea>

        </Card>
    </div>
);
export default EmptySelectedPanel
