const pool = require(`../database/pool`);

exports.getAllVaccine=async(req, res)=>{
    let message = "Method Error"

    try {
        const getAllVaccine = await pool.query(`SELECT * FROM vaccine`);
        message = "Sussess :)"
        console.log(message);
        res.status(200).send({ data: { count : getAllVaccine.rowCount, Vaccine: getAllVaccine.rows} })
    } catch (err) {
        message = "Error"
        console.error(err.message);
    }

    res.status(500).send({data : { message : message } });

}

exports.getVaccineByID = async(req, res) =>{
    let id = req.body.vaccine_id;
    console.log(id)
    let message = "Method Error";

    if(id.length==0||null){
        message = "Please Fill Vaccine ID"
        console.log(message)
        res.status(500).send({data : { message : message } })
    }

    try {
        const getVaccineByID = await pool.query("SELECT * FROM vaccine WHERE vaccine_id = $1", [id]);
        if(getVaccineByID.rows.length!=0){
            message ="Sussess :)"
            console.log(message);
            res.status(200).send({ data: { Vaccine: getVaccineByID.rows} })
        } else {
            message =("Don't have Vaccine ID " + id);
            res.status(500).send({data : { message : message } });
        }
    } catch (err) {
        message = "Error"
        console.error(err.message);
    }
    res.status(500).send({data : { message : message } });
}