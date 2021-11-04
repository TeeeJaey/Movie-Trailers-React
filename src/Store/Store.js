import { createStore } from "redux";
import Constants from "../Utils/Constants";
import Utilities from "../Utils/Utilities";
import Actions from "../Store/Actions";

function Task(id, title, desc="")
{
    this.id = id;
    this.title = title;
    this.desc = desc;
    this.status = Constants.TaskStatus.TODO;
    this.createDate = Utilities.DateToString(new Date());
}

let lastId = 0;
const defaultState = {tasks:[], openTasks:[], shownTaskId:-1};

function reducer(state = defaultState, action) 
{
    switch(action.type) 
    {
        case Constants.TaskAction.ToggleForm: {
            let newState = {...state};
            newState.taskForm = action.payload.taskForm;
            newState.openTasks = newState.tasks.filter(x => x.status != Constants.TaskStatus.DONE);
            return newState;
        }

        case Constants.TaskAction.SetDisplayTask: {
            let newState = {...state};
            newState.shownTaskId = action.payload.shownTaskId;
            newState.openTasks = newState.tasks.filter(x => x.status != Constants.TaskStatus.DONE);
            return newState;
        }

        case Constants.TaskAction.GetState: {
            let newState = {...state};
            newState.openTasks = newState.tasks.filter(x => x.status != Constants.TaskStatus.DONE);
            return newState;
        }

        case Constants.TaskAction.Create_Task_Toggle: {
            let newState = {...state};
            newState.shownTaskId = -1;
            newState.editTaskToggle = false;
            newState.createTaskToggle = action.payload.createTaskToggle;
            newState.openTasks = newState.tasks.filter(x => x.status != Constants.TaskStatus.DONE);
            
            return newState;
        }

        case Constants.TaskAction.Create_Task_Submit: {
            let newState = {...state};
            lastId += 1;
            newState.shownTaskId = lastId;
            let task =  new Task(lastId, action.payload.title, action.payload.desc)
            newState.tasks.push(task);
            newState.openTasks = newState.tasks.filter(x => x.status != Constants.TaskStatus.DONE);

            return newState;
        }
        
        case Constants.TaskAction.Edit_Task_Toggle : {
            let newState = {...state};
            newState.shownTaskId = action.payload.shownTaskId;
            newState.editTaskToggle = action.payload.editTaskToggle;
            newState.openTasks = newState.tasks.filter(x => x.status != Constants.TaskStatus.DONE);
            
            return newState;
        }

        case Constants.TaskAction.Edit_Task_Submit : {
            let newState = {...state};
            newState.tasks = [...state.tasks];
            newState.openTasks = [...state.openTasks];

            let task =  newState.tasks.find(x => x.id == action.payload.id);
            task.title = action.payload.title;
            task.desc = action.payload.desc;
            newState.openTasks = newState.tasks.filter(x => x.status != Constants.TaskStatus.DONE);
            
            return newState;
        }
        
        case Constants.TaskAction.Update_Status : {
            let newState = {...state};
            newState.tasks = [...state.tasks];
            newState.openTasks = [...state.openTasks];

            let task =  newState.tasks.find(x => x.id == action.payload.id);
            task.status = action.payload.status;

            if(task.status == Constants.TaskStatus.ONGOING) {
                task.startDate = Utilities.DateToString(new Date());
                task.completeDate = "";
            }
            else if(task.status == Constants.TaskStatus.DONE) {
                task.completeDate = Utilities.DateToString(new Date());
            }
    
            newState.openTasks = newState.tasks.filter(x => x.status != Constants.TaskStatus.DONE);
            
            return newState;
        }

        case Constants.TaskAction.Delete : {
            let newState = {...state};
            newState.tasks =  newState.tasks.filter(x => x.id != action.payload.id);
            newState.openTasks = newState.tasks.filter(x => x.status != Constants.TaskStatus.DONE);
            
            return newState;
        }

        default: {
            return state;
        }
    }
}

const store  = createStore(reducer);
export default store;



//REMOVE below Code
store.dispatch(Actions.Create_Task_Submit("Play cricket","Go to the school ground. \n Invite friends and play cricket. \n Then win it!"));
store.dispatch(Actions.Update_Status(1,Constants.TaskStatus.DONE));

store.dispatch(Actions.Create_Task_Submit("Play football","Call Steve for football match. \n Set a time to play football. \n Tthen win it!"));