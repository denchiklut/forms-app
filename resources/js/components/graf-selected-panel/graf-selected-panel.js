import React, {Component} from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import ShowObject from '../show-object'
import GrafEditForm from "../graf-edit-form";
import './graf-selected-panel.scss'

class GrafSelectedPanel extends Component {
    state = {
        isOpen: false
    }

    renderChildren(arr = []) {
        return arr.map(item => {
            return (
                <li key={item.idd}>{item.answer}: {item.name}</li>
            )
        })
    }

    openObjectShow = () => {
        this.setState({isOpen: true})
    }

    closeObjectShow = () => {
        this.setState(( { isOpen } ) => {
            return {isOpen: !isOpen }
        })
    }

    render() {
        const { selected } = this.props
        if (!selected) {
            return(
                <Card className="btmCard" style={{position: 'absolute', bottom: '-64px', width: '100%',  boxShadow: '-1px -4px 5px -2px #00000066'}}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Select some node
                        </Typography>
                    </CardContent>
                </Card>
            )
        }

        const children = this.renderChildren(selected.children)


        return(
            <div>
                <Card className="btmCard" style={{position: 'absolute', bottom: '-64px', width: '100%', boxShadow: '-1px -4px 5px -2px #00000066'}}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            {selected.type === "questions" ? `Question id:  ${selected.idd}` : selected.type === "objects" ? `Object id:  ${selected.idd}` : selected.idd}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {selected.type === "questions" ?
                                `${selected.value} (${selected.answer})` : selected.type === "objects" ?
                                <div>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={this.openObjectShow}
                                    >
                                        {selected.value}
                                    </Button>
                                    ({selected.answer})</div>: null}
                        </Typography>
                        <Typography  color="textSecondary">
                            children:
                        </Typography>
                        <Typography component="div">
                            { selected.children ? <ul> {children} </ul>: 'Нет потомков'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Изменить данные</Button>
                    </CardActions>
                </Card>
                {this.state.isOpen ?    <ShowObject
                    item    = { selected.objData }
                    isOpen  = { this.state.isOpen }
                    onClose = { this.closeObjectShow }
                />: null}


                {/*<GrafEditForm />*/}
            </div>

        )
    }
}

export default GrafSelectedPanel;
