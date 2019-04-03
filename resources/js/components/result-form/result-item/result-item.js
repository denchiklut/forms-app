import React, { Component } from 'react'
import Button from "@material-ui/core/Button"
import ResultObject from "../result-object"
import ResultAvto from "../result-avto"


class ResultItem extends Component {

    lastObj = { value: null }

    renderQuestion = (item, currentChild, onNext) => {
        let span = document.createElement('span');
        span.innerHTML= item.webValue;

        const rawMarkup = () => {
            let rawMarkup = span.innerHTML
            return { __html: rawMarkup };
        }

        const onClick = (item, lastObj, clicked) => {
            onNext(item, lastObj, clicked)
        }

        return  (
            <div>
                <span dangerouslySetInnerHTML={rawMarkup()} />
                {item.answers.map(el =>
                    <Button
                        key={el}
                        size="small"
                        color="primary"
                        variant="outlined"
                        aria-label=" answer"
                        style={{margin: "5px", padding: "0 10px"}}
                        onClick={() => onClick(el, currentChild, item)}
                    >
                        {el}
                    </Button>
                )}
            </div>
        )

    }

    renderObj = (item, currentChild, onNext) => {

        let  kaskad = [], kaskadAnswers = []

        const findAnswer = (data) => {
            for (let i = 0; i < data.children.length; i++) {

                if (data.children[i].answer) {
                    return false // false: ЕСТЬ ОТВЕТЫ
                }
            }
            return true //true: НЕТ ответов
        }

        const findKaskad = (newData) => {
            let i, currentChild

            //Если с реди потомков узла есть хотябы один вопрос - это НЕ КАСКАД
            if (newData.type === "questions") return true
            //Находим потомков типа - ОБЪЕКТ
            if (newData.type === "objects" ) {

                //Добавляем в массив каскад Объект
                kaskad.push(newData)

                //Текущем узлом (нужен для поиска потомков по ответу) делаем найденный обьект
                this.lastObj = newData

                //Находим все ответы текущего объекта
                for (i = 0; i < this.lastObj.children.length; i++) {
                    //Добавляем ответы в массив ответов (У одного объекта может быть несколько потомков)
                    if (this.lastObj.children[i].answer) kaskadAnswers.push(this.lastObj.children[i].answer)
                }
            }


            if (findAnswer(newData)) { // ЕСЛИ НЕТ ОТВЕТОВ КАСКАД!
                //Ищем рекурсивно в потомках объекты
                for (i = 0; i < newData.children.length; i++) {
                    currentChild = newData.children[i];

                    findKaskad(currentChild);
                }
            }
        }

        findKaskad(item)

        const click = (answer, lastObj, lost) => {
            if (kaskad.length > 1) {
                onNext(answer, lastObj, lost)
            } else {
                onNext(answer, lastObj, lastObj)
            }

        }

        return(
            <div>
                <ResultObject items={ kaskad.length !== 0 ? [...kaskad] : [item] } />
                {kaskadAnswers.map(answer =>
                    <Button
                        key={answer}
                        size="small"
                        color="primary"
                        variant="outlined"
                        aria-label=" answer"
                        style={{margin: "5px", padding: "0 15px"}}
                        onClick={() => click(answer, this.lastObj, item.lost)}
                    >
                        {answer}
                    </Button>)}
            </div>
        )
    }

    renderAvto = (item, currentChild, onNext) => {

        let lastObj = {}, kaskad = [], kaskadAnswers = []

        const findAnswer = (data) => {
            for (let i = 0; i < data.children.length; i++) {

                if (data.children[i].answer) {
                    return false // false: ЕСТЬ ОТВЕТЫ
                }
            }
            return true //true: НЕТ ответов
        }

        const findKaskad = (newData) => {
            let i, currentChild

            //Если с реди потомков узла есть хотябы один вопрос - это НЕ КАСКАД
            if (newData.type === "questions") return true
            //Находим потомков типа - ОБЪЕКТ
            if (newData.type === "objects" || newData.type === "avto") {

                //Добавляем в массив каскад Объект
                kaskad.push(newData)
                //Текущем узлом (нужен для поиска потомков по ответу) делаем найденный обьект
                lastObj = newData
                //Находим все ответы текущего объекта
                for (i = 0; i < lastObj.children.length; i++) {
                    //Добавляем ответы в массив ответов (У одного объекта может быть несколько потомков)
                    if (lastObj.children[i].answer) kaskadAnswers.push(lastObj.children[i].answer)
                }
            }


            if (findAnswer(newData)) { // ЕСЛИ НЕТ ОТВЕТОВ КАСКАД!
                //Ищем рекурсивно в потомках объекты
                for (i = 0; i < newData.children.length; i++) {
                    currentChild = newData.children[i];

                    findKaskad(currentChild);
                }
            }
        }

        findKaskad(item)

        return(
            <div>
                <ResultAvto items={ kaskad.length !== 0 ? [...kaskad] : [item] } />
                {kaskadAnswers.map(item =>
                    <Button
                        key={item}
                        size="small"
                        color="primary"
                        variant="outlined"
                        aria-label=" answer"
                        style={{margin: "5px", padding: "0 15px"}}
                        onClick={() => onNext(item, lastObj)}
                    >
                        {item}
                    </Button>)}
            </div>
        )
    }


    render() {
        const {item, currentChild, onNext} = this.props

        return (
            <div className="answerCard">
                { item.type === "objects" ? this.renderObj(item, currentChild, onNext) :
                    item.type === "avto" ? this.renderAvto(item, currentChild, onNext) :
                        this.renderQuestion(item, currentChild, onNext)
                }
            </div>
        )
    }
}

export default ResultItem
