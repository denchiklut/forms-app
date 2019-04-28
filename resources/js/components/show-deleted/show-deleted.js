import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
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
        return (
            <div className="showObjectContainer" style={{width: '100%'}}>
                <Grid container spacing={0} style={{height: 'calc(100vh - 65px)'}}>
                    <Grid item xs={12} sm={3} style={{paddingBottom: 0}}>
                        <div className="objectInfo dltObj">
                            <h4>Цена</h4>
                            <p>{this.props.item.value.cost}</p>
                            <hr className="objInfoHr"/>
                            <h4>Место</h4>
                            <p>{this.props.item.value.location}</p>
                            <hr className="objInfoHr"/>
                            <h4>Отделка</h4>
                            <p>{this.props.item.value.otdelka}</p>
                            <hr className="objInfoHr"/>
                            <h4>Дата сдачи</h4>
                            <p>{this.props.item.value.time}</p>
                            <hr className="objInfoHr"/>
                            <h4>Вид недвижимости</h4>
                            <p>{this.props.item.value.view}</p>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={9} style={{paddingBottom: 0}}>
                        <div className="dopInfo">
                             <pre>
                                 {this.props.item.value.dopInformation}
                             </pre>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }

    renderAvto = () => {
        return (
            <div className="showAvtoContainer"
                 style={{width: '100%', height: 'calc(100vh - 65px)', display: 'flex', flexDirection: 'column'}}>
                <div className="avtoInfo dltAvto">
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
                        {this.props.item.value.members.map(avto => (
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
                                {this.props.item.value.dopInformation}
                            </pre>
                </div>
            </div>
        )
    }

    render() {

        if (!this.props.item) return <p>Select something</p>
        console.table(this.props.item)

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
