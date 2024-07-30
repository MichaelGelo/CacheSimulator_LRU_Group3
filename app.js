const express = require('express');
const server = express();

const bodyParser = require('body-parser')
server.use(express.json()); 
server.use(express.urlencoded({ extended: true }));

const handlebars = require('express-handlebars');
server.set('view engine', 'hbs');
server.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));

server.use(express.static('public'));

server.get('/', function(req, resp){
    resp.render('main',{
        layout: 'index',
        index_title: 'CacheSimulator_LRU_Group3'
    });
});


const port = process.env.PORT | 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})

