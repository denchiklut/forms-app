import React from 'react'
import Button from "@material-ui/core/Button"
import ResultObject from "../result-object"
import ResultAvto from "../result-avto"


const renderQuestion = (item, currentChild, onNext) => {
    let span = document.createElement('span');
    span.innerHTML= item.webValue;

    const rawMarkup = () => {
        let rawMarkup = span.innerHTML
        return { __html: rawMarkup };
    }

    const onClick = (item, lastObj, fnode) => {
        onNext(item, lastObj, fnode)
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

const renderObj = (item, onNext) => {

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
        if (newData.type === "objects" ) {

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
            <ResultObject items={ kaskad.length !== 0 ? [...kaskad] : [item] } />
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

const renderAvto = (item, onNext) => {

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

const ResultItem = ({item, currentChild, onNext}) => {
    return (
        <div className="answerCard">
            { item.type === "objects" ? renderObj(item, onNext) : item.type === "avto" ? renderAvto(item, onNext) : renderQuestion(item, currentChild, onNext)}
        </div>
    )
}

export default ResultItem
