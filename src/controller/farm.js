const pool = require(`../database/pool`);

const farm = {}

farm.getAllFarm = async()=>{
    let ret = {}
        ret.message = "Cannot get data"

    try {
        const ret = await pool.query(`SELECT * FROM farm`);
        ret.message = "Sussess :)"
        console.log(ret.message);
        return ret.rows;
    } catch (err) {
        ret.message = "Error"
        console.error(err.message);
    }
    return ret.message;
}

farm.getFarmByID = async(id) =>{
    let ret = {}
        ret.message = "Cannot get data"

    try {
        const ret = await pool.query("SELECT * FROM farm WHERE farm_id = $1", [id]);
        if(ret.rows.length!=0){
            ret.message ="Sussess :)"
            console.log(ret.message);
            return ret.rows;
        } else {
            ret.message =("Don't have farm ID " + id);
            return ret.message;
        }
    } catch (err) {
        ret.message = "Error";
        console.error(err.message);
    }
    return ret.message;
}

farm.addNewFarm = async(json) =>{
    let ret = {}
        ret.message = "Cannot create new farm"

    try {
        const ret = await pool.query(`INSERT INTO farm (farm_no, farm_name, farm_image, address, moo, soi, road, sub_district, district, province, postcode) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`, 
        [json.farm_no, json.farm_name, json.farm_image, json.address, json.moo, json.soi, json.road, json.sub_district, json.district, json.province, json.postcode]);
        ret.message = "Farm Created :)"
        console.log(ret.message);
        return ret.message;
    } catch (err) {
        ret.message = "Error"
        console.error(err.message);
    }
    return ret.message;
}

farm.updateFarmByID = async(id,json) => {
     let ret = {}
        ret.message = "Cannot update farm"
        const findByID = await pool.query(`SELECT * FROM farm WHERE farm_id = ` + id)

        if(findByID.rows.length==0||null) {
            ret.message = "Don't have farm ID " + id;
            return ret.message;
        } else {
            try {
                const ret = await pool.query(`UPDATE farm SET farm_no = $1, farm_name = $2, farm_image = $3, address = $4, moo = $5, soi = $6, road = $7, sub_district = $8, district = $9, province = $10, postcode = $11 WHERE farm_id = $12`, 
                [json.farm_no, json.farm_name, json.farm_image, json.address, json.moo, json.soi, json.road, json.sub_district, json.district, json.province, json.postcode, id]);
                ret.message = "Farm Updated :)"
                console.log(ret.message);
                return ret.message;
            } catch (err) {
                ret.message = "Error"
                console.error(err.message);
            }
        }

        return ret.message;
}

farm.deleteFarmByID = async(id) => {
    let ret = {}
        ret.message = "Cannot Farm cow"
        const findByID = await pool.query(`SELECT * FROM farm WHERE farm_id = ` + id)

        if(findByID.rows.length==0||null) {
            ret.message = "Don't have farm ID " + id;
            return ret.message;
        } else {
            try {
                const ret = await pool.query(`DELETE FROM farm WHERE farm_id = $1`, [id]);
                ret.message = "farm Deleted :)"
                console.log(ret.message);
                return ret.message;
            } catch (err) {
                ret.message = "Error"
                console.error(err.message);
            }
        }

        return ret.message;

}

module.exports = farm;
