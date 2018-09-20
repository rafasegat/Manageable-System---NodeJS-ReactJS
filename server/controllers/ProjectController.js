
const Project = require('../models/Project');
const Tools = require('../common/tools');

exports.save = (req, res, next) => {
    const { body } = req;
    const { data } = body;
    
    if (!data.name)
        return res.send({ status: 'Error: Name cannot be blank.' });

    if(data.id){
        // Update
    } else {
        Project.query().insert(data)
        .then( json => {
            if(!json.id)
                return res.send({ status: 'Error: Not added.' });
            
            return res.send({ status: 'success' });
        })
        .catch( err => {
            return res.status(500).send({ status: "Error 500: "+err });
        });
    }
}