import { combineReducers } from "redux"
import QuestionsReducers from './questions'
import Projects from './projects'
import GrafNodes from './graf/nodes'
import ActiveProject from './active-project'
import ActiveQuestion from './question-active'
import ObjectsReducers from './objects'
import { reducer  as formReducer } from 'redux-form'


const rootReducers = combineReducers({
    questions: QuestionsReducers,
    projects: Projects,
    activeProject: ActiveProject,
    activeQuestion: ActiveQuestion,
    nodes: GrafNodes,
    objects: ObjectsReducers,
    form: formReducer
})

export default rootReducers
