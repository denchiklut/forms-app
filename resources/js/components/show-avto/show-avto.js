import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Fab from "@material-ui/core/Fab";
import CloseIcon from '@material-ui/icons/Close'
import Grid from '@material-ui/core/Grid';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import './show-avto.scss'

class ShowAvto extends Component {
    render() {
        const { fullScreen } = this.props;
        const { members } = this.props.item;

        console.log(this.props.item)
        return (
            <div>
                <Dialog
                    maxWidth   = { false }
                    fullScreen = { fullScreen }
                    open       = { this.props.isOpen }
                    className  = "form-container"

                >
                    <AppBar position="static" style={{background: 'linear-gradient(to right, #536976, #292e49)'}}>
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
                    <DialogContent className="showAvtoContainer">
                        <Grid container spacing={0}>
                            <Grid item xs={12} style={{paddingBottom: 0}}>
                                <div className="avtoInfo">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>МОДЕЛЬ</th>
                                                <th>СТОИМОСТЬ</th>
                                                <th>ВЫГОДА</th>
                                                <th>УСЛОВИЯ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {members.map(avto => (
                                                <tr key={avto.name}>
                                                    <td>{avto.name}</td>
                                                    <td>{avto.cost}</td>
                                                    <td>{avto.benefit}</td>
                                                    <td>{avto.conditions}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
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

ShowAvto.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
};

export default  withMobileDialog()(ShowAvto);
