import React from 'react';
import ItemList from '../../components/Project/ItemList';

const ProjectList = (props) => {

    const { 
        list,
        openModal,
        redirectParticipants
    } = props;
    
    return(
        <div className="projects">
            {list!=undefined && list.length > 0  ? 
                <ul className="project-list">
                    {
                        list.map((value) => 
                            <ItemList 
                                value={value} 
                                key={value.id}
                                redirectParticipants={redirectParticipants}
                            />
                        )
                    }
                </ul>
            :
                <div>No project. Create the first one!</div>
            } 
            
            <button className="btn-primary" onClick={openModal}>Create new project</button>
            
        </div>
    );

}

export default ProjectList;