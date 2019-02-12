import { combineReducers } from "redux"
import QuestionsReducers from './questions'
import Projects from './projects'
import ActiveProject from './active-project'
import ActiveQuestion from './question-active'
import { reducer  as formReducer } from 'redux-form'


const rootReducers = combineReducers({
    questions: QuestionsReducers,
    projects: Projects,
    activeProject: ActiveProject,
    activeQuestion: ActiveQuestion,
    form: formReducer
    // objects: ObjectsReducers,
})

export default rootReducers
