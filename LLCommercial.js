/*************************************************************************
 * @description : StockManagement using linkedlist
 * @author  Pijush Singha
 * @version 1.0
 * @since 15/10/2018
 *************************************************************************/
let utility=require('./Utility/LLstockUtility');
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
    console.log('welcome to share market'+'\n\nif you have already registered please enter your user-name');
    rl.question('or else enter "register" to register yourself: ',function(username){
        if(username!='register'){
            if(/\d/.test(username)){
                /**
                 * checking if the user is a company or a person
                 */
                if(/110/.test(username)){
                    utility.checkCompany(username,rl);
                }else if(/220/.test(username)){
                    utility.checkUser(username,rl);
                }else{
                    console.log('invalid username');
                    rl.close();
                }
            }else{
                console.log('invalid');
            }

        }else{
            /**
             * for new registration
             */
            utility.registration(rl);
        }     
    })
 }
 /**
  * calling the test function to start execuiting the program
  */
 test();