import React, {Component} from 'react'
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import CardHeader from "@material-ui/core/CardHeader"
import EditIcon from '@material-ui/icons/Edit'
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar"

import ShowObject from '../show-object'
import ShowAvto from '../show-avto'
import EmptySelectedPanel from '../empty-selected-panel'
import GrafEditForm from "../graf-edit-form";
import './graf-selected-panel.scss'


class GrafSelectedPanel extends Component {
    state = {
        isOpen: false,
        isOpenEdit: false,
    }

    openObjectShow = () => {
        this.setState({isOpen: true})
    }

    onSaveAnswer = (data) => {
        this.setState(({ isOpenEdit }) => {
            return {isOpenEdit: !isOpenEdit }
        })
        this.props.onAnswer(data)
    }

    closeEdit = () => {
        this.setState(({ isOpenEdit }) => {
            return {isOpenEdit: !isOpenEdit }
        })
    }

    closeObjectShow = () => {
        this.setState(( { isOpen } ) => {
            return {isOpen: !isOpen }
        })
    }

    render() {
        const { selected } = this.props
        if (!selected) return <EmptySelectedPanel />

        const children = selected.children ? selected.children.map(item => <li key={item.answer}>{item.answer}: {item.name}</li> ) : null
        return(
            <div>
                <Card className="btmCard" style={{position: 'absolute', bottom: '-64px', width: '100%', boxShadow: '-1px -4px 5px -2px #00000066'}}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Recipe">
                                {selected.value ? (selected.value)[0] : 's'}
                            </Avatar>
                        }
                        action={
                            <IconButton
                                onClick={() => this.setState({isOpenEdit: true})}
                            >
                                <EditIcon />
                            </IconButton>
                        }
                        title = {selected.type === "start" ? `Start`: selected.type === "questions" ? `${selected.value.substr(0, 50)}` :
                            selected.type === "objects" || "avto" ?
                                <Button
                                    size    = "small"
                                    color   = "primary"
                                    style   = {{ marginLeft: '-6px'}}
                                    onClick = { this.openObjectShow }
                                >
                                    {selected.value}
                                </Button>: null}
                        subheader={selected.answer}
                        style={{padding: 16}}
                    />
                    {selected.children ?
                        <CardContent style={{padding: 0}}>
                            <Typography component="div">
                                <ul style={{margin: '0 0 0 -21px', listStyleType: 'none'}}> {children} </ul>
                            </Typography>
                        </CardContent>:
                        null}
                </Card>
                {this.state.isOpen ?
                    selected.type === "objects" ?
                    <ShowObject
                        item    = { selected.objData }
                        isOpen  = { this.state.isOpen }
                        onClose = { this.closeObjectShow }
                    />:
                    <ShowAvto
                        item    = { selected.avtData }
                        isOpen  = { this.state.isOpen }
                        onClose = { this.closeObjectShow }
                    />:  null}

                {this.state.isOpenEdit ?
                    <GrafEditForm
                        item    = { selected }
                        isOpen  = { this.state.isOpenEdit }
                        onEdit  = { this.onSaveAnswer }
                        onClose = { this.closeEdit }
                    />:
                    null}
            </div>

        )
    }
}

export default GrafSelectedPanel;
