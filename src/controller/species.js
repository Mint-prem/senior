const pool = require(`../database/pool`);

exports.getAllSpecies=async(req, res)=>{

    try {
        message = "Method Error"
        const getAllSpecies = await pool.query(`SELECT * FROM species`);
        message = "Sussess :)"
        console.log(message);
        return res.status(200).send({ data: { rows: getAllSpecies.rows} })
    } catch (err) {
        message = "Error"
        console.error(err.message);
    }

    return res.status(500).send({data : { message : message } });

}

exports.getSpeciesByID = async(req, res) =>{

    try {

        let specie_id = req.body.specie_id;
        let message = "Method Error";
    
        if(specie_id.length==0||null){
            message = "Please Fill Species ID"
            console.log(message)
            return res.status(500).send({data : { message : message } })
        }
    
        const getSpeciesByID = await pool.query("SELECT * FROM species WHERE specie_id = $1", [specie_id]);
        if(getSpeciesByID.rows.length!=0){
            message ="Sussess :)"
            console.log(message);
            return res.status(200).send({ data: { rows: getSpeciesByID.rows} })
        } else {
            message =("Don't have species ID " + specie_id);
            return res.status(500).send({data : { message : message } });
        }
    } catch (err) {
        message = "Error"
        console.error(err.message);
    }
    return res.status(500).send({data : { message : message } });
}