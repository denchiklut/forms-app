import { combineReducers } from "redux"
import QuestionsReducers from './questions'
import Projects from './projects'
import GrafNodes from './graf/nodes'
import ActiveProject from './active-project'
import ActiveQuestion from './question-active'
import ObjectsReducers from './objects'
import EditedObject from './edit-object'
import GoogleAuth from './auth/googleReducer'
import AvtoReducer from './avto'
import { reducer  as formReducer } from 'redux-form'


const rootReducers = combineReducers({
    questions:      QuestionsReducers,
    objects:        ObjectsReducers,
    activeQuestion: ActiveQuestion,
    activeProject:  ActiveProject,
    editObjects:    EditedObject,
    avto:           AvtoReducer,
    auth:           GoogleAuth,
    nodes:          GrafNodes,
    projects:       Projects,
    form: formReducer
})

export default rootReducers
