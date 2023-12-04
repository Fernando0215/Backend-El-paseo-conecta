const User = require("../models/User.model");
const { createToken, verifyToken } = require("./../utils/jwt.tools");

const controller = {};

controller.register = async (req, res, next) => {
    try {
        //Obtencion de informacion
        const {userName, userEmail, password} = req.body;

        //Verificar la existendia del usuario y correo
        const user =
         await User.findOne({ $or: [{username: userName}, {email: userEmail}] });

        if (user) {
            return res.status(409).json({ error: "User already exist!"});
        }
        //Si no existe se crea
        const nerUser = new User({
            userName: userName, 
            userEmail: userEmail,
            password: password
        })

        await newUser.save();

        return res.status(201).json({ message: "User registred" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Internal Server Error"});
    }
}

controller.login =  async (req, res, next) => {
    try {
        //Obtener la informacion
        const {identifier, password} = req.body;
        
        //Verificar existencia
        const user = 
            await User.findOne({ $or: [{username: identifier}, {email: identifier}] });
        
        //Validar existencia
        if (!user) {
            return res.status(404).json({ error: "User not found"});
        }
        
        //Validar password
        //Error password
        if (!user.comparePassword(password)) {
            return res.status(401).json({ error: "Incorrect Password"});
        }

        //Ingresar
        //Crear Token
        const token = await createToken(user._id);

        //Verificar Token
        let _tokens = [...user.tokens];
        const _verifyPromises = _tokens.map(async (_token) => {
            const status = await verifyToken(_t);
            return status ? _t : null;
        });

        _tokens = (await Promise.all(_verifyPromises))
            .filter(_t => _t)
            .slice(0, 4);
        _tokens = [token, ..._tokens];
        user.tokens = _tokens;

        await user.save();
        return res.status(200).json({ token })
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Internal Server Error"});  
    }
}

module.exports = controller;