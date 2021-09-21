const pool = require(`../database/pool`);

exports.getAllTypecow = async (req, res) => {

    try {
        message = "Method Error";
        const getAllType = await pool.query(`SELECT * FROM cow_type`);
        message = "Sussess :)"
        console.log(message);
        return res.status(200).send({ data: { typecow: getAllType.rows } })
    } catch (err) {
        message = "Error"
        console.error(err)
    }

    return res.status(500).send({data : { message : message } });
}

exports.getTypecowByID = async(req, res) => {

    try {
        let type_id = req.body.type_id;
        message = "Method Error";
    
        if(type_id.length==0||null){
            message = "Please Fill Type ID"
            console.log(message)
            return res.status(500).send({data : { message : message } })
        }

        const getTypeByID = await pool.query("SELECT * FROM cow_type WHERE type_id = $1", [type_id]);
        if(getTypeByID.rows.length!=0){
            message = "Sussess :)"
            console.log(message);
            return res.status(200).send({data : {rows : getTypeByID.rows}})
        } else {
            message = "Don't have type ID : " + type_id;
            console.log(message)
            return res.status(500).send({data : { message : message } })
        }
    } catch (err) {
        message = "Error"
        console.error(err.message);
    }
    return res.status(500).send({data : { message : message } });
}