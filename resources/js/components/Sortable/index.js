import React, {Component} from 'react'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc'
import './index.scss'
import {Header, Textfield} from "react-mdl"

const SortableItem = SortableElement(({value}) =>
    <li className="questionItem">
        <p>{value}</p>
    </li>
);

const SortableList = SortableContainer(({items}) => {
    return (
        <ul className="questionList">
            {items.map((value, index) => (
                <SortableItem key={`item-${index}`} index={index} value={value}/>
            ))}
        </ul>
    );
});

class Sortable extends Component {


    state = {
        items: ['Вопрос 1', 'Вопрос 2', 'Вопрос 3', 'Вопрос 4', 'Вопрос 5', 'Вопрос 6', 'Вопрос 7', 'Вопрос 8', 'Вопрос 9', 'Вопрос 10', 'Вопрос 11', 'Вопрос 12'],
    };

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex),
        });
    };

    render() {
        return (<div className="SortableCls">
            <Header title="Вопросы" style={{background: "#4a4a4a", padding: 0}}>
                <Textfield
                    value=""
                    onChange={() => {
                    }}
                    label="Search"
                    expandable
                    expandableIcon="search"
                />
            </Header>
            <SortableList items={this.state.items} onSortEnd={this.onSortEnd}/>
        </div>)
    }
}

export default Sortable
