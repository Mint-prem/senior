checkDuplicateEmail = (req, res, next) => {
    // Username
    // User.findOne({
    //     where: {
    //         email: req.body.email
    //     }
    // }).then(user => {
    //     if (user) {
    //         res.status(400).send({
    //             message: "Failed! email is already in use!"
    //         });
    //         return;
    //     }
    //     next();
    // });
};

const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail,
};

module.exports = verifySignUp;