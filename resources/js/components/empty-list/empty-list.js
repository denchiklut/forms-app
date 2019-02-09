import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import './empty-list.scss'

class EmptyList extends Component {
    render() {
        return (
            <div>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{height: 'calc(100vh - 64px - 48px)', borderRight: '1px solid #0e0e0e24', background: '#e0e0e091'}}
                >
                    <Grid item xs={12}>
                        <div style={{width: '70%', margin: 'auto'}}>
                            <div className="noList" >
                                <h1 className="noMsg">There is nothing yet </h1>
                            </div>
                        </div>

                    </Grid>

                </Grid>
            </div>
        );
    }
}

export default EmptyList;
