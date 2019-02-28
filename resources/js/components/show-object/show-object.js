import React, {Component} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Fab from "@material-ui/core/Fab";
import CloseIcon from '@material-ui/icons/Close'
import Grid from '@material-ui/core/Grid';
import './show-object.scss'


class ShowObject extends Component {
    render() {
        return (
            <div>
                <Dialog
                    fullWidth={true}
                    maxWidth={false}
                    open={this.props.isOpen}
                    className="form-container"

                >
                    <AppBar position="static" className="grafAppBar">
                        <Toolbar className='showObjToolBar'>
                            <Typography variant="h6" className="grafToolBarChip">
                                <Chip
                                    className="grafChip"
                                    color="secondary"
                                    label={this.props.item.name}
                                />
                            </Typography>
                            <div>
                                <Fab
                                    color="secondary"
                                    size="small"
                                    aria-label="Add"
                                    onClick={this.props.onClose}
                                    className="grafToolBarBtm"
                                >
                                    <CloseIcon />
                                </Fab>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <DialogContent className="showObjectContainer">
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={2} style={{paddingBottom: 0}}>
                                <div className="objectInfo">
                                    <h4>Цена</h4>
                                    <p>{this.props.item.cost}</p>
                                    <hr className="objInfoHr"/>
                                    <h4>Место</h4>
                                    <p>{this.props.item.location}</p>
                                    <hr className="objInfoHr"/>
                                    <h4>Отделка</h4>
                                    <p>{this.props.item.otdelka}</p>
                                    <hr className="objInfoHr"/>
                                    <h4>Дата сдачи</h4>
                                    <p>{this.props.item.time}</p>
                                    <hr className="objInfoHr"/>
                                    <h4>Вид недвижимости</h4>
                                    <p>{this.props.item.view}</p>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={10} style={{paddingBottom: 0}}>
                                <div className="dopInfo">
                                    <pre>
                                        {this.props.item.dopInformation}
                                    </pre>
                                </div>
                            </Grid>
                        </Grid>
                    </DialogContent>

                </Dialog>
            </div>
        );
    }
}

export default ShowObject;
