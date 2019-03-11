import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
    return <Slide direction="right" {...props} />;
}


class ResultObject extends Component {
    state = {
        open: false,
        kaskad: [],
        obg: null,
    }

    handleClickOpen = (item) => {
        console.log(item)
        this.setState({ open: true, obg: item });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    renderObjRow = (item) => {
        return(
            <React.Fragment key={item.objData.name}>
                <TableRow >
                    <TableCell component="th" scope="row">
                        <Button variant="outlined" color="primary" onClick={() => this.handleClickOpen(item)}>
                            {item.objData.name}
                        </Button>
                    </TableCell>
                    <TableCell align="right">{item.objData.location}</TableCell>
                    <TableCell align="right">{item.objData.cost}</TableCell>
                    <TableCell align="right">{item.objData.time}</TableCell>
                    <TableCell align="right">{item.objData.otdelka}</TableCell>
                    <TableCell align="right">{item.objData.view}</TableCell>
                </TableRow>
            </React.Fragment>

        )
    }

    componentDidMount() {
        this.setState({kaskad: this.props.items})
    }

    render() {
        const items = this.state.kaskad
        return (
            <div>
                <Table className="resTable">
                    <TableHead style={{background: '#d8d8d8'}}>
                        <TableRow>
                            <TableCell>Название</TableCell>
                            <TableCell align="right">Расположение</TableCell>
                            <TableCell align="right">Цена</TableCell>
                            <TableCell align="right">Срок сдачи</TableCell>
                            <TableCell align="right">Отделка</TableCell>
                            <TableCell align="right">Вид</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { items.map(item => this.renderObjRow(item)) }
                    </TableBody>
                </Table>


                <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar position="static" >
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <div>
                      <pre style={{ whiteSpace: 'pre-wrap', margin: '15px'}}>
                          {this.state.obg ? this.state.obg.objData.dopInformation : null }
                      </pre>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default ResultObject;
