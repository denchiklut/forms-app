import {combineReducers} from "redux";
import QuestionsReducers from './questions';
import Projects from './projects'
import ActiveProject from './active-project'
import ObjectsReducers from './objects';
import ActiveQuestion from './question-active';

const rootReducers = combineReducers({
    questions: QuestionsReducers,
    projects: Projects,
    activeProject: ActiveProject,
    activeQuestion: ActiveQuestion,
    // objects: ObjectsReducers,
})

export default rootReducers
