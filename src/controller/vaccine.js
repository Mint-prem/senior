const pool = require(`../database/pool`);

exports.getAllVaccine = async (req, res) => {

    try {
        const getAllVaccine = await pool.query(`SELECT * FROM vaccines`);
        message = "Sussess :)"
        console.log(message);
        return res.status(200).send({ data: { count: getAllVaccine.rowCount, Vaccine: getAllVaccine.rows } })
    } catch (err) {
        message = "Error"
        console.error(err.message);
    }

    return res.status(500).send({ data: { message: message } });

}

exports.getVaccineByID = async (req, res) => {

    try {

        let vaccine_id = req.body.vaccine_id;
        let message = "Method Error";

        if (vaccine_id.length == 0 || null) {
            message = "Please Fill Vaccine ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const getVaccineByID = await pool.query("SELECT * FROM vaccines WHERE vaccine_id = $1", [vaccine_id]);
        if (getVaccineByID.rows.length != 0) {
            message = "Sussess :)"
            console.log(message);
            return res.status(200).send({ data: { rows: getVaccineByID.rows } })
        } else {
            message = ("Don't have Vaccine ID " + vaccine_id);
            console.log(message)
            return res.status(500).send({ data: { message: message } });
        }
    } catch (err) {
        message = "Error"
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } });
}