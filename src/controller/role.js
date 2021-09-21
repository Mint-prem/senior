const pool = require(`../database/pool`);

exports.getAllRole = async(req, res)=>{

    try {
        const AllRoles = await pool.query(`SELECT * FROM roles`);
        message = "Sussess :)"
        console.log(message);
        return res.status(200).send({ data: { Vaccine: AllRoles.rows } })
    } catch (err) {
        message = "Error"
        console.error(err.message);
    }

    return res.status(500).send({ data: { message: message } });

}

exports.getRoleByID = async(req, res) =>{

    try {
        const role_id = req.body.role_id
        message = "Method Error"

        if (role_id.length == 0 || null) {
            message = "Please Fill Role ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const roleByID = await pool.query("SELECT * FROM roles WHERE role_id = $1", [role_id]);

        if(roleByID.rows.length!=0){
            message ="Sussess :)"
            console.log(message);
            return res.status(200).send({ data: { rows: roleByID.rows } })
        } else {

            message =("Don't have role ID " + role_id);
            console.log(message)
            return res.status(500).send({ data: { message: message } });
        }
    } catch (err) {
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } });
}