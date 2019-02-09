import {combineReducers} from "redux";
import QuestionsReducers from './questions';
import Projects from './projects'
import ActiveProject from './active-project'
import ActiveQuestion from './question-active';
import AddDialog from './add-dialog';
import EditDialog from './edit-dialog'
import ObjectsReducers from './objects';


const rootReducers = combineReducers({
    questions: QuestionsReducers,
    projects: Projects,
    activeProject: ActiveProject,
    activeQuestion: ActiveQuestion,
    showAddDialog: AddDialog,
    showEditDialog: EditDialog,
    // objects: ObjectsReducers,
})

export default rootReducers
