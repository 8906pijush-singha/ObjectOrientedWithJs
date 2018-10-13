/*************************************************************************
 * @description :utility functions
 * @author  Pijush Singha
 * @version 1.0
 * @since 12/10/2018
 *************************************************************************/
/**
 * requiring fs to access fs module
 */
let utility=require('./stockUtility')
 let fs=require('fs');  
 var appRoot = process.cwd();
/**
 * it shows the stock report 
 */
 function showStockReport(){
        console.log('Stock report: \n')
        fs.readFile(appRoot + '/stockDB.json','utf8',(err,data) => {
        if(err) {
            console.log(err);
        }else
        {
            /**
             * converting the string data to js object
             */
            data=JSON.parse(data);
            data.Stock.forEach(element => {
            console.log('company name='+element.name);
            console.log('company symbol='+element.username);
            console.log('No of total share='+element.shareNo);
            console.log('share price='+element.sharePrice);
            console.log('Total worth of the company='+element.shareNo*element.sharePrice);
            console.log();
            });
        }   
    });
}
function companyRegistration(rl){
    //to take json input
    let data=JSON.parse(fs.readFileSync(appRoot+'/stockDB.json','utf8'));
    /**
     * calling the recurssion function for first time
     */
    recursion();
    function recursion(){
        rl.question('enter your company name: ',function(name){
            rl.question('enter how many share you have: ',function(no){
                rl.question('enter the price for each share: ',function(price){
                    rl.question('if you want to see the stock report \ntype 1 or else press any other key: ',function(yn){
                        try {
                            /**
                             * checking if the data is 1 or not
                             */
                            if(/[1]/.test(yn)){
                                let stock=new utility.Stock(name,no,price);
                                data.Stock.push(stock);
                                fs.writeFileSync(appRoot+'/stockDB.json',JSON.stringify(data),'utf8');
                                showStockReport();
                                rl.close();
                                //utility.inventoryMgr(rl);
                            }
                            /**
                             * checking if the data is valid or not
                             */
                            else if(/\w{2,15}\s*\w$/.test(name)||/\d+/.test(no)||/\d+\.{0-1}\d*/.test(price)){
                                /**
                                 * creating the stock object  
                                 */
                                let stock=new Stock(name,no,price);
                                data.Stock.push(stock);
                                recursion();
                            }    
                            else{
                                throw 'invalid input'
                            }        
                        } catch (err) {
                            console.log(err);
                            recursion();
                        }
                    })
                })
            })
        })
    }
}

 module.exports={
     showStockReport,
     companyRegistration
 }