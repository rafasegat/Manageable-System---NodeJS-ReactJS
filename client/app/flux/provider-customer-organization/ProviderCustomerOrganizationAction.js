import Dispatcher from "../Dispatcher";

export default {
    all: function(payload){
        Dispatcher().dispatch(ALL, payload);
    },
    save: function(payload){
        Dispatcher().dispatch(SAVE, payload);
    },
    delete: function(payload){
        Dispatcher().dispatch(DELETE, payload);
    },
    addListener(fn){
        Dispatcher().getStore('ProviderCustomerOrganizationStore').addListener(fn);
    }
}

export const ALL = 'all-provider-customers-organization';
export const SAVE = 'save-provider-customers-organization';
export const DELETE = 'delete-provider-customers-organization';