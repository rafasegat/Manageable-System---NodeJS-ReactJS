import Dispatcher from "../Dispatcher";
import Store from "../Store";
import 'whatwg-fetch';
import { getFromStorage } from '../../utils/Storage';
import * as Action from '../../flux/provider-customer-organization/ProviderCustomerOrganizationAction';

class ProviderCustomerOrganizationStore extends Store{
    reduce(type, payload){
        if(type===Action.ALL){
            this.all(type, payload);
        }
        if(type===Action.SAVE){
            this.save(type, payload);
        }
        if(type===Action.DELETE){
            this.delete(type, payload);
        }
    }

    save(type, payload){
        let instance = this;
        if(payload.id == -1){
            delete payload.id;
        }
        fetch('/api/provider-customer-organization/save', {
            method: 'POST',
            headers: instance.headers(),
            body: JSON.stringify({
                data: payload
            }),
        }).then(res => res.json())
          .then(json => { instance.invokeListeners(type, {status:'success'}); })
          .catch(err => { instance.invokeListeners(type, {status:'error'}); });
    }

    delete(type, payload){
        let instance = this;
        fetch('/api/provider-customer-organization/delete', {
            method: 'POST',
            headers: instance.headers(),
            body: JSON.stringify({
                data: payload
            }),
        }).then(res => res.json())
          .then(json => { instance.invokeListeners(type, {status:'success' }); })
          .catch(err => { instance.invokeListeners(type, {status:'error'}); });
    }

    all(type, payload){
        let instance = this,
            id_organization = payload.id_organization;

        fetch('/graphql', {
            method: 'POST',
            headers: instance.headers(),
            body: JSON.stringify({ 
                query: '{ provider_customer_organization ( id_organization: ' + id_organization + ') { id, name } }' 
            }),
        }).then(res => res.json())
          .then(json => { instance.invokeListeners(type, { data: json.data.provider_customer_organization, status: 'success' }); })
          .catch(err => { instance.invokeListeners(type, { status: 'Error: '+err }); });
    }

}

export default new ProviderCustomerOrganizationStore(Dispatcher);