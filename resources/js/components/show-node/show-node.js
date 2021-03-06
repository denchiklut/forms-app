import React, {Component} from 'react'
import EmptyList from "../empty-list";
import './show-node.scss'

class ShowNode extends Component {

    rawMarkup = () => {
        let span = document.createElement('span');
        span.innerHTML= this.props.node.webValue;

        let rawMarkup = span.innerHTML
        return { __html: rawMarkup };
    }

    renderQuestion = () => <span dangerouslySetInnerHTML={this.rawMarkup()} style={{ overflowX: 'hidden' }}/>

    renderObject = () => {
        return (
            <div style={{width: '100%'}}>
                <div className="objectInfo">
                    <h4>Цена</h4>
                    <p>{this.props.node.objData.cost}</p>
                    <hr className="objInfoHr"/>
                    <h4>Место</h4>
                    <p>{this.props.node.objData.location}</p>
                    <hr className="objInfoHr"/>
                    <h4>Отделка</h4>
                    <p>{this.props.node.objData.otdelka}</p>
                    <hr className="objInfoHr"/>
                    <h4>Дата сдачи</h4>
                    <p>{this.props.node.objData.time}</p>
                    <hr className="objInfoHr"/>
                    <h4>Вид недвижимости</h4>
                    <p>{this.props.node.objData.view}</p>
                </div>
                <div className="dopInfo">
                     <pre>
                         {this.props.node.objData.dopInformation}
                     </pre>
                </div>
            </div>
        )
    }

    renderAvto = () => {
        return (
            <div style={{width: '100%'}}>
                <div className="avtoInfo">
                    <table>
                        <thead>
                        <tr>
                            <th>МОДЕЛЬ</th>
                            <th>СТОИМОСТЬ</th>
                            <th>ВЫГОДА</th>
                            <th>УСЛОВИЯ</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.node.avtData.members.map(avto => (
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
                <div className="dopInfo">
                    <pre>
                        {this.props.node.avtData.dopInformation}
                    </pre>
                </div>
            </div>
        )
    }

    renderError = object => {
        let arr = []

        Object.keys(object).map(key => {
            switch (key) {
                case "children":
                    arr.push({k: key, v: "[Array]"})
                    break
                case "nodeSvgShape":
                    arr.push({k: key, v: "[Object]"})
                    break
                case "parent":
                    arr.push({k: key, v: "[Object]"})
                    break
                case "_children":
                    return false
                case "_collapsed":
                    return false
                case "name":
                    arr.push({k: key, v: '""'})
                    break
                default:
                    arr.push({k: key, v: object[key] !== null ? object[key] : '""'})
                    break
            }
        })

        return (
            <div className="showErrorNode">
                <table>
                    <thead>
                        <tr>
                            <th>Свойство</th>
                            <th>Значение</th>
                        </tr>
                    </thead>
                    <tbody>

                    {arr.map(item => (
                        <tr key={item.k}>
                            <td>{item.k}</td>
                            <td>{item.v}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>
        )
    }

    render() {
        const { node } = this.props

        if ((node.type === "objects" && !node.objData ) || (node.type === "avto" && !node.avtData)) {
            return this.renderError(node)
        }

        if ( Object.keys(node).length === 0 ) return <EmptyList/>
        if ( node.type === "objects")  return <div className="showNode"> {this.renderObject()} </div>
        if ( node.type === "avto")  return <div className="showNode"> {this.renderAvto()} </div>
        return <div className="showNode showQst"> {this.renderQuestion()} </div>
    }
}

export default ShowNode
