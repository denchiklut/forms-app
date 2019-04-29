import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import LayersClear from '@material-ui/icons/LayersClear'
import './show-deleted.scss';

class ShowDeleted extends Component {

    rawMarkup = () => {
        let span = document.createElement('span');
        span.innerHTML= this.props.item.webName;

        let rawMarkup = span.innerHTML
        return { __html: rawMarkup };
    }

    renderQuestion = () => <div className="shwQst"><span dangerouslySetInnerHTML={this.rawMarkup()} style={{ overflowX: 'hidden' }}/></div>

    renderObject = () => {
        const item = this.props.item;
        return (
            <div className="showObjectContainer">
                <Grid container spacing={0} className="dltObjContainer" >
                    <Grid item xs={12} sm={3} style={{paddingBottom: 0}}>
                        <div className="objectInfo dltObjInfo">
                            <h4>Цена</h4>
                            <p>{item.value.cost}</p>
                            <hr className="objInfoHr"/>
                            <h4>Место</h4>
                            <p>{item.value.location}</p>
                            <hr className="objInfoHr"/>
                            <h4>Отделка</h4>
                            <p>{item.value.otdelka}</p>
                            <hr className="objInfoHr"/>
                            <h4>Дата сдачи</h4>
                            <p>{item.value.time}</p>
                            <hr className="objInfoHr"/>
                            <h4>Вид недвижимости</h4>
                            <p>{item.value.view}</p>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={9} style={{paddingBottom: 0}}>
                        <div className="dopInfo">
                             <pre>
                                 {item.value.dopInformation}
                             </pre>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }

    renderAvto = () => {
        const item = this.props.item;

        return (
            <div className="showAvtoContainer dltAvtoContainer">
                <div className="avtoInfo dltAvtoInfo">
                    <table>
                        <thead>
                        <tr>
                            <th style={{padding: 15}}>МОДЕЛЬ</th>
                            <th style={{padding: 15}}>СТОИМОСТЬ</th>
                            <th style={{padding: 15}}>ВЫГОДА</th>
                            <th style={{padding: 15}}>УСЛОВИЯ</th>
                        </tr>
                        </thead>
                        <tbody>
                        {item.value.members.map(avto => (
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

                <div className="dopInfo" style={{flexGrow: 1}}>
                    <pre>
                        {item.value.dopInformation}
                    </pre>
                </div>
            </div>
        )
    }

    render() {

        if (!this.props.item) {
            return (
                <div className="backupEmpty" style={{ boxShadow: '-3px 0px 3px #0000003d'}}>
                    <LayersClear className="emIcon"/>
                </div>
            )
        }

        switch (this.props.item.type) {
            case 'question':
                return this.renderQuestion()
            case 'object':
                return  this.renderObject()
            case 'avto':
                return  this.renderAvto()

            default: return null
        }
    }
}

export default ShowDeleted;
