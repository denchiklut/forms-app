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
import './result-object.scss'

function Transition(props) {
    return <Slide direction="right" {...props} />;
}


class ResultObject extends Component {
    state = {
        open: false,
        obg: null,
    }

    handleClickOpen = (item) => {
        this.setState({ open: true, obg: item });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    renderDopInformation = item => {
        let span = document.createElement('span');
        span.innerHTML= item;

        const rawMarkup = () => {
            let rawMarkup = span.innerHTML
            return { __html: rawMarkup };
        }

        return  <span dangerouslySetInnerHTML={rawMarkup()} />

    }

    renderObjRow = (item) => {
        return(
            <React.Fragment key={item.objData.name}>
                <TableRow >
                    <TableCell component="th" scope="row">
                        <Button color="primary" onClick={() => this.handleClickOpen(item)}>
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

    render() {
        const {items} = this.props
        return (
            <div className="objectWrapperTable">
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
                    <TableBody className="objectBodyTable">
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
                          {this.state.obg ? this.renderDopInformation(this.state.obg.objData.webDopInformation) : null }
                      </pre>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default ResultObject;
