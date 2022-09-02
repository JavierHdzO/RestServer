
const isAdminRole = async( req, res, next) => {

    if( !req.authUser) return res.status(500).json({
        msg: " Token is missing or invalid "
    });

    const { role, name } = req.authUser;

    if(role !== "ADMIN_ROLE" ) 
        return res.status(401).json({ 
            msg:`${ name } does not have permissions required`
        });

    next();
}

const checkRole = ( ...roles ) => {
    
    return ( req, res, next ) => {

        if( !req.authUser) return res.status(500).json({
            msg: " Token is missing or invalid "
        });
    

        if( !roles.includes( req.authUser.role ))
            return res.status(401).json({
                msg:'User does not have permissions required'
            });

        next();
    }
}

module.exports = {
    isAdminRole,
    checkRole
}
