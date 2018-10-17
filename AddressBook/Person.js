/*************************************************************************
 * @description :cards distribution
 * @author  Pijush Singha
 * @version 1.0
 * @since 17/10/2018
 *************************************************************************/

 class Person{
     constructor(name,city,pin,phonNo,email){
         /**
          * making private property of a class 
          */
         this._name=name;
         this._city=city;
         this._pin=pin;
         this._phonNo=phonNo;
         this._email=email;
       
     }
       /**
          * to set the private properties
          */
        set setName(name){
            _name=name;
        }
        set setCity(city){
            _city=city;
        }
        set setPin(pin){
            _pin=pin;
        }
        set setPhonNo(phonNo){
            _phonNo=phonNo;
        }
        set setEmail(email){
            _email=email;
        }
        /**
          * to read the private properties
          */
        get getName(){
             return _name;
         }
        get getCity(){
            return _city;
        }
        get getPin(){
            return _pin;
        }
        get getPhonNo(){
            return _phonNo;
        }    
        get getEmail(){
            return _email;
        }
 }
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
 module.exports={
     Person
 }