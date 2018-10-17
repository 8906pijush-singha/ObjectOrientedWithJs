
let fs=require('fs');
let utility=require('./Utility/LLstockUtility')
class Person{
    constructor(){
        /**
         * making private property of a class 
         */
        let _name;
        let _city;
        this.setName=function(name){
            _name=name;
        }
        this.setCity=function(city){
            _city=city;
        }
        this.getName=function(){
            return _name;
        }
        this.getCity=function(){
           return _city;
       }
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
    console.log(p);
}
test();

