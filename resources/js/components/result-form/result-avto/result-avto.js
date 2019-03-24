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
import './result-avto.scss'

const Transition = props => <Slide direction="right" {...props} />

class ResultAvto extends Component {
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

    rendeAvtoRow = (item) => {
        return(
            <React.Fragment key={item.avtData.name}>
                {item.avtData.members.map(avto => (
                    <TableRow >
                        <TableCell align="left">{avto.name}</TableCell>
                        <TableCell align="right">{avto.cost}</TableCell>
                        <TableCell align="right">{avto.benefit}</TableCell>
                        <TableCell align="right">{avto.conditions}</TableCell>
                    </TableRow>
                ))}

                <TableRow>
                    <TableCell component="td" scope="row">
                        <Button color="primary" onClick={() => this.handleClickOpen(item)}>
                            Дополнительная информация
                        </Button>
                    </TableCell>
                </TableRow>

            </React.Fragment>

        )
    }

    render() {
        const {items} = this.props
        return (
            <div className="avtoWrapperTable">
                <Table className="resTable">
                    <TableHead style={{background: '#d8d8d8'}}>
                        <TableRow>
                            <TableCell>МОДЕЛЬ</TableCell>
                            <TableCell align="right">СТОИМОСТЬ</TableCell>
                            <TableCell align="right">ВЫГОДА</TableCell>
                            <TableCell align="right">УСЛОВИЯ</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="avtoBodyTable">
                        { items.map(item => this.rendeAvtoRow(item)) }
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
                          {this.state.obg ? this.renderDopInformation(this.state.obg.avtData.webDopInformation) : null }
                      </pre>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default ResultAvto;
