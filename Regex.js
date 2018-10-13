/*************************************************************************
 * @description :REGEX
 * @author  Pijush Singha
 * @version 1.0
 * @since 11/10/2018
 *************************************************************************/
/*
*require('readline') is used to access the readline module
*/
var readline=require('readline');
/*
*readline.createInterface is used to access process.stdin and process.stdout
*/
var rl=readline.createInterface(process.stdin,process.stdout);
/**
 * test function declaretion
 */
function test(){
   let data='Hello <<name>>,\n'+
   'We have your full name as <<full name>> in our system.\n'+
   'your contact number is 91-xxxxxxxxxx.\n'+
   'Please,let us know in case of any clarification\n'+
   'Thank you BridgeLabz 01/01/2016.\n';
   console.log(data);
   /**
    * taking the values of name fullname and phone number from the user
    */
   rl.question('enter your name: ',function(name){
       console.log(/\w{2,15}$/.test(name));
        rl.question('enter your full name: ',function(fname){
            console.log(/\w{2,15}\s*\w*\s*\w*/.test(fname));
            rl.question('enter your mobile no: ',function(mobNo){
                console.log(/[1-9]\d{9}$/.test(mobNo));
                rl.question('enter the date: ',function(date){
                    console.log(/(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/([12]\d{3})/.test(date))
                /**
                 * checking if the data are valid or not using regex
                 */
                    try {
                        if(/\w{2,15}$/.test(name)&&/\w{2,15}\s*\w*\s*\w*/.test(fname)&&/[1-9]\d{9}$/.test(mobNo)&&
                        /(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/([12]\d{3})/.test(date)){
                            // let date=new Date().getDate()+'\\'+(parseInt(new Date().getMonth())+1)+'\\'+
                            // new Date().getFullYear();
                            /**
                             * replacing the data  
                             */
                            data= data.replace('<<name>>',name).
                            replace('<<full name>>',fname.toUpperCase()).replace('xxxxxxxxxx',mobNo).
                            replace('01/01/2016',date);
                            console.log(data);                    
                        }
                        else
                            throw 'invalid input'
                   } catch (err) {
                       console.log(err);
                   }
                   rl.close();
                })
            })
        })
   })
}
/**
 * calling test function to start execuiting the program
 */
test();