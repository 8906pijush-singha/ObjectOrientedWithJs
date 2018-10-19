/*************************************************************************
 * @description :Clinique Management
 * @author  Pijush Singha
 * @version 1.0
 * @since 18/10/2018
 *************************************************************************/
let fs=require('fs');
let no=JSON.parse(fs.readFileSync('./no.json','utf8'));
/**
 * super class for both Doctor and Patient
 */
 class Person{
     constructor(name){
         this.name=name;
     }
 }
 class Doctor extends Person{
     constructor(name,id,Specialization,time){
        super(name);
        this.id=id;
        this.Specialization=Specialization;
        this.time=time;
        this.count=0;
        this.appointment=[];
     }

     
 }
 class Patient extends Person{
     constructor(name,mobileNo,age){
         super(name);
         this.id=no.no[0]++;
         fs.writeFileSync('./no.json',JSON.stringify(no),'utf8');
         this.mobileNo=mobileNo;
         this.age=age;
         this._doc;
     }
     set_doc(name){
        this._doc=name;
     }
 }
 module.exports={
     Doctor,
     Patient
 }