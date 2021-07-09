const pool = require(`../database/pool`);

const milk = {}

milk.getAllMilk =async()=>{
    let ret = {}
        ret.message = "Cannot get data!!"
    try {
        const ret = await pool.query(`SELECT * FROM milk`);
        ret.message = "Sussess :)"
        console.log(ret.message);
        return ret.rows;
    } catch (err) {
        console.error(err.message);
    }
}

milk.getMilkByID = async(id) =>{
    let ret = {}
        ret.message = "Cannot get data"

    try {
        const ret = await pool.query("SELECT * FROM milk WHERE milk_id = $1", [id]);
        if(ret.rows.length!=0){
            ret.message ="Sussess :)"
            console.log(ret.message);
            return ret.rows;
        } else {
            ret.message =("Don't have milk ID " + id);
            return ret.message;
        }
    } catch (err) {
        ret.message = "Error";
        console.error(err.message);
    }
    return ret.message;
}

milk.addNewMilk = async(json) =>{
    let ret = {}
        ret.message = "Cannot create new milk"

    try {
        const ret = await pool.query(`INSERT INTO milk (milk_litermorn, milkliter_even, date_milk, total, farm_id) values ($1,$2,$3,$4,$5)`, 
        [json.milk_litermorn, json.milkliter_even, json.date_milk, json.total, json.farm_id]);
        ret.message = "Milk Created :)"
        console.log(ret.message);
        return ret.message;
    } catch (err) {
        ret.message = "Error"
        console.error(err.message);
    }
    return ret.message;
}

milk.updateMilkByID = async(id,json) => {
     let ret = {}
        ret.message = "Cannot update milk"
        const findByID = await pool.query(`SELECT * FROM milk WHERE milk_id = ` + id)

        if(findByID.rows.length==0||null) {
            ret.message = "Don't have milk ID " + id;
            return ret.message;
        } else {
            try {
                const ret = await pool.query(`UPDATE milk SET milk_litermorn = $1, milk_litereven = $2, date_milk = $3, total = $4, farm_id = $5 WHERE milk_id = $6`, 
                [json.milk_litermorn, json.milkliter_even, json.date_milk, json.total, json.farm_id, id]);
                ret.message = "Milk Updated :)"
                console.log(ret.message);
                return ret.message;
            } catch (err) {
                ret.message = "Error"
                console.error(err.message);
            }
        }

        return ret.message;
}

milk.deleteMilkByID = async(id) => {
    let ret = {}
        ret.message = "Cannot Delete milk"
        const findByID = await pool.query(`SELECT * FROM milk WHERE milk_id = ` + id)

        if(findByID.rows.length==0||null) {
            ret.message = "Don't have milk ID " + id;
            return ret.message;
        } else {
            try {
                const ret = await pool.query(`DELETE FROM milk WHERE milk_id = $1`, [id]);
                ret.message = "Milk Deleted :)"
                console.log(ret.message);
                return ret.message;
            } catch (err) {
                ret.message = "Error"
                console.error(err.message);
            }
        }

        return ret.message;

}

module.exports = milk;