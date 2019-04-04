import React, { Component } from 'react'
import Button from "@material-ui/core/Button"
import ResultObject from "../result-object"
import ResultAvto from "../result-avto"


class ResultItem extends Component {

    renderQuestion = (currentNode, lastNode, onNext) => {
        let span = document.createElement('span');
        span.innerHTML= currentNode.webValue;

        const rawMarkup = () => {
            let rawMarkup = span.innerHTML
            return { __html: rawMarkup };
        }

        const onClick = (answer, lastNode, clickedNode) => {
            // console.log("answer", answer, "lastNode", lastNode, "clickedNode", clickedNode)
            // console.log("============== onClick =============")
            onNext(answer, lastNode, clickedNode)
        }

        return  (
            <div>
                <span dangerouslySetInnerHTML={rawMarkup()} />
                {currentNode.answers.map(answer =>
                    <Button
                        key={answer}
                        size="small"
                        color="primary"
                        variant="outlined"
                        aria-label=" answer"
                        style={{margin: "5px", padding: "0 10px"}}
                        onClick={() => onClick(answer, lastNode, currentNode)}
                    >
                        {answer}
                    </Button>
                )}
            </div>
        )

    }

    renderObj = (currentNode, lastNode, onNext) => {

        const onClick = (answer, lastNode, clickedNode) => {
            onNext(answer, lastNode, clickedNode)
        }

        const answersList = currentNode.isKaskad ? currentNode.kaskadAnswers : currentNode.answers
        const objectsList = currentNode.isKaskad ? [...currentNode.kaskad] : [currentNode]

        return  (
            <div>
                <ResultObject items={ objectsList } />
                {answersList.map(answer =>
                    <Button
                        key        = { answer }
                        size       = "small"
                        color      = "primary"
                        variant    = "outlined"
                        aria-label = " answer"
                        style      = {{margin: "5px", padding: "0 10px"}}
                        onClick    = {() => onClick(answer, lastNode, currentNode)}
                    >
                        {answer}
                    </Button>
                )}
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
        const {currentNode, lastNode , onNext} = this.props

        return (
            <div className="answerCard">
                { currentNode.type === "objects" ? this.renderObj(currentNode, lastNode, onNext) :
                    currentNode.type === "avto" ? this.renderAvto(currentNode, lastNode, onNext) :
                        this.renderQuestion(currentNode, lastNode, onNext)
                }
            </div>
        )
    }
}

export default ResultItem
