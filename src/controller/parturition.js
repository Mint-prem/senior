const pool = require(`../database/pool`);

exports.getAllParturition = async(req, res)=>{
        
    try {
        message = "Method Error"
        const AllPartu = await pool.query(`SELECT * FROM parturition`);
        message = "Sussess :)"
        console.log(message);
        return res.status(200).send({ data: { rows: AllPartu.rows } })

    } catch (err) {
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } })
}

exports.getParturitionByID = async(req, res) =>{

    try {
        const parturition_id = req.body.parturition_id
        message = "Method Error"

        if (parturition_id.length == 0 || null) {
            message = "Please Fill Parturition ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const getPartu = await pool.query("SELECT * FROM parturition WHERE parturition_id = $1", [parturition_id]);
        if(getPartu.rows.length!=0){
            message ="Sussess :)"
            console.log(message);
            return res.status(200).send({ data: { rows: getPartu.rows } })
        } else {
            message =("Don't have parturition ID " + parturition_id);
            console.log(message);
            return res.status(500).send({ data: { message: message } })
        }
    } catch (err) {
        message = "Error";
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } })
}

exports.getParturitionByFarmID = async(req, res) =>{

    try {
        const farm_id = req.body.farm_id
        message = "Method Error"

        if (farm_id.length == 0 || null) {
            message = "Please Fill Farm ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const findFarmByID = await pool.query(`SELECT * FROM farms WHERE farm_id = $1`, [farm_id])

        if (findFarmByID.rows.length == 0 || null) {
            message = "Don't have farm ID " + farm_id;
            console.log(message)
            return res.status(500).send({ message: message })
        }

        const getPartuByFarm = await pool.query(
            `SELECT * FROM parturition 
            INNER JOIN cows ON cows.cow_id = parturition.cow_id
            WHERE farm_id = $1`, [farm_id]);
            
        if(getPartuByFarm.rows.length!=0){
            message ="Sussess :)"
            console.log(message);
            return res.status(200).send({ data: { rows: getPartuByFarm.rows } })
        } else {
            message = "Don't have parturition data in farm";
            console.log(message);
            return res.status(200).send({ data: { message: message } })
        }
    } catch (err) {
        message = "Error";
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } })
}

exports.getParturitionByCowID = async(req, res) =>{

    try {
        const cow_id = req.body.cow_id
        message = "Method Error"

        const checkCow= await pool.query(`SELECT * FROM cows WHERE cow_id = $1`, [cow_id])

        if(checkCow.rows.length == 0 || null){
            message = "Don't have cow ID: " + cow_id;
            console.log(message)
            return res.status(500).send({ message: message })
        }

        const getPartuByCow = await pool.query("SELECT * FROM parturition WHERE cow_id = $1", [cow_id]);
        if(getPartuByCow.rows.length!=0){
            message ="Sussess :)"
            console.log(message);
            return res.status(200).send({ data: { rows: getPartuByCow.rows } })
        } else {
            message ="Cow id " + cow_id + " don't have parturition data";
            console.log(message);
            return res.status(200).send({ data: { message: message } })
        }
    } catch (err) {
        message = "Error";
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } })
}

exports.addNewParturition = async(json) =>{
    let ret = {}
        ret.message = "Cannot create new parturition"

    try {
        const ret = await pool.query(`INSERT INTO parturition (par_date, calf_name, calf_sex, note, per_caretaker, cow_id) values ($1,$2,$3,$4,$5,$6)`, 
        [json.par_date, json.calf_name, json.calf_sex, json.note, json.per_caretaker, json.cow_id]);
        message = "Parturition Created :)"
        console.log(ret.message);
        return ret.message;
    } catch (err) {
        ret.message = "Error"
        console.error(err.message);
    }
    return ret.message;
}

exports.updateParturitionByID = async(id,json) => {
     let ret = {}
        ret.message = "Cannot update parturition"
        const findByID = await pool.query(`SELECT * FROM parturition WHERE parturition_id = ` + id)

        if(findByID.rows.length==0||null) {
            ret.message = "Don't have parturition ID " + id;
            return ret.message;
        } else {
            try {
                const ret = await pool.query(`UPDATE parturition SET par_date = $1, calf_name = $2, calf_sex = $3, note = $4, per_caretaker = $5, cow_id = $6 WHERE parturition_id = $7`, 
                [json.par_date, json.calf_name, json.calf_sex, json.note, json.per_caretaker, json.cow_id, id]);
                ret.message = "Parturition Updated :)"
                console.log(ret.message);
                return ret.message;
            } catch (err) {
                ret.message = "Error"
                console.error(err.message);
            }
        }

        return ret.message;
}

exports.deleteParturitionByID = async(id) => {
    let ret = {}
        ret.message = "Cannot Delete parturition"
        const findByID = await pool.query(`SELECT * FROM parturition WHERE parturition_id = ` + id)

        if(findByID.rows.length==0||null) {
            ret.message = "Don't have parturition ID " + id;
            return ret.message;
        } else {
            try {
                const ret = await pool.query(`DELETE FROM parturition WHERE parturition_id = $1`, [id]);
                ret.message = "Parturition Deleted :)"
                console.log(ret.message);
                return ret.message;
            } catch (err) {
                ret.message = "Error"
                console.error(err.message);
            }
        }

        return ret.message;

}