import Dispatcher from "../Dispatcher";

export default {
    save: function(payload){
        Dispatcher().dispatch(SAVE, payload);
    },
    delete: function(payload){
        Dispatcher().dispatch(DELETE, payload);
    },
    addListener(fn){
        Dispatcher().getStore('ProviderStore').addListener(fn);
    }
}

export const ALL = 'all-providers';
export const SAVE = 'save-providers';
export const DELETE = 'delete-provider';

export const relationship_provider_info = {
    self_assessment: { key: 1, value: 'Self Assessment' },
    line_manager:    { key: 2, value: 'Line Manager' },
    peer:            { key: 3, value: 'Peer' },
    direct_report:   { key: 4, value: 'Direct Report' },
    customer:        { key: 5, value: 'Customer' },
    supplier:        { key: 6, value: 'Supplier' }
};

export const relationship_provider = [
    { key: 1, value: 'Self Assessment' },
    { key: 2, value: 'Line Manager' },
    { key: 3, value: 'Peer' },
    { key: 4, value: 'Direct Report' },
    { key: 5, value: 'Customer' },
    { key: 6, value: 'Supplier' }
];

export const status_provider_info = {
    invited:   { key: 1, value: 'Invited' },
    responded: { key: 2, value: 'Responded' }
};
