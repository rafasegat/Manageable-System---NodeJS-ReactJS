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
        Dispatcher().getStore('ProviderCustomerStore').addListener(fn);
    }
}

export const ALL = 'all-provider-customers';
export const SAVE = 'save-provider-customers';
export const DELETE = 'delete-provider-customers';