import { getFromStorage } from '../utils/Storage';

class Store{
    constructor(dispatcher){
        if(typeof dispatcher === 'undefined'){
            throw new DOMException('You need a dispatcher to build this Store!');
        }
        this.events = [];
    }

    headers(){
        return {
                'Content-Type': 'application/json',
                'x-access-token': getFromStorage('FB360_Token').token
        }
    }

    reduce(type, payload){}

    addListener(fn){
       this.events.push(fn); 
    }

    invokeListeners(type, payload){
        this.events.forEach((event)=>{
            if(typeof event === 'function'){
                event(type, payload);
            }
        });
    }
}

export default Store;