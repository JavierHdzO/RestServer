
const isAdminRole = async( req, res, next) => {

    if( !req.authUser) return res.status(500).json({
        msg: " Token has not correctly been "
    });

    const { role, name } = req.authUser;

    if(role !== "ADMIN_ROLE" ) 
        return res.status(401).json({ 
            msg:`${ name } does not have permisiion to delete`
        });

    next();
}

const checkRole = ( ...roles ) => {
    
    return ( req, res, next ) => {

        if( !req.authUser) return res.status(500).json({
            msg: " Token has not correctly been "
        });
    

        if( !roles.includes( req.authUser.role ))
            return res.status(401).json({
                msg:'User does not have role to delete'
            });

        console.log(roles);
        next();
    }
}

module.exports = {
    isAdminRole,
    checkRole
}
