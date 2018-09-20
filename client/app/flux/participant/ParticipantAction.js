import Dispatcher from "../Dispatcher";

export default {
    all: function(payload){
        Dispatcher().dispatch(ALL, payload);
    },
    allLessCurrent: function(payload){
        Dispatcher().dispatch(ALL_LESS_CURRENT, payload);
    },
    save: function(payload){
        Dispatcher().dispatch(SAVE, payload);
    },
    providers: function(payload){
        Dispatcher().dispatch(PROVIDERS, payload);
    },
    addListener(fn){
        Dispatcher().getStore('ParticipantStore').addListener(fn);
    }
}

export const ALL = 'all-participants';
export const ALL_LESS_CURRENT = 'all-participants-less-current';
export const PROVIDERS = 'providers-participants';
export const SAVE = 'save-participants';

// export const status = {
//     waiting_for_feedback: { id: 1, name: 'Waiting for feedback' },
//     choosing_feedback_providers: { id: 2, name: 'Choosing feedback providers' },
//     closed: { id: 3, name: 'Closed' }
// };

export const status = [
    { id_status: 1, name: 'Waiting for feedback' },
    { id_status: 2, name: 'Choosing feedback providers' },
    { id_status: 3, name: 'Closed' }
];
