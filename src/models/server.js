const path = require('path');

const express  = require('express');
const cors = require('cors');


class Server {

    constructor(){
        this.app = express(); 
        this.port = process.env.PORT;

        //Paths
        this.apiPath = '/api/users';


        //Middleware
        this.middleware();

        //Routes
        this.routes();

    }



    middleware (){
        //CORS
        this.app.use( cors() );


        // Parsing and reading of body
        this.app.use( express.json() )
        this.app.use( express.urlencoded( {extended: false} ) );


        //Public File
        this.app.use( express.static( path.join('src','public' )));
    }

    routes(){
        this.app.use(this.apiPath, require('../routes/api.routes') );
    }


    listen(){
        this.app.listen( this.port, () => {
            console.log(`Server on port ${ this.port }`);
        });
    }
    
}

module.exports = Server;