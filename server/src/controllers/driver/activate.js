const DriverService = require("../../services/DriverService");

const activate = async (req, res, next) => {
    const token = req.params.token;
    try{
        await DriverService.activate(token);
        res.send({message: "Account is activated"})
    } catch(err) {
        next(err);
    }
}

module.exports = activate;