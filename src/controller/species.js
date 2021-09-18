const pool = require(`../database/pool`);

exports.getAllSpecies=async(req, res)=>{
    let message = "Method Error"

    try {
        const getAllSpecies = await pool.query(`SELECT * FROM species`);
        message = "Sussess :)"
        console.log(message);
        res.status(200).send({ data: { count : getAllSpecies.rowCount, species: getAllSpecies.rows} })
    } catch (err) {
        message = "Error"
        console.error(err.message);
    }

    res.status(500).send({data : { message : message } });

}

exports.getSpeciesByID = async(req, res) =>{
    let id = req.body.species_id;
    console.log(id)
    let message = "Method Error";

    if(id.length==0||null){
        message = "Please Fill Species ID"
        console.log(message)
        res.status(500).send({data : { message : message } })
    }

    try {
        const getSpeciesByID = await pool.query("SELECT * FROM species WHERE species_id = $1", [id]);
        if(getSpeciesByID.rows.length!=0){
            message ="Sussess :)"
            console.log(message);
            res.status(200).send({ data: { species: getSpeciesByID.rows} })
        } else {
            message =("Don't have species ID " + id);
            res.status(500).send({data : { message : message } });
        }
    } catch (err) {
        message = "Error"
        console.error(err.message);
    }
    res.status(500).send({data : { message : message } });
}