/*************************************************************************
 * @description :cards distribution
 * @author  Pijush Singha
 * @version 1.0
 * @since 17/10/2018
 *************************************************************************/
let person=require('./Person');
/**
 * requiring fs module to use readFineSync
 */
let fs=require('fs');
 /**
 * require('readline') is used to access the readline module
 */
var readline=require('readline');
/**
 * readline.createInterface is used to access process.stdin and process.stdout
 */
var rl=readline.createInterface(process.stdin,process.stdout);
/**
 * taking the data as a string from a json file
 */
let json=fs.readFileSync('./addressbook.json','utf8');
/**
 * converting the string object to a js object
 */
let data=JSON.parse(json);
/**
 * test function declaration
 */
function test(){
    /**
     * calling for the first time
     */
entryUpdate();
function entryUpdate(){
    console.log(`enter :\n
1 to add an entry,\n
2 to update an entry,\n
3 to search an entry,\n
4 to delete an entry,\n
5 to show all the entry,\n
6 to exit.`);
    rl.question('\ninsert option :',function(key){
        switch (key) {
            case '1':addEntry(entryUpdate);
                break;
            case '2':updateEntry(entryUpdate);
                break;
            case '3':searchEntry(entryUpdate);
                break;
            case '4':deleteEntry(entryUpdate);
                break;
            case '5':showEntry(entryUpdate);
                break;   
            case '6':exit();
                break;
            default:(function(){
                console.log('not a valid option');
                rl.close();
            })();
                break;
        }
        /**
         * 
         * @param {function} callback 
         */
    function addEntry(callback){
        rl.question('enter the name :',function(name){
            //console.log(/\w{2,15}\s*\w*\s*\w*/.test(name));
            rl.question('enter the city :',function(city){
                //console.log(/\w{2,15}$/.test(city));
                rl.question('enter the pin no :',function(pin){
                    //console.log(/\d{6}$/.test(pin));
                    rl.question('enter the phone no :',function(phnNo){
                        //console.log(/\d{10}$/.test(phnNo));
                        
                        rl.question('enter the email addresss :',function(email){
                          //  console.log(/@/.test(email));
                            try {
                                /**
                                 * checking all the values using regex
                                 */
                                if(/\w{2,15}\s*\w*\s*\w*/.test(name)&&/\w{2,15}$/.test(city)&&/\d{6}$/.test(pin)&&/\d{10}$/.test(phnNo)&&/@/.test(email)){
                                    let p=new person.Person(name,city,pin,phnNo,email);
                                    data.details.push(p);
                                    fs.writeFileSync('./addressbook.json',JSON.stringify(data),'utf8');
                                    console.log('file is saved.');
                                    callback();
                                }
                                else{
                                    throw 'invalid input'
                                }
                            } catch (err) {
                                console.log(err);
                                callback();
                            }
                            // p.setCity(city);
                            // p.setEmail(email);
                            // p.setName(name);
                            // p.setPhonNo(phnNo);
                            // p.setPin(pin);
                            
                        })
                    })
                })
            })
        })
    }
    /**
     * 
     * @param {function} callback 
     */
    function updateEntry(callback){
        rl.question('enter the name :',function(name){
            let data=JSON.parse(fs.readFileSync('./addressbook.json','utf8'));
            let len=data.details.length;
            let temp=0;
            data.details.forEach(element => {
                if(element._name==name){
                    userDetails(element);
                    rl.question('enter the city :',function(city){
                        rl.question('enter the pin no :',function(pin){
                            rl.question('enter the phone no :',function(phnNo){
                                rl.question('enter the email addresss :',function(email){
                                    try {
                                        if(/\w{2,15}\s*\w*\s*\w*/.test(name)&&/\w{2,15}$/.test(city)&&/\d{6}$/.test(pin)&&/\d{10}$/.test(phnNo)&&/@/.test(email)){
                                            /**
                                             * replacing old value with new values
                                             */
                                            element._city=city;
                                            element._pin=pin;
                                            element._phonNo=phnNo;
                                            element._email=email;
                                            fs.writeFileSync('./addressbook.json',JSON.stringify(data),'utf8');
                                            console.log('file is saved.');
                                            callback();
                                        }
                                        else{
                                            throw 'invalid input'
                                        }
                                    } catch (err) {
                                        console.log(err);
                                        callback();
                                    }          
                                })
                            })
                        })
                    })
                }else{
                    temp++;
                }
            });
            if(len==temp){
                console.log('no such element');
                callback();
            }
        })
    }
    /**
     * @param {function} callback 
     */
    function searchEntry(callback){
        rl.question('enter the name :',function(name){
            let data=JSON.parse(fs.readFileSync('./addressbook.json','utf8'));
            let len=data.details.length;
            let temp=0;
            data.details.forEach(element => {
                if(element._name==name){
                    /**
                     * showing the details
                     */
                    userDetails(element);
                }else{
                    temp++;
                }
            });
            if(len==temp){
                console.log('no such element');
            }
            callback();
        })
    }
    function deleteEntry(callback){
        rl.question('enter the name that you want to delete : ',function(name){
            let data=JSON.parse(fs.readFileSync('./addressbook.json','utf8'));
            let len=data.details.length;
            let index=0;
            data.details.forEach(element => {
                if(element._name==name){
                    userDetails(element);
                    data.details.splice(index,1);
                    fs.writeFileSync('./addressbook.json',JSON.stringify(data),'utf8');
                    console.log('this data is deleted.');
                }else{
                    index++;
                }
            });
            if(len==index){
                console.log('no such element');
            }
            callback();
        })
    }
    function showEntry(callback){
        let data=JSON.parse(fs.readFileSync('./addressbook.json','utf8'));
        for(let i=0;i<data.details.length;i++){
            userDetails(data.details[i]);
        }
        callback();
    }
    function exit(){
        console.log('thank you');
        rl.close();
    }
     /**
     * 
     * @param {Person} element 
     */
    function userDetails(element){
        for (const key in element) {
            if (element.hasOwnProperty(key)) {
                if(key=='_name')
                    console.log('\n'+'name='+element[key]+'\n');
                else if(key=='_city')
                    console.log('City = '+element[key]+'\n');
                else if(key=='_pin')
                    console.log('Pin code = '+element[key]+'\n');
                else if(key=='_phonNo')
                    console.log('Phone no = '+element[key]+'\n');
                    else if(key=='_email')
                    console.log('Email address = '+element[key]+'\n');
            }
        }
    }

    })
}

}
test();