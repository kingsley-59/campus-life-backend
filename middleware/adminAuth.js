const User = require("../models/userModel");

const adminAuth = async (req, res, next) => {
    try {
        let user = req.user;
        let person = await User.findById(user);

        let right = person.role;
        if (right !== "superadmin" && right !== "admin")
            return res
                .status(401)
                .json({msg: "Admin access required"});

        next ();
    } catch (err) {
        res.status(500).send({ err: err.message });
    }
};

module.exports = adminAuth;