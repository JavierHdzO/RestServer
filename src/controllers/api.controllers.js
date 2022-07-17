const { request, response } = require('express');


const getApi = (req = request, res = response ) => {

    const { n, u} = req.query; 

    res.json({ 
        msg: "get Api",
        n, 
        u
    });

}
const posttApi = (req = request, res) => {
    const { email, password } = req.body;
    res.json( { 
        msg: "post Api", 
        email,
        password
    } );

}
const deleteApi = (req, res) => {
    const { id } = req.params;
    res.json({ 
        msg: "delete Api",
        id 
    });

}
const putApi = (req = request, res) => {
    const { id } = req.params;
    res.json({ 
        msg: "put Api",
        id

    });

}


module.exports  = {
    getApi,
    posttApi,
    deleteApi,
    putApi
}

