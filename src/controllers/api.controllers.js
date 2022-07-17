const { response } = require('express');


const getApi = (req, res = response ) => {
    
    res.json( { msg: "get Api" });

}
const posttApi = (req, res) => {
    res.json( { msg: "post Api" } );

}
const deleteApi = (req, res) => {
    res.json( { msg: "delete Api" } );

}
const putApi = (req, res) => {
    res.json( { msg: "put Api" } );

}


module.exports  = {
    getApi,
    posttApi,
    deleteApi,
    putApi
}

