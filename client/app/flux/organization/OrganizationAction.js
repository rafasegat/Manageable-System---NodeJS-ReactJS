import Dispatcher from "../Dispatcher";

export default {
    all: function(payload){
        Dispatcher().dispatch(ALL, payload);
    },
    save: function(payload){
        Dispatcher().dispatch(SAVE, payload);
    },
    addListener(fn){
        Dispatcher().getStore('OrganizationStore').addListener(fn);
    }
}

export const ALL = 'all-organizations';
export const SAVE = 'save-organization';