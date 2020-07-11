/*const bcrypt=require('bcryptjs');
const helpers ={};
helpers.encryptPassword = async(password)=>{
    const salt = await bcrypt.genSalt(10);
    const pass = bcrypt.hash(password,salt);
    return pass;

};
helpers.matchPassword= async(password,savedpassword)=>{
    try{
        return await bcrypt.compare(password,savedpassword); // porque no retornaba lo que comparaba :vvvv
    }catch(e){
        console.log(e);
    }

};
module.exports = helpers;
*/