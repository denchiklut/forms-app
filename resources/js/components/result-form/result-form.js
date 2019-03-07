import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchNodes} from "../../actions/graf/nodes";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import './result-form.scss'

function Transition(props) {
    return <Slide direction="right" {...props} />;
}

class ResultForm extends Component {

    state = {
        questionList: [],
        currentChild: null,
        open: false,
    }

    findNodes = (answer, newData) => {
        let i

        newData.children.map(
            item => {
                if (item.answer === answer) {

                    let answers = []
                    for (i= 0; i < item.children.length; i++) {
                        answers.push(item.children[i].answer)
                    }

                    this.setState(prevState => ({
                        questionList: [ ...prevState.questionList, {...item, answers: answers}],
                        currentChild: { ...item }
                    }))
                }
            }
        )


    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.activeProject !== this.props.activeProject) {
            this.props.history.push(`/play/${this.props.activeProject.value}`)
            this.props.fetchNodes(this.props.activeProject.value)
        }
    }


    componentDidMount() {
        let newData = {...this.props.nodes}
        this.findNodes("start", newData)
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div className="ResultForm">
                {this.state.questionList !== 0 ?
                    this.state.questionList.map(item =>
                        <div key={item.idd}>


                            {item.type === "objects" ?
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
                                    <TableRow key={item.objData.name}>
                                        <TableCell component="th" scope="row">
                                            <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                                                {item.objData.name}
                                            </Button>

                                        </TableCell>
                                        <TableCell align="right">{item.objData.location}</TableCell>
                                        <TableCell align="right">{item.objData.cost}</TableCell>
                                        <TableCell align="right">{item.objData.time}</TableCell>
                                        <TableCell align="right">{item.objData.otdelka}</TableCell>
                                        <TableCell align="right">{item.objData.view}</TableCell>
                                    </TableRow>
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
                                                {item.objData.dopInformation}
                                            </pre>
                                        </div>
                                    </Dialog>
                                </div>

                                 : <p key={item.idd}>{item.value}</p>
                            }

                            {item.answers.map(item =>
                                <Fab
                                    key={item}
                                    size="small"
                                    color="primary"
                                    variant="extended"
                                    aria-label=" answer"
                                    style={{margin: "auto 5px", padding: "0 15px"}}
                                    onClick={() => this.findNodes(item, this.state.currentChild)}
                                >
                                    {item}
                                </Fab>
                            )}
                        </div>
                    ): null}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeProject: state.activeProject,
        nodes: state.nodes
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchNodes: fetchNodes,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultForm);
