import {combineReducers} from "redux";
import QuestionsReducers from './questions';
import ObjectsReducers from './objects';
import ActiveQuestion from './question-active';

const allReducers = combineReducers({
    questions: QuestionsReducers,
    activeQuestion: ActiveQuestion,
    objects: ObjectsReducers,
})

export default allReducers
