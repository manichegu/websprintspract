const mongoose = require('mongoose')


const Cap = new mongoose.Schema({
    partnumber: {type: String},
    package: {type: String},

    bvdss: {type: String},

    rds: [{ 

        voltage:{
            type: Number
        },
        count:{
            type:Number
        }
       
    }],
    
    qg: [
        { 
    
            voltage:{
                type: Number
            },
            count:{
                type:Number
            }
           
        }],

    pdw : {type : String} ,
    configuration : {type : String} ,
    polarity: {type: String},
})


module.exports = mongoose.model('Cap', Cap)