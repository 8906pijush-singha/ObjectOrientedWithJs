/*************************************************************************
 * @description :Clinique Management
 * @author  Pijush Singha
 * @version 1.0
 * @since 18/10/2018
 *************************************************************************/
/**
 * todays date
 */
let today=new Date().getDate();
/**
 * requiring fs module
 */
let fs=require('fs');
/**
 * reading json file and parsing it to an object
 */
let docs=JSON.parse(fs.readFileSync('./dr.json','utf8'));
let patients=JSON.parse(fs.readFileSync('./patients.json','utf8'));
let model=require('./classes');
 /**
 * require('readline') is used to access the readline module
 */
var readline=require('readline');
/**
 * readline.createInterface is used to access process.stdin and process.stdout
 */
var rl=readline.createInterface(process.stdin,process.stdout);
/**
 * test function declaretion
 */
function test(){
    console.log('...........Welcome to ABC clinique............');
    clinique();
    function clinique(){
        console.log(`\nenter :\n
        1 to search doctor,\n
        2 to search Patient,\n
        3 to take Appoinment,\n
        4 to exit.\n`);
        rl.question('option: ',function(key){
            switch (key) {
                case '1':searchDoctors(clinique);
                    break;            
                case '2':searchpatient(clinique);
                    break;
                case '3':takeAppointment(clinique);
                    break;
                case '4':(function(){
                    console.log('\nThank you.');
                    rl.close();
                    process.exit(0);
                })();
                    break;
                default:console.log('invalid option');
                    break;
            }
            /**
             * to search doctors
             * @param {function} callback 
             */
            function searchDoctors(callback){
                rl.question('enter the doctor name or id or specialization :',function(any){
                    docs.doctors.forEach(element => {
                        if(element.name==any||element.id==parseInt(any)||element.Specialization==any){
                            showDetails(element);
                            callback();
                        }
                    });
                })
            }
            /**
             * 
             * @param {Doctor/Patient} element 
             */
            function showDetails(element){
                for (const key in element) {
                    if (element.hasOwnProperty(key)) {
                        if(key=='name')
                            console.log('\n'+'name= '+element[key]+'\n');
                        else if(key=='id')
                            console.log('ID= '+element[key]+'\n');
                        else if(key=='Specialization')
                            console.log('Specialization= '+element[key]+'\n');
                        else if(key=='time')
                            console.log('time :'+element[key]+' everyday.'+'\n');
                        else if(key=='mobileNo')
                            console.log('Phone No= :'+element[key]+'\n'); 
                        else if(key=='age')
                            console.log('age :'+element[key]+',\n');
                            else if(key=='_doc')
                            console.log('under observation of :'+element[key]+'.');                        
                    }
                }
            }
            /**
             * to search patient
             * @param {function} callback 
             */
            function searchpatient(callback){
                rl.question('enter the name or the id of the patient :',function(any){
                    patients.patients.forEach(element => {
                        if(element.name==any||element.id==parseInt(any)){
                            showDetails(element);
                            callback();
                        }
                    });
                })
            }
            /**
             * to show all the doctors to the console
             */
            function showDoctors(){
                docs.doctors.forEach(element => {
                    showDetails(element);
                    console.log('..........................');
                });
            }
            /**
             * 
             * @param {function} callback 
             */
            function takeAppointment(callback){
                showDoctors();
                console.log('Please check our doctors details and then apply for appoinment.\n ');
                rl.question('enter the doctor name or id or specialization for the appoinment :',function(any){
                        docs.doctors.forEach(element => {
                        if(element.name==any||element.id==parseInt(any)||element.Specialization==any){
                            checkAvailability(element,addAppoitnment);
                            
                        }
                    });
                })
                /**
                 * 
                 * @param {Doctor/Patient} element 
                 * @param {Function} callback 
                 */
                function checkAvailability(element,callback){
                    rl.question('enter time :',function(time){
                        availability(time);
                        function availability(time){
                            if(element.time==time){
                                if(element.count<5){
                                    fs.writeFileSync('./dr.json',JSON.stringify(docs),'utf8');                                                                
                                    console.log('available');
                                    callback(element);
                                }else{
                                    console.log( 'not available today\n');
                                    console.log('you can have appoinment tomorrow');
                                    today=today+1;
                                    callback(element);
                                }
                            }else{
                                console.log( 'not available\n');
                                clinique();
                            }
                        }
                    })
                }
                /**
                 * 
                 * @param {Doctor/Patient} element 
                 */
                function addAppoitnment(element){
                    console.log('insert your details: ');
                    rl.question('name=',function(name){
                        //rl.question('id=',function(id){
                            rl.question('mobile no=',function(mobile){
                                rl.question('age=',function(age){
                                    let p=new model.Patient(name,mobile,age);
                                    p.set_doc(element.name);
                                    element.count++; 
                                    console.log('\n'+name.toUpperCase()+'\n.......\nyour ID is =',p.id);
                                    patients.patients.push(p);
                                    /**
                                     * information for the patient
                                     */
                                    let info='and your appointment is fixed with Dr.'+element.name+' in between '+element.time;
                                    /**
                                     * information for the doctor
                                     */
                                    let info2=element.name+' ,your appointment is fixed with Dr.'+p.name+' in between '+element.time;
                                    element.appointment.push(info2);
                                    console.log(info);
                                    fs.writeFileSync('./patients.json',JSON.stringify(patients),'utf8');                            
                                    callback();
                                })
                            })
                        //})
                    })
                }
                
            }
        })
    }        
}
/**
 * test function calling to start execution
 */
test();
