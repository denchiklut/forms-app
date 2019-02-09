import React, {Component} from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import './graf-selected-panel.scss'

function Children(props) {
    return(
        <ul>
            {props.items.map((item) => (
                <li key={item.id}>{item.name}</li>
            ))
            }
        </ul>
    )
}


class GrafSelectedPanel extends Component {
    render() {
        const { selected } = this.props
        if (!selected) {
            return(
                <Card className="btmCard" style={{position: 'fixed', bottom: 0, width: '100%'}}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Select some node
                        </Typography>
                    </CardContent>
                </Card>
            )
        }

        return(
            <Card className="btmCard" style={{position: 'fixed', bottom: 0, width: '100%'}}>
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
                        { selected.children ? <Children items={selected.children} />: 'Нет потомков'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Изменить данные</Button>
                </CardActions>
            </Card>
        )
    }
}

export default GrafSelectedPanel;
