import HttpHelper from "../../helpers/httpHelper";
import {API_URL, getUpdatedToken} from "../../helpers/utility";

class UserAPI {
    static AddUser( request ) {
        let url = API_URL + '/signup';
        return HttpHelper.httpRequest( url, 'POST', {}, request );
    }

    static LoginUser() {
        let url = API_URL + '/token';
        return HttpHelper.httpRequest( url, 'GET' ).then( async ( token ) => {
            return await getUpdatedToken( token );
        } );
    }
}

export default UserAPI;
