import Dispatcher from "../Dispatcher";
import Store from "../Store";
import 'whatwg-fetch';
import { getFromStorage } from '../../utils/Storage';
import * as Action from '../../flux/participant/ParticipantAction';

class ParticipantStore extends Store{
    reduce(type, payload){
        if(type===Action.ALL){
            this.all(type, payload);
        }
        if(type===Action.ALL_LESS_CURRENT){
            this.allLessCurrent(type, payload);
        }
        if(type===Action.SAVE){
            this.save(type, payload);
        }
        if(type===Action.PROVIDERS){
            this.providers(type, payload);
        }
    }

    save(type, payload){
        let instance = this;
        fetch('/api/participant/save', {
            method: 'POST',
            headers: instance.headers(),
            body: JSON.stringify({
                data: payload,
                param: { id_project: getFromStorage('FB360_Project').id }
            }),
        }).then(res => res.json())
          .then(json => {
            instance.invokeListeners(type, {status:'success'}); 
        }).catch(err => {
            instance.invokeListeners(type, {status:'error'});
        });
    }

    all(type, payload){
        let instance = this,
            id_project = payload.id_project,
            query = `{ 
                        participants( id_project:  ${id_project} )
                            { 
                                id, 
                                name, 
                                email, 
                                position, 
                                status, self_assessment, 
                                choose_own_feedback_provider, 
                                feedback_provider_needs_approval, 
                                id_participant_feedback_reviewer
                            } 
                    }` ;
        fetch('/graphql', {
            method: 'POST',
            headers: instance.headers(),
            body: JSON.stringify({ query: query  }),
        }).then(res => res.json())
          .then(json => {
            if(json.status==404) document.getElementById('btn-logout').click();
            instance.invokeListeners(type, {data: json.data.participants, status:'success'});
        }).catch(err => { instance.invokeListeners(type, {status:'error'}); });
    }

    allLessCurrent(type, payload){
        let instance = this,
            query = `{ 
                        participantsLessCurrent( 
                            id_project:  ${payload.id_project} ,
                            id_participant: ${payload.id_participant}
                        )
                        { 
                            id, 
                            name, 
                            email, 
                            position, 
                            status, self_assessment, 
                            choose_own_feedback_provider, 
                            feedback_provider_needs_approval, 
                            id_participant_feedback_reviewer
                        } 
                    }` ;
        fetch('/graphql', {
            method: 'POST',
            headers: instance.headers(),
            body: JSON.stringify({ query: query  }),
        }).then(res => res.json())
          .then(json => {
            if(json.status==404) document.getElementById('btn-logout').click();
            instance.invokeListeners(type, {data: json.data.participantsLessCurrent, status:'success'});
        }).catch(err => { instance.invokeListeners(type, {status:'error'}); });
    }

    providers(type, payload){
        let instance = this,
            query = `{ 
                        providersByParticipant( 
                            id_participant:  ${payload.id_participant}, 
                            id_project:  ${payload.id_project} 
                        )
                        { 
                            id, 
                            name, 
                            email, 
                            position, 
                            status, 
                            self_assessment, 
                            choose_own_feedback_provider, 
                            feedback_provider_needs_approval, 
                            id_participant_feedback_reviewer,
                            provider_relationship, 
                            provider_status,
                            pk_id_provider
                        } 
                    }` ;
        fetch('/graphql', {
            method: 'POST',
            headers: instance.headers(),
            body: JSON.stringify({ query }),
        }).then(res => res.json())
          .then(json => {
            if(json.status==404) document.getElementById('btn-logout').click();
            instance.invokeListeners(type, {data: json.data.providersByParticipant, status:'success'}); })
          .catch(err => { instance.invokeListeners(type, {status:'error'}); });
    }
}

export default new ParticipantStore(Dispatcher);