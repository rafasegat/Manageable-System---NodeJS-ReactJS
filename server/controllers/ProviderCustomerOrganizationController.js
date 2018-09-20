const ProviderCustomerOrganization = require('../models/Provider_Customer_Organization');
const Tools = require('../common/tools');

exports.save = (req, res, next) => {
    const { body } = req;
    const { data } = body;
    const { param } = body;
    
    if(data.id > 0){
        ProviderCustomerOrganization
        .query()
        .update(data)
        .where({
            id: data.id
        })
        .then( json => {
            if(!json.id)
                return res.send({ status: 'Error: Provider Customer Not Updated.' });

            return res.send({ status: 'success' });
                
        })
        .catch( err => {
            return res.status(500).send({ status: "Error 500: "+err });
        });
    } else {
        ProviderCustomerOrganization
        .query()
        .insert(data)
        .then( json => {
            if(!json.id)
                return res.send({ status: 'Error: Provider Customer Not added.' });

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
    
    ProviderCustomerOrganization
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