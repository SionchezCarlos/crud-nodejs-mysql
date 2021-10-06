const res = require("express/lib/response");

const controller = {};

controller.list = (req, res) => {

    req.getConnection((err, conn) => {
        conn.query('Select * From customer', (err, customers) => {
            
            if(err){
                res.json(err);
            }

            //console.log(customers);

            res.render('customers', {
                data: customers
            });

        });
    });

};

controller.save = (req, res) => {
 //console.log(req.body);

 const data = req.body;

 req.getConnection((err, conn) => {
    
    conn.query('INSERT INTO customer SET ?', [data], (err, customer) => {
        //console.log(customer);
        res.redirect('/');
    });

 });

};

controller.edit = (req, res) => {
    //console.log(req.params);

    const id = req.params.id;
    
    req.getConnection((err, conn) => {
         
        conn.query('SELECT * FROM customer WHERE id = ?', [id], (err, customer) => {
            
            res.render('customer_edit', {
                data: customer[0]
            });

        });
    
     });
};

controller.update = (req, res) => {
    //console.log(req.params);

    const id = req.params.id;
    const newCustomer = req.body;

    console.log(newCustomer);
    
    req.getConnection((err, conn) => {
         
        conn.query('UPDATE customer SET ? WHERE id = ?', [newCustomer, id], (err, customer) => {
            if(err){
                res.json(err);
            }
            
            res.redirect('/');
        });
    
     });
};

controller.delete = (req, res) => {
    //console.log(req.params);

    const id = req.params.id;
    
    req.getConnection((err, conn) => {
         
        conn.query('DELETE FROM customer WHERE id = ?', [id], (err, customer) => {
            res.redirect('/');
        });
    
     });

};

module.exports = controller;