const pool = require(`../database/pool`);

exports.getAllTypecow = async (req, res) => {
    let message = "Method Error";

    try {
        const getAllType = await pool.query(`SELECT * FROM typecow`);
        message = "Sussess :)"
        console.log(message);
        res.status(200).send({ data: { typecow: getAllType.rows } })
    } catch (err) {
        message = "Error"
        console.error(err)
    }

    res.status(500).send({data : { message : message } });
}

exports.getTypecowByID = async(req, res) => {
    let id = req.body.typecow_id;
    console.log(id)
    let message = "Method Error";

    if(id.length==0||null){
        message = "Please Fill Typecow ID"
        console.log(message)
        res.status(500).send({data : { message : message } })
    }

    try {
        const getTypeByID = await pool.query("SELECT * FROM typecow WHERE typecow_id = $1", [id]);
        if(getTypeByID.rows.length!=0){
            message = "Sussess :)"
            console.log(message);
            res.status(200).send({data : {typecow : getTypeByID.rows}})
        } else {
            message = "Don't have typecow ID : " + id;
            res.status(500).send({data : { message : message } })
        }
    } catch (err) {
        message = "Error"
        console.error(err.message);
    }
    res.status(500).send({data : { message : message } });
}