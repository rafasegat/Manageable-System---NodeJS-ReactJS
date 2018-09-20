import Dispatcher from "../Dispatcher";
import Store from "../Store";
import { formatInput } from '../../utils/Tools'
import 'whatwg-fetch';
import { getFromStorage } from '../../utils/Storage';
import * as Action from '../../flux/organization/OrganizationAction';

class OrganizationStore extends Store{
    reduce(type, payload){
        if(type===Action.ALL){
            this.all(type, payload);
        }
        if(type===Action.SAVE){
            this.save(type, payload);
        }
    }

    save(type, payload){
        let instance = this;
        fetch('/api/organization/save', {
            method: 'POST',
            headers: instance.headers(),
            body: JSON.stringify({
                data: payload
            }),
        }).then(res => res.json())
          .then(json => { instance.invokeListeners(type, {status:'success'}); })
          .catch(err => { instance.invokeListeners(type, {status:'error'}); });
    }

    all(type, payload){
        let instance = this,
            id_user = getFromStorage('FB360_Token').user;

        fetch('/graphql', {
            method: 'POST',
            headers: instance.headers(),
            body: JSON.stringify({ 
                query: '{ organizations(id_user: ' + id_user + ') { id, name, status } }' 
            }),
        }).then(res => res.json())
          .then(json => { instance.invokeListeners(type, { data: json.data.organizations, status: 'success' }); })
          .catch(err => { instance.invokeListeners(type, { status: 'Error: '+err }); });
    }
}

export default new OrganizationStore(Dispatcher);