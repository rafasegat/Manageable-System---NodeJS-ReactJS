import Dispatcher from "../Dispatcher";
import Store from "../Store";
import 'whatwg-fetch';
import { getFromStorage } from '../../utils/Storage';
import * as Action from '../../flux/provider-customer/ProviderCustomerAction';

class ProviderCustomerStore extends Store{
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
        fetch('/api/provider-customer/save', {
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
        fetch('/api/provider-customer/delete', {
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
                query: '{ provider_customers ( id_organization: ' + id_organization + ') { id, name, email, id_provider_customer_organization, organization_name } }' 
            }),
        }).then(res => res.json())
          .then(json => { instance.invokeListeners(type, { data: json.data.provider_customers, status: 'success' }); })
          .catch(err => { instance.invokeListeners(type, { status: 'Error: '+err }); });
    }

}

export default new ProviderCustomerStore(Dispatcher);