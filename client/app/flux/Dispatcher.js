let instance = null;

class Dispatcher{
    constructor(){}

    static getInstance(){
        if(instance === null){
            instance = new Dispatcher();
            instance.stores = new Map();
        }
        return instance;
    }

    registerStore(key, store){
        instance.stores.set(key,store);
    }

    getStore(name){
        return instance.stores.get(name);
    }

    dispatch(type, payload){
        instance.stores.forEach((value, key) => {
            if(typeof value.reduce === 'function'){
                value.reduce(type, payload);
            }
        });
    }
}

export default Dispatcher.getInstance;