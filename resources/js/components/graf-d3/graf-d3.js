import React, { Component } from 'react'
import Tree from 'react-d3-tree'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import PlayArrow from '@material-ui/icons/PlayArrow'
import Chip from "@material-ui/core/Chip"
import SpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import EditIcon from '@material-ui/icons/Edit'
import ShareIcon from '@material-ui/icons/Share'
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined'
import AddCommentIcon from '@material-ui/icons/AddComment'
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined'
import UnarchiveIcon from '@material-ui/icons/Unarchive'
import ArchiveIcon from '@material-ui/icons/Archive'
import RestoreIcon from '@material-ui/icons/Restore'
import CloudUpload from '@material-ui/icons/CloudUpload'
import CloudDownload from '@material-ui/icons/CloudDownload'
import Hidden from '@material-ui/core/Hidden'
import { Link } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import purple from '@material-ui/core/colors/purple'
import red from '@material-ui/core/colors/red'
import uuid from "uuid"

import GrafSelectedPanel from '../graf-selected-panel'
import AppBar from '@material-ui/core/AppBar'
import GrafAddForm from "../garf-add-form"
import AddDopInfo from "../add-dopInfo"
import AddBackup from "../add-backup"
import GetBackup from "../get-backup"
import EmptyGraf from "../empty-graf"
import './graf-3d.scss'
import DeletedPage from "../deleted-page";

const svgStyle = {
    nodes: {
        node: {
            circle: {
                fill: "#a94690",
                stroke: '#837086',
                strokeWidth: 1,
                transform: 'scale(2,2)'

            }
        },
        leafNode: {
            circle: {
                fill: "#a94690",
                stroke: '#837086',
                strokeWidth: 1,
                transform: 'scale(2,2)'
            }
        }
    }
}


class GrafD3 extends Component {

    state = {
        isOpen: false,
        openUpload: false,
        getBackup: false,
        showTrash: false,
        insert: false,
        data: {
            idd:  0,
            name: '',
            answer: '',
            children: [],
            dopInformation: null
        },
        open: false,
        hidden: false,
        client: false,
        dopInfo: false,
        selected: [],
        copied: null
    }

    handleClick = () => {
        this.setState(state => ({
            open: !state.open,
        }));
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleCloseUpload = () => {
        this.setState({ openUpload: false });
    };

    getTrash = () => {
        this.setState({showTrash: true})
    }

    closeTrash = () => {
        this.setState({showTrash: false})
    }

    onRestoreTrash = (data) => {
        this.props.restoreFromTrash(this.props.activeProject.value, data)
        this.closeTrash()
    }

    onSaveBackup = data => {
        this.props.onResore(data)
        this.closeGetBackup()
    }

    openGetBackup = () => {
        this.setState({getBackup: true})
    }

    closeGetBackup = () => {
        this.setState({getBackup: false})
    }

    onSaveUpload = desc => {
        let data = {project: this.props.project.value, desc: desc, nodes: this.state.data, user: this.props.auth}
        this.props.onAddBackup(data)
        this.handleCloseUpload()
    }

    openUpload = () => {
        this.setState({openUpload: true})
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    initGraf() {
        this.setState({data: {
                idd:  0,
                unique: uuid.v4(),
                project: { _id: this.props.project._id, name: this.props.project.value },
                name: 'Start',
                type: 'start',
                value: 'Start',
                answer: 'Start',
                children: [],
                dopInformation: {
                    value: "Дополнительная информация",
                    webValue: "<p>Дополнительная информация</p>"
                }
            }})
    }

    copyBranch = () => {
        let newData = {...this.state.selected[0]}
        let newSelected = []

        if (Object.keys(newData).length === 0) {
            alert("Сначала виделите узел в графе")
            return true
        }

        const clrData = newData => {
            let i, currentChild

            newSelected.push(newData)
            delete(newData.id)
            delete(newData.parent)
            delete(newData.depth)
            delete(newData._collapsed)
            delete(newData._children)
            delete(newData.x)
            delete(newData.y)

            if (newData.children)  {
                for (i = 0; i < newData.children.length; i ++) {
                    currentChild = newData.children[i];
                    clrData(currentChild);
                }
            }
        }

        clrData(newData)
        this.coloriseNode(newSelected, "#ff8e53", "#f57100")

        this.setState({copied: newData})

    }

    pasteBranch = () => {
        let newData = {...this.state.data}
        let searches = [...this.state.selected]
        let pastedData = {...this.state.copied}

        const findNodebyId = () => {

            const cngData = myData => {
                let i, currentChild

                myData.unique = uuid.v4()
                if (myData.children)  {

                    for (i = 0; i < myData.children.length; i++) {
                        currentChild = myData.children[i];
                        currentChild.unique = uuid.v4()

                        cngData(currentChild);
                    }
                } else {
                    myData.children = []
                }
                return myData
            }

            let add = (searched, newData) => {

                if (searched.unique === newData.unique) {
                    newData.children.push( cngData(JSON.parse(JSON.stringify(pastedData))) )

                } else {

                    if (newData.children)
                    for (let i = 0; i < newData.children.length; i ++) {
                        add(searched, newData.children[i])
                    }
                    return false;
                }
            }

            if (Object.keys(pastedData).length === 0) {
                alert("Сначала склонируйте ветку")
                return true
            } else {
                searches.map(item => add(item, newData))
            }

        }

        findNodebyId()

        this.setState({selected: []},
            () => this.clr(this.state.data))

        this.props.onAddNode(pastedData, newData)
    }

    onAnswerUpdate = data => {
        let newData = {...this.state.data}
        let searchId = data.unique

        const findNodeById = function(searchId, newData) {
            let j, currentChild

            if (searchId === newData.unique) {
                newData.answer = data.answer
            }

            for (j = 0; j < newData.children.length; j += 1) {
                currentChild = newData.children[j];
                findNodeById(searchId, currentChild);
            }
        }

        findNodeById(searchId, newData)

        this.props.onAddNode(data, newData)

    }

    addNode = data => {
        let newData = {...this.state.data}
        let searches = [...this.state.selected]
        let newSelected = []

        const findNodebyId = () => {
            let add = (searched, newData) => {
                let j,
                    currentChild,
                    result;


                if (searched.unique === newData.unique) {

                    if (data.addQst.type === "objects") {
                        newData.children.push(
                            {
                                name:     data.addQst.value.substr(0, 11),
                                value:    data.addQst.value,
                                idd:      data.addQst._id,
                                type:     data.addQst.type,
                                objData:  data.addQst.data,
                                answer:   searched.idd === 0 ? 'start' : data.answer,
                                unique:   uuid.v4(),
                                children: [],
                                nodeSvgShape: {
                                    shape: 'rect',
                                    shapeProps: {
                                        fill: '#21cbf3',
                                        stroke: '#939fe4',
                                        width: 20,
                                        height: 20,
                                        x: -10,
                                        y: -10,
                                    }
                                }

                            })
                    } else if (data.addQst.type === "avto") {
                        newData.children.push(
                            {
                                name:     data.addQst.value.substr(0, 11),
                                value:    data.addQst.value,
                                idd:      data.addQst._id,
                                type:     data.addQst.type,
                                avtData:  data.addQst.data,
                                answer:   searched.idd === 0 ? 'start' : data.answer,
                                unique:   uuid.v4(),
                                children: [],
                                nodeSvgShape: {
                                    shape: 'rect',
                                    shapeProps: {
                                        fill: '#21cbf3',
                                        stroke: '#939fe4',
                                        width: 20,
                                        height: 20,
                                        x: -10,
                                        y: -10,
                                    }
                                }
                            })
                    } else {
                        newData.children.push(
                            {
                                name:     data.addQst.value.substr(0, 11),
                                value:    data.addQst.value,
                                webValue: data.addQst.webValue,
                                idd:      data.addQst._id,
                                type:     data.addQst.type,
                                answer:   searched.idd === 0 ? 'start' : data.answer,
                                unique:   uuid.v4(),
                                children: []
                            })
                    }

                    newSelected.push(newData.children[0])

                } else {

                    for (j = 0; j < newData.children.length; j += 1) {
                        currentChild = newData.children[j];

                        // Search in the current child
                        result = add(searched, currentChild);
                    }

                    // The node has not been found and we have no more options
                    return false;
                }
            }

            searches.map(item => add(item, newData))
        }

        findNodebyId()
        this.clr(this.state.data)

        this.setState({selected: newSelected },
            () => this.coloriseNode(this.state.selected))

        this.props.onAddNode(data, newData)
    }

    insertNode = data => {
        let newData = {...this.state.data}
        let searches = [...this.state.selected]
        let newSelected = []

        const findNodebyId = () => {
            let insert = (searched, newData) => {
                let j,
                    currentChild,
                    result;


                if (searched.unique === newData.unique) {
                    let oldChildren = newData.children ? newData.children.slice(): [];
                    newData.children = []

                    if (data.addQst.type === "objects") {
                        newData.children.push(
                            {
                                name:     data.addQst.value.substr(0, 11),
                                value:    data.addQst.value,
                                idd:      data.addQst._id,
                                unique:   uuid.v4(),
                                type:     data.addQst.type,
                                objData:  data.addQst.data,
                                answer:   searched.idd === 0 ? 'start' : data.answer,
                                children: [...oldChildren],
                                nodeSvgShape: {
                                    shape: 'rect',
                                    shapeProps: {
                                        fill: '#21cbf3',
                                        stroke: '#939fe4',
                                        width: 20,
                                        height: 20,
                                        x: -10,
                                        y: -10,
                                    }
                                }
                            })
                    } else if (data.addQst.type === "avto") {
                        newData.children.push(
                            {
                                name:     data.addQst.value.substr(0, 11),
                                value:    data.addQst.value,
                                idd:      data.addQst._id,
                                unique:   uuid.v4(),
                                type:     data.addQst.type,
                                avtData:  data.addQst.data,
                                answer:   searched.idd === 0 ? 'start' : data.answer,
                                children: [...oldChildren],
                                nodeSvgShape: {
                                    shape: 'rect',
                                    shapeProps: {
                                        fill: '#21cbf3',
                                        stroke: '#939fe4',
                                        width: 20,
                                        height: 20,
                                        x: -10,
                                        y: -10,
                                    }
                                }
                            })
                    }  else {
                        newData.children.push(
                            {
                                name:     data.addQst.value.substr(0, 11),
                                value:    data.addQst.value,
                                webValue: data.addQst.webValue,
                                idd:      data.addQst._id,
                                unique:   uuid.v4(),
                                type:     data.addQst.type,
                                answer:   searched.idd === 0 ? 'start' : data.answer,
                                children: [...oldChildren]})
                    }

                    newSelected.push(newData.children[0])

                } else {

                    for (j = 0; j < newData.children.length; j += 1) {
                        currentChild = newData.children[j];

                        // Search in the current child
                        result = insert(searched, currentChild);
                    }

                    // The node has not been found and we have no more options
                    return false;
                }
            }

            searches.map(item => insert(item, newData))
        }

        findNodebyId()
        this.clr(this.state.data)

        this.setState({selected: newSelected },
            () => this.coloriseNode(this.state.selected))

        this.props.onAddNode(data, newData)
    }

    removeNode = () => {
        let newData = {...this.state.data}
        let searches = [...this.state.selected]

        const findNodeById = () => {
            let remove = (searchId, newData) => {
                let j,
                    currentChild,
                    result

                if (searchId === newData.unique) {
                    return true
                }

                else {
                    for (j = 0; j < newData.children.length; j ++) {
                        currentChild = newData.children[j];
                        result = remove(searchId, currentChild);

                        if (result) {
                            currentChild = null
                            newData.children.splice(j, 1)
                            return false
                        }
                    }
                    return false;
                }
            }

            searches.map(item => remove(item.unique, newData))
        }

        findNodeById()

        this.props.removeNode(this.state.selected[0], newData)
    }

    cutNode = () => {
        let newData = {...this.state.data}
        let searches = [...this.state.selected]

        const findNodeById = () => {
            let cut = (searched, newData) => {
                let j,
                    currentChild,
                    currentParent,
                    result

                if (searched.unique === newData.unique) {
                    return true
                }

                else {

                    for (j = 0; j < newData.children.length; j ++) {
                        currentChild = newData.children[j];

                        if (currentChild.unique === searched.unique) {
                            currentParent = newData
                        }
                        result = cut(searched, currentChild);

                        if (result) {

                            currentParent.children.map((item, i) => item.unique === searched.unique ? currentParent.children.splice(i, 1) : item)
                            currentParent.children.push(...searched.children)

                            const clrArr =  function (arr) {
                                arr.map(item => {
                                    item.children ? clrArr(item.children) : item.children = []
                                    delete(item.id)
                                    delete(item.parent)
                                    delete(item.depth)
                                    delete(item._collapsed)
                                    delete(item._children)
                                    delete(item.x)
                                    delete(item.y)
                                })
                            }

                            clrArr(newData.children)

                            return false
                        }
                    }
                    return false;
                }
            }

            searches.map(item => cut(item, newData))
        }

        findNodeById()

        this.props.removeNode(this.state.selected[0], newData)
    }

    clr = (newData) => {
        let currentChild, i;

        if (newData.nodeSvgShape) {
            if (newData.nodeSvgShape.shapeProps) {
                if (newData.nodeSvgShape.shape !== "rect") {
                    newData.nodeSvgShape.shapeProps.fill = "#a94690"
                    newData.nodeSvgShape.shapeProps.stroke = "#837086"
                } else {
                    newData.nodeSvgShape.shapeProps.fill = "#21cbf3"
                    newData.nodeSvgShape.shapeProps.stroke = "#939fe4"
                }
            }

        }

        if (newData.children) {
            for (i = 0; i < newData.children.length; i ++) {
                currentChild = newData.children[i];
                this.clr(currentChild);
            }
        }


        this.setState({data: newData})
    }

    coloriseNode = (nodeArr, fill="#ca2750", stroke="#f50057") => {
        let newData = {...this.state.data}
        let searchIds = nodeArr.map(node => node.unique)

        const findNodeById = () => {
            // colorize matched nodes
            let color = (searchId, newData) => {
                let j, currentChild

                if (searchId === newData.unique) {
                    if (newData.nodeSvgShape) {
                        if (newData.nodeSvgShape.shape !== "rect") {
                            newData.nodeSvgShape = {
                                shape: 'circle',
                                shapeProps: {
                                    r: 10,
                                    fill: fill,
                                    stroke: stroke
                                },
                            }
                        } else if (newData.nodeSvgShape.shape === "rect") {
                            newData.nodeSvgShape = {
                                shape: 'rect',
                                shapeProps: {
                                    fill: fill,
                                    width: 20,
                                    height: 20,
                                    x: -10,
                                    y: -10,
                                }
                            }
                        }
                    }else {
                        newData.nodeSvgShape = {
                            shape: 'circle',
                            shapeProps: {
                                r: 10,
                                fill: fill,
                                stroke: stroke
                            },
                        }
                    }

                }

                if (newData.children) {
                    for (j = 0; j < newData.children.length; j ++) {
                        currentChild = newData.children[j];
                        color(searchId, currentChild);
                    }
                }
            }

            searchIds.map(searchId => color(searchId, newData))
        }

        findNodeById()

        this.setState({ data: newData });

    }

    click = (nodeKey, e) => {
        this.clr(this.state.data)

        if (e.altKey) {

            let arr = [...this.state.selected];

            if (arr.find(item => item.unique === nodeKey.unique) !== undefined) {
                this.setState({selected: [...arr.filter(item => item.unique !== nodeKey.unique)].sort((a, b) => a.depth - b.depth)},
                    () => this.coloriseNode(this.state.selected))
            } else {
                this.setState({selected: [...arr, nodeKey].sort((a, b) => a.depth - b.depth)},
                    () => this.coloriseNode(this.state.selected))
            }

            return true
        }

        this.setState({selected: [nodeKey]}, () => {
            this.coloriseNode(this.state.selected)
            this.props.showNode(nodeKey)
        })
    }

    openAddNodeForm = () => {
        if (this.state.selected.length > 0) {
            this.setState({isOpen: true})
        } else {
            alert("Select node!")
        }
    }

    openDopInfoForm = () => {
        this.setState({dopInfo: true})
    }

    closeDopInfoForm = () => {
        this.setState({dopInfo: false})
    }

    saveDopInfo = data => {
        let newData = {...this.state.data, dopInformation: data}

        this.props.onAddNode(data, newData)
        this.closeDopInfoForm()
    }

    insertAddNodeForm = () => {
        if (this.state.selected.length > 0) {
            this.setState({isOpen: true, insert: true})
        } else {
            alert("Select node!")
        }

    }

    closeAddNodeForm = () => {
        this.setState(( { isOpen } ) => {
            return {isOpen: !isOpen }
        })
    }

    saveAddNode = data => {

        if (this.state.insert)  {
            this.insertNode(data)
            this.setState({insert: false})
        } else {
            this.addNode(data)
        }

        this.closeAddNodeForm()
    }

    componentDidMount() {
        this.initGraf()

        if (window.location.href.indexOf("/#/share") !== -1) {
            this.setState({client: true})
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.project !== prevProps.project) {
            this.initGraf()
            this.setState({selected: []})
        }

        if (this.props.grafNodes !== prevProps.grafNodes) {
            Object.keys(this.props.grafNodes ).length === 0 ? this.initGraf() : this.setState({data: this.props.grafNodes})
        }

    }

    render() {
        const actions = [
            { icon: <Link to={`/share/${this.props.activeProject.value}`} target="_blank" style={{padding: 8, textDecoration: "none",color: 'rgba(0, 0, 0, 0.54)'}}> <ShareIcon /></Link>, name: 'Share' },
            { icon: <RestoreIcon onClick = { this.getTrash }/>,  name: 'Корзина' },
            { icon: <CloudDownload onClick = { this.openGetBackup }/>,  name: 'Пул' },
            { icon: <CloudUpload onClick = { this.openUpload }/>,  name: 'Пуш' },
            { icon: <FileCopyIcon onClick = { this.insertAddNodeForm }/>,  name: 'Вставить' },
            { icon: <DeleteForeverOutlinedIcon onClick={this.cutNode} />,  name: ' Вырезать' },
            { icon: <ArchiveIcon onClick={this.pasteBranch} />,  name: ' Вставить ветку' },
            { icon: <UnarchiveIcon onClick={this.copyBranch} />,  name: 'Скопировать ветку' },
        ]

        const { hidden, open } = this.state

        if (Object.keys(this.props.activeProject).length === 0 )  {
            return <EmptyGraf />
        }

        const purpleT = createMuiTheme({
            palette: {
                primary: { main: purple[500] }, // Purple and green play nicely together.
                secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
            },
            typography: { useNextVariants: true },
        });

        const redT = createMuiTheme({
            palette: {
                primary: { main: red[500] }, // Purple and green play nicely together.
                secondary: { main: '#0d33ef' }, // This is just green.A700 as hex.
            },
            typography: { useNextVariants: true },
        });

        const dop = {
            "value": "Дополнительная информация",
            "webValue": "<p>Дополнительная информация</p>"
        }

        return (
            <div id="treeWrapper">
                <AppBar position="static" style={{background: 'linear-gradient(to right, #536976, #292e49)'}}>
                    <Toolbar className='grafToolBar'>
                        <Typography variant="h6" className="grafToolBarChip">
                            <Hidden smDown>
                            <Chip
                                className="grafChip"
                                color="secondary"
                                label={ this.props.activeProject.value  }
                            />
                            </Hidden>
                        </Typography>

                        {/* hide controll toolbar from client*/}
                        {this.state.client ? null:

                                <div style={{display: 'flex'}}>
                                    <MuiThemeProvider theme={purpleT}>
                                    <SpeedDial
                                        direction    = "left"
                                        ariaLabel    = "SpeedDial example"
                                        open         = { open }
                                        hidden       = { hidden}
                                        onFocus      = { this.handleOpen }
                                        onMouseEnter = { this.handleOpen }
                                        onClick      = { this.handleClick }
                                        onBlur       = { this.handleClose }
                                        onClose      = { this.handleClose }
                                        onMouseLeave = { this.handleClose }
                                        icon         = { <EditIcon /> }
                                        style        = {{ transform: 'scale(0.73)', marginRight: -56 }}
                                    >
                                        {actions.map(action => (
                                            <SpeedDialAction
                                                key          = { action.name }
                                                icon         = { action.icon }
                                                tooltipTitle = { action.name }
                                                onClick      = { this.handleClick }
                                            />
                                        ))}
                                    </SpeedDial>

                                    <Fab
                                        color="secondary"
                                        size="small"
                                        aria-label="Add"
                                        className="grafToolBarBtm"
                                        onClick = { this.openDopInfoForm }
                                    >
                                        <AddCommentIcon />
                                    </Fab>
                                    </MuiThemeProvider>

                                    <Fab
                                        color="secondary"
                                        size="small"
                                        aria-label="Delete"
                                        className="grafToolBarBtm"
                                        onClick = { this.removeNode }
                                    >
                                        <DeleteIcon />
                                    </Fab>
                                    <MuiThemeProvider theme={redT}>
                                    <Fab
                                        color="primary"
                                        size="small"
                                        aria-label="Add"
                                        className="grafToolBarBtm"
                                        onClick = { this.openAddNodeForm }
                                    >
                                        <AddIcon />
                                    </Fab>


                                    <Link to={`/play/${this.props.activeProject.value}`} style={{textDecoration: "none", color: "white"}}>
                                        <Fab
                                            color="secondary"
                                            size="small"
                                            aria-label="Play"
                                            className="grafToolBarBtm"
                                        >
                                            <PlayArrow fontSize="small" />
                                        </Fab>
                                    </Link>
                                    </MuiThemeProvider>
                                </div>
                        }

                    </Toolbar>
                </AppBar>

                <Tree
                    transitionDuration = { 0 }
                    collapsible        = { false }
                    orientation        = "vertical"
                    styles             = { svgStyle }
                    onClick            = { this.click }
                    textLayout         = {{ x: 28, y: 0, }}
                    data               = { this.state.data }
                    scaleExtent        = {{ min: 0.1, max: 8 }}
                />

                <GrafSelectedPanel
                    onAnswer={this.onAnswerUpdate}
                    selected={this.state.selected.length === 1 ? this.state.selected[0] : null}
                />


                {this.state.isOpen ?
                    <GrafAddForm
                        onAdd      = { this.saveAddNode }
                        answers    = { this.props.nodes }
                        isOpen     = { this.state.isOpen }
                        objects    = { this.props.objects }
                        avto       = { this.props.avto }
                        questions  = { this.props.questions }
                        onClose    = { this.closeAddNodeForm }
                        currentQst = { this.state.selected[0].idd }
                    />
                    : null}

                {this.state.dopInfo ?
                    <AddDopInfo
                        isOpen  = { this.state.dopInfo }
                        onAdd   = { this.saveDopInfo }
                        onClose = { this.closeDopInfoForm }
                        value   = { this.state.data.dopInformation ? this.state.data.dopInformation : dop }
                        project = { this.props.activeProject.value }
                    />
                    :null}

                {this.state.openUpload ?
                    <AddBackup
                        isOpen  = { this.state.openUpload }
                        onAdd   = { this.onSaveUpload }
                        onClose = { this.handleCloseUpload }
                    />
                :null}


                {this.state.getBackup ?
                    <GetBackup
                        isOpen     = { this.state.getBackup }
                        onAdd      = { this.onSaveBackup }
                        onClose    = { this.closeGetBackup }
                        getBackups = { this.props.getBackups }
                        backups    = { this.props.backups }
                        project    = { this.props.activeProject.value }
                    />
                    :null}

                {this.state.showTrash ?
                    <DeletedPage
                        isOpen     = { this.state.showTrash }
                        onAdd      = { this.onRestoreTrash }
                        onClose    = { this.closeTrash }
                        project    = { this.props.activeProject.value }
                    />
                    :null}
            </div>
        )
    }
}

export default GrafD3
