const bcrypt  = require('bcrypt'); 

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        { id: 1, 
          email: 'rafasegat@gmail.com', 
          password: bcrypt.hashSync('1', bcrypt.genSaltSync(8), null) 
        },
        {
          id: 2, 
          email: 'raf@fivecreative.com.au', 
          password: bcrypt.hashSync('1', bcrypt.genSaltSync(8), null)  
        }
      ]);
    });
};
