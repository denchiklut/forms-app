import {combineReducers} from "redux";
import QuestionsReducers from './questions';
import ObjectsReducers from './objects';
import ActiveQuestion from './question-active';
import Projects from './projects'
import ActiveProject from './active-project'

const rootReducers = combineReducers({
    questions: QuestionsReducers,
    projects: Projects,
    activeProject: ActiveProject
    // activeQuestion: ActiveQuestion,
    // objects: ObjectsReducers,
})

export default rootReducers
