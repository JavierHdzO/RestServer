const path = require('path');

const express  = require('express');
const cors = require('cors');


class Server {

    constructor(){
        this.app = express(); 
        this.port = process.env.PORT;
        this.middleware();
        this.routes();

    }



    middleware (){
        //CORS
        this.app.use( cors() );

        //Public File
        this.app.use( express.static( path.join('src','public' )));
    }

    routes(){
        this.app.use('/api/users', require('../routes/api.routes') );
    }


    listen(){
        this.app.listen( this.port, () => {
            console.log(`Server on port ${ this.port }`);
        })
    }
    
}

module.exports = Server;