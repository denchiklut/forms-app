import React, {Component} from 'react'
import EmptyList from "../empty-list";
import './show-node.scss'

class ShowNode extends Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.node.type === "questions") {
            this.renderQuestion()
        } else if (this.props.node.type === "objects") {
            this.renderObject()
        }
    }

    rawMarkup = () => {
        let span = document.createElement('span');
        span.innerHTML= this.props.node.webValue;

        let rawMarkup = span.innerHTML
        return { __html: rawMarkup };
    }

    renderQuestion = () => <span dangerouslySetInnerHTML={this.rawMarkup()} />

    renderObject = () => {
        return (
            <div>
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

    render() {
        const { node } = this.props

        if ( Object.keys(node).length === 0 ) return <EmptyList/>
        if ( node.type === "objects")  return <div className="showNode"> {this.renderObject()} </div>
        return <div className="showNode showQst"> {this.renderQuestion()} </div>
    }
}

export default ShowNode
