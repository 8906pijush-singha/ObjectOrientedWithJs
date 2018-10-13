/*************************************************************************
 * @description :STOCK REPORT
 * @author  Pijush Singha
 * @version 1.0
 * @since 11/10/2018
 *************************************************************************/
let fs=require('fs');
let utility=require('./Utility/utility');
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
    utility.companyRegistration(rl);
}
test();
