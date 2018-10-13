/*************************************************************************
 * @description : StockManagement
 * @author  Pijush Singha
 * @version 1.0
 * @since 12/10/2018
 *************************************************************************/
let utility=require('./Utility/stockUtility');
/*
*require('readline') is used to access the readline module
*/
var readline=require('readline');
/*
*readline.createInterface is used to access process.stdin and process.stdout
*/
var rl=readline.createInterface(process.stdin,process.stdout);

 function test(){
    console.log('welcome to share market'+'\n\nif you have already registered please enter your user-name');
    rl.question('or else enter "register" to register yourself: ',function(username){
        if(username!='register'){
            if(/\d/.test(username)){
                if(/110/.test(username)){
                    utility.checkCompany(username,rl);
                }else if(/220/.test(username)){
                    utility.checkUser(username,rl)
                }
            }
        }else{
            utility.registration(rl);
        }     
    })
 }
 test();