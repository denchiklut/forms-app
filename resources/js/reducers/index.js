import { combineReducers } from "redux"
import QuestionsReducers from './questions'
import Projects from './projects'
import GrafNodes from './graf/nodes'
import ActiveProject from './active-project'
import ActiveQuestion from './question-active'
import ActiveNode from './node-active'
import ObjectsReducers from './objects'
import EditedObject from './edit-object'
import EditedAvto  from './edit-avto'
import GoogleAuth from './auth/googleReducer'
import AvtoReducer from './avto'
import ShareProject from './share'
import BackupReducer from './backup'
import RemovedQuestions from './removed-questions'
import RemovedOject from './removed-objects'
import RemovedAvto from './removed-avto'
import { reducer  as formReducer } from 'redux-form'


const rootReducers = combineReducers({
    questions:      QuestionsReducers,
    rmQuestions:    RemovedQuestions,
    objects:        ObjectsReducers,
    activeQuestion: ActiveQuestion,
    activeProject:  ActiveProject,
    backup:         BackupReducer,
    editObjects:    EditedObject,
    rmObjects:      RemovedOject,
    rmAvto:         RemovedAvto,
    avto:           AvtoReducer,
    activeNode:     ActiveNode,
    editAvto:       EditedAvto,
    auth:           GoogleAuth,
    nodes:          GrafNodes,
    projects:       Projects,
    isShared: ShareProject,
    form: formReducer
})

export default rootReducers
