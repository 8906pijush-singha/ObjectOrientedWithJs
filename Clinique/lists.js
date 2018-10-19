/*************************************************************************
 * @description :Clinique Management
 * @author  Pijush Singha
 * @version 1.0
 * @since 18/10/2018
 *************************************************************************/
let fs=require('fs');
 let model=require('./classes');
 let doctorsTime=['9am to 11am','11am to 1pm','1pm to 3pm','3pm to 5m','5pm to 7pm'];
 let docs=JSON.parse(fs.readFileSync('./dr.json','utf8'));
 let patients=JSON.parse(fs.readFileSync('./patients.json','utf8'));
 /**
 * require('readline') is used to access the readline module
 */
var readline=require('readline');
/**
 * readline.createInterface is used to access process.stdin and process.stdout
 */
var rl=readline.createInterface(process.stdin,process.stdout);

function test(){
    console.log('1 to addDoctor\n'+
    '2 to add patients\n'+
    '3 to exit');
    rl.question('',function(key){
        switch (key) {
            case '1':addDoctor(test);
                break;
            case '2':addPatient(test);
                break;
            case '3':rl.close();
                break;
            default:console.log('invalid input');
                break;
        }
        function addDoctor(callback){
            rl.question('name=',function(name){
                rl.question('id=',function(id){
                    rl.question('specialization=',function(specialization){
                        rl.question('time=',function(time){
                            docs.doctors.push(new model.Doctor(name,id,specialization,time));
                            fs.writeFileSync('./dr.json',JSON.stringify(docs),'utf8');
                            callback();
                        })
                    })
                })
            })
        }
        function addPatient(callback){
            rl.question('name=',function(name){
                rl.question('id=',function(id){
                    rl.question('mobile no=',function(mobile){
                        rl.question('age=',function(age){
                            patients.patients.push(new model.Patient(name,id,mobile,age));
                            fs.writeFileSync('./patients.json',JSON.stringify(patients),'utf8');                            
                            callback();
                        })
                    })
                })
            })
        }    
    })
    
}
test();