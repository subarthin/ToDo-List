module.exports.getDate=function(){
const today=new Date();
let currday=today.getDay();
const options = { weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' };
let day=today.toLocaleDateString("en-US",options);
    return day;   
}

module.exports.getDay=function(){
    const today=new Date();
    let currday=today.getDay();
    const options = { weekday: 'long'} ;
    let day=today.toLocaleDateString("en-US",options);
        return day;   
    }
    console.log(module.exports);