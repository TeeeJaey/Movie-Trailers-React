
import Constants from "../Utils/Constants.js";

export default class Actions
{
    static SetFullData(data) {

        return {
            type : Constants.StoreActions.SetFullData,
            payload : {
                data: data
            }
        };
    }
}
