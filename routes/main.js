const express = require('express');
const router = express.Router();
// grabbing controllers - from index file
// important to remember these controllers are classes - need an instance
const controllers = require('../controllers');

//Instead of writin data twice to move to the rendering of the pages, global configuration file. JSON

router.get('/', async (req, res ,next) =>{
// This allows us access to the pages/global.json -> this is a turbo 360 feature.

const data = req.context;
    // instance of ITEM conroller, so we can call get, getbyid , post , delete and more..
    const itemCtr = controllers.item.instance();

    data.coffee = items = await itemCtr.get({category: 'coffee'});
    data.tea = await itemCtr.get({category: 'tea'});
    data.pastries = await itemCtr.get({category: 'pastries'});

res.render('home', data);

})

router.get('/blog', (req, res,next)=>{
  

    res.render('blog', req.context);
})

// creating an endpoint for the items that are in the cms - this route will fetch it
router.get('/items', async (req, res,next)=>{
  
    const filters = req.query;
    // instance of ITEM conroller, so we can call get, getbyid , post , delete and more..
    const itemCtr = controllers.item.instance();
    const items = await itemCtr.get(filters);

    // in order to get this we need to sync our local db and the remote one that is on the turbo website - cms -
    res.json({
        items
    })
   
})

// WE want this route to store this order in our CMS on turbo, when someone submits this form
router.post('/order', async (req,res,next) =>{

    // This is the actual data of the order
    const orderData = req.body;

    // Grabbing the order controller
    const orderCtr = controllers.order.instance();

   const order = await orderCtr.post(orderData);

    res.json(order);
})

module.exports = router;



// CDN - content delivery network
// A content delivery network (CDN) refers to a geographically distributed group of servers which work together to provide fast delivery of Internet content. Static files and more
// Series of server - places closest to where the user is at