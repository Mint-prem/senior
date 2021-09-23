const pool = require(`../database/pool`);

exports.getAllStatusCow=async(req, res)=>{

        try {
            message = "Method Error";
            const AllStatus = await pool.query(`SELECT * FROM cow_status`);
            message = "Sussess :)"
            console.log(message);
            return res.status(200).send({ data: { status: AllStatus.rows } })
        } catch (err) {
            message = "Error"
            console.error(err)
        }
    
        return res.status(500).send({data : { message : message } });
}

exports.getStatusCowByID = async(req, res) =>{

    try {
        let status_id = req.body.status_id;
        message = "Method Error";
    
        if(status_id.length==0||null){
            message = "Please Fill Status ID"
            console.log(message)
            return res.status(500).send({data : { message : message } })
        }

        const StatusByID = await pool.query(`SELECT * FROM cow_status WHERE status_id = $1`, [status_id]);
        if(StatusByID.rows.length!=0){
            message = "Sussess :)"
            console.log(message);
            return res.status(200).send({data : {rows : StatusByID.rows}})
        } else {
            message = "Don't have status ID : " + status_id;
            console.log(message)
            return res.status(500).send({data : { message : message } })
        }
    } catch (err) {
        message = "Error"
        console.error(err.message);
    }
    return res.status(500).send({data : { message : message } });
}