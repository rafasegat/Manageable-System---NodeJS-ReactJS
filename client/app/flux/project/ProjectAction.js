import Dispatcher from "../Dispatcher";

export default {
    all: function(payload){
        Dispatcher().dispatch(ALL, payload);
    },
    save: function(payload){
        Dispatcher().dispatch(SAVE, payload);
    },
    addListener(fn){
        Dispatcher().getStore('ProjectStore').addListener(fn);
    }
}

export const ALL = 'all-projects';
export const SAVE = 'save-project';