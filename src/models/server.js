const path = require('path');

const express  = require('express');
const cors = require('cors');

const dbConnection = require('./../database/config')


class Server {

    constructor(){
        this.app = express(); 
        this.port = process.env.PORT;

        //Paths
        this.apiPath = '/api/users';


        // DB connectio
        this.connectDB();

        //Middleware
        this.middleware();

        //Routes
        this.routes();

    }

    async connectDB () {
        await dbConnection();
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
        this.app.use(this.apiPath, require('../routes/user.routes') );
    }


    listen(){
        this.app.listen( this.port, () => {
            console.log(`Server on port ${ this.port }`);
        });
    }
    
}

module.exports = Server;