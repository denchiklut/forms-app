import React, {Component} from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import GrafEditForm from "../graf-edit-form";
import './graf-selected-panel.scss'


class GrafSelectedPanel extends Component {

    renderChildren(arr = []) {
        return arr.map(item => {
            return (
                <li key={item.id}>{item.name}</li>
            )
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
                            Question id: { selected.idd}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            { selected.name}
                        </Typography>
                        <Typography  color="textSecondary">
                            children
                        </Typography>
                        <Typography component="div">
                            { selected.children ? <ul> {children} </ul>: 'Нет потомков'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Изменить данные</Button>
                    </CardActions>
                </Card>
                {/*<GrafEditForm />*/}
            </div>

        )
    }
}

export default GrafSelectedPanel;
