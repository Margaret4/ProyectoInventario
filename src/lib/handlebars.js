const {format}=require('timeago.js');

const helpers={};

helpers.timeago = (timestamp)=>{
    return format(timestamp);
};
helpers.activo_in=(values)=>{
    var buf = Buffer.alloc(1);
    for(var val in values){
        if(Buffer.compare(buf, values[val].est) ==-1)values[val].est="ACTIVO";
        else values[val].est="INACTIVO";
    } 
    return values

};

module.exports=helpers;