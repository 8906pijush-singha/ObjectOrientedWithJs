
let fs=require('fs');
let utility=require('./Utility/LLstockUtility')
class Person{
    constructor(){
        /**
         * making private property of a class 
         */
        this._name;
        this._city;
        // let _name;
        // let _city;
       
}
setName(name){
    this._name=name;
}
setCity(city){
    this._city=city;
}
getName(){
    return this._name;
}
getCity(){
   return this._city;
}
    }
      /**
         * to set the private properties
         */
      
       /**
         * to read the private properties
         */
      
/**
 * overriding toString 
 */
Person.prototype.toString=function(){
       return 'name = '+this.getName()+'\n'+
              'email = '+ this.getEmail()+'\n'+
              'phone no = '+this.getPhonNo()+'\n'+
              'zip = '+this.getPin()+'\n'+
              'city = '+this.getCity(); 
}

function test()
{
    let p=new Person();
    p.setName('pijush');
    p.setCity('asansol');
    console.log(p.getName());
    console.log(p._city);
}
test();

