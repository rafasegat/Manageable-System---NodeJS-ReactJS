const Provider = require('../models/Provider');
const Tools = require('../common/tools');

exports.save = (req, res, next) => {
    const { body } = req;
    const { data } = body;
    const { param } = body;

    if(data.id){
        // Update
    } else {
        Provider
        .query()
        .insert(data)
        .then( json => {
            if(!json.id)
                return res.send({ status: 'Error: Provider Not added.' });

            return res.send({ status: 'success' });
                
        })
        .catch( err => {
            return res.status(500).send({ status: "Error 500: "+err });
        });
    }
}

exports.delete = (req, res, next) => {
    const { body } = req;
    const { data } = body;
    const { param } = body;
    Provider
    .query()
    .where({
        id: data.id
    })
    .delete()
    .then( json => {
        //if(!json.id)
        //    return res.send({ status: 'Error: Provider Not Deleted.' });
        return res.send({ status: 'success' });
            
    })
    .catch( err => {
        return res.status(500).send({ status: "Error 500: "+err });
    });
}