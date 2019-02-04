import {combineReducers} from "redux";
import QuestionsReducers from './questions';
import ObjectsReducers from './objects';
import ActiveQuestion from './question-active';

const rootReducers = combineReducers({
    questions: QuestionsReducers,
    // activeQuestion: ActiveQuestion,
    // objects: ObjectsReducers,
})

export default rootReducers
