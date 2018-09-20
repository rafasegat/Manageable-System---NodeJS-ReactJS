import Dispatcher from "../Dispatcher";
import Store from "../Store";
import 'whatwg-fetch';
import { getFromStorage } from '../../utils/Storage';
import * as Action from '../../flux/project/ProjectAction';

class ProjectStore extends Store{
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
        fetch('/api/project/save', {
            method: 'POST',
            headers: instance.headers(),
            body: JSON.stringify({
                data: payload
            }),
        }).then(res => res.json())
          .then(json => { instance.invokeListeners(type, {status:'success'});  })
          .catch(err => { instance.invokeListeners(type, {status:'error'});  });
    }

    all(type, payload){
        let instance = this,
            id_organization = payload.id_organization,
            query = `{ 
                        projects( id_organization:  ${id_organization} )
                            { 
                                id, name, status, id_organization 
                            } 
                    }` ;
        fetch('/graphql', {
            method: 'POST',
            headers: instance.headers(),
            body: JSON.stringify({ 
                query: query
            }),
        }).then(res => res.json())
          .then(json => { instance.invokeListeners(type, { data: json.data.projects, status: 'success' }); })
          .catch(err => { instance.invokeListeners(type, { status: 'Error: '+err }); });
    }
}

export default new ProjectStore(Dispatcher);