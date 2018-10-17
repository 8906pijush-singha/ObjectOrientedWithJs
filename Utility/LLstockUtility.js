/*************************************************************************
 * @description : StockManagement using linkedlist
 * @author  Pijush Singha
 * @version 1.0
 * @since 15/10/2018
 *************************************************************************/
let ds=require('../../DataStructureWithJs/dataStructure')

class StockAccount{
    constructor(name){
        this.name=name;
        this.shareInfo1;
        this.stockSymbol;
        this.dateTime;
    }
    static get shareInfo1(){
        return new ds.linkedList();
    }
    static get stockSymbol(){
        return new ds.Stack();
    }
    static get dateTime(){
        return new ds.Queue();
    }
}

StockAccount.prototype.showStockReport=function(){
    utility1.showStockReport();
    //utility1.showUserReport();
}

 /**
 * defination of stock class
 */

class Stock extends StockAccount{
    constructor(name,no,price){
        super(name);
        this.password=name;
        this.name=name.toUpperCase();
        this.shareNo=no;
        this.sharePrice=price;
        this.username=this.password+110;
        this.shareinfo=[];
    }
    get shareNo1(){
        return this.shareNo;
    }
    set shareNo1(value){
        this.shareNo=value;
    }
}

/**
 * overriding toString()
 */

Stock.prototype.toString=function(){
    return 'name='+this.name+'\n'+
            'user-name='+this.username+'\n'+
            'password='+this.password+'\n'+
            'total no of share='+this.shareNo+'\n'+
            'share price='+ this.price +'\n'+
            'and your share info is'+this.shareinfo;;
}

/**
 * user object model
 */
class User extends StockAccount{
    constructor(name){
        super(name);
        this.username=name+220;
        this.password=name;
        this.shareNo=0;
        this.sharePrice=0;
        this.shareinfo=[];
    }
    get shareNo1(){
        return this.shareNo;
    }
    set shareNo1(value){
        this.shareNo=value;
    }

 }
 User.prototype.printReport=function(){
    console.log(this.shareinfo);
}

 /**
  * toString override 
  */
 User.prototype.toString=function(){
    return 'name='+this.name.toUpperCase()+'\n'+
            'user-name='+this.username+'\n'+
            'password='+this.password+'\n'+
            'total no of shares you bought='+this.shareNo+'\n'+
            'your share price='+this.sharePrice+'\n'+
            'and your share info is'+this.shareinfo;
 }

class CompanyShares{
    constructor(symbol,shareNo,dateTime,type){
        this.symbol=symbol;
        this.shareNo=shareNo;
        this.dateTime=dateTime;
        this.type=type;
    }
    get details(){
        return this.symbol +' '+type +' '+ this.shareNo+ ' on'+this.dateTime;
    }
}

let utility=require('./stockUtility');
let utility1=require('./utility');

/**
 * control is to save the user control in control[0] and control[1]
 */
let control=[];
var appRoot = process.cwd();
/**
 * requiring the fs module
 */
let fs=require('fs');
/**
 * 
 * @param {String} name 
 * @param {readline} rl 
 */
function checkCompany(name,rl){
   let flag=0;
    /**
     * taking the data from stockDB.json
     */
    fs.readFile(appRoot + '/stockDB.json','utf8',(err,data) => {
        if(err) {
            console.log(err);
        }else{
            /**
             * converting the string data to js object
             */
            data=JSON.parse(data);
            /**
             * traversing through the object to check the valid input
             */
            let len=data.Stock.length;
            data.Stock.forEach(element => {
                if(element.username==name){
                    rl.question('\nenter your password: ',function(password){
                        if(element.password==password){
                            control.push(data);                            
                            control.push(element);
                            userDetails(element);
                            flag=0;
                            menu(rl);
                        }else{
                            console.log('invalid password');
                            rl.close();
                        }
                    })
                }else{
                    flag++;
                }
            });
            if(flag==len){
                console.log('invalid usrname');
                rl.close();
            }
            
        }   
    });
}
/**
 * 
 * @param {String} name 
 * @param {readline} rl 
 */
function checkUser(name,rl){
    let flag=0;
    /**
     * taking the data from json file
     */
    fs.readFile(appRoot + '/user.json','utf8',(err,data) => {
        if(err) {
            console.log(err);
        }else{
            /**
             * converting the string data to js object
             */
            data=JSON.parse(data);
            /**
             * traversing through the object to check the valid input
             */
            let len=data.Stock.length;
            data.Stock.forEach(element => {
                if(element.username==name){
                    rl.question('\nenter your password: ',function(password){
                        flag=0;
                        if(element.password==password){
                          
                            //storing the user data to control[]
                            control.push(data);                            
                            control.push(element);
                            userDetails(element);
                            menu(rl);
                        }else{
                            console.log('invalid password');
                            rl.close();
                        }
                    })
                }
            });
            if(flag==len){
                console.log('invalid usrname');
                rl.close();
            }
        }   
    });
}
/**
 * 
 * @param {user\company} element 
 */
function userDetails(element){
    for (const key in element) {
        if (element.hasOwnProperty(key)) {
            if(key=='name')
                console.log('\n'+'welcome '+element[key]+'\n');
            else if(key=='shareNo')
                console.log('you have '+element[key]+' no of shares.'+'\n');
            else if(key=='sharePrice')
                console.log('your share price is '+element[key]+' rupees/share\n');
            else if(key=='shareinfo')
                console.log('your transactions are :\n'+element[key].join().replace(/\,/g,'\n'));
            
        }
    }
}
/**
 * 
 * @param {readline} rl 
 */
function registration(rl){
    rl.question('\nfor company registration please enter 1 for a person type 2:',function(n){
        if(n==2){
            userRegistration(rl);
        }
        else if(n==1){
            companyRegistration(rl);
        }
        else{
            console.log("invalid input please try again");
        }
    })
}
/**
 * 
 * @param {readline} rl 
 */
function userRegistration(rl){
    rl.question('\nenter your name: ',function(name){
        /**
         * taking the data from json file and changing it into js object
         */
        let data=JSON.parse(fs.readFileSync('./user.json','utf8'));
        let user=new User(name);
        /**
         * inserting more data
         */
        data.Stock.push(user);
        /**
         * saving the json file
         */
        fs.writeFileSync('./user.json',JSON.stringify(data),'utf8');
        console.log('\ncongratulation your registration is done');
        console.log(user.toString());
        /**
         * storing the user info to the control[]
         */
        control.push(data);                            
        control.push(user);
        menu(rl);//calling the manu array
    })
}
function companyRegistration(rl){
    //to take json input
    let data=JSON.parse(fs.readFileSync(appRoot+'/stockDB.json','utf8'));
    /**
     * calling the recurssion function for first time
     */
    recursion();
    function recursion(){
        rl.question('\nenter your company name: ',function(name){
            rl.question('\nenter how many share you have: ',function(no){
                rl.question('\nenter the price for each share: ',function(price){
                        try{
                            if(/\w{2,15}\s*\w$/.test(name)||/\d+/.test(no)||/\d+\.{0-1}\d*/.test(price)){
                                /**
                                 * creating the company object using stock constructor
                                 */
                                let stock=new Stock(name,no,price);
                                data.Stock.push(stock);
                                /**
                                 * adding the newly created object to the json file
                                 */
                                fs.writeFileSync(appRoot+'/stockDB.json',JSON.stringify(data),'utf8');
                                console.log('\ncongratulation your registration is done');
                                console.log(stock.toString());
                                control.push(data);                            
                                control.push(stock);                                
                                menu(rl);//calling the menu
                            }    
                            else{
                                throw 'invalid input'
                            }        
                        } catch (err) {
                            console.log(err);
                            rl.close();
                        }    
                })
            })
        })
    }
}
/**
 * manu for the commercial .js program
 * @param {readline} rl 
 */
function menu(rl){
    console.log('menu: '+'\n'+
        '1 to buy shares'+'\n'+
        '2 to sell shares'+'\n');
    rl.question('\nenter your option:',function(key){
        switch (parseInt(key)) {
            case 1:buyShare(rl);
                break;
            case 2:sellShare(rl);
                break;
            default:console.log('\nplease enter a valid input and try again');
                break;
        }
    })
}
/**
 * to buy shares
 * @param {readline} rl 
 */
function buyShare(rl){
    StockAccount.prototype.showStockReport();
    console.log("\nplease enter the company symbol properly to buy that company shares:")
    rl.question('',function(symbol){
        fs.readFile(appRoot + '/stockDB.json','utf8',(err,data) => {
            if(err) {
                console.log(err);
            }else{
                /**
                 * converting the string data to js object
                 */
                data=JSON.parse(data);
                data.Stock.forEach(element => {
                    if(element.username==symbol){
                        rl.question('\nhow many shares you want to buy ? ',function(no){
                            try {
                                if(parseInt(no)<parseInt(element.shareNo)){
                                    console.log('\nto buy '+no+' shares of '+element.name ,'you will be charged for '+(parseInt(no)*parseInt(element.sharePrice))+' rupees.');
                                    rl.question('\nenter y for yes and n for no :',function(ans){
                                        if(ans=='y'){
                                            element.shareNo=element.shareNo-parseInt(no);
                                            /**
                                             * saving the company information file
                                             */
                                            fs.writeFileSync(appRoot+'/stockDB.json',JSON.stringify(data),'utf8');
                                            let time=new Date().getDate()+'\\'+(parseInt(new Date().getMonth())+parseInt(1)+'\\'+new Date().getFullYear());
                                            let info1=control[1].name+' ,you bought '+no+' shares of '+element.name+' on '+ time;
                                            let info2=element.name+' ,you sold '+no+' shares to '+control[1].name+' on '+ time;

                                            let companyShares=new CompanyShares(control[1].username,control[1].shareNo,control[1].dateTime,'bought');
                                            //element.shareinfo.push(companyShares.details);
                                            element.shareinfo.push(info2);

                                            User.shareInfo1.add(info1);
                                            Stock.shareInfo1.add(info2);
                                            StockAccount.stockSymbol.push(element.username);
                                            StockAccount.dateTime.push(time);

                                            /**
                                             * showing user details to the console
                                             */  
                                            userDetails(element);  
                                            console.log('\n'+info1);
                                            console.log('and '+(parseInt(no)*parseInt(element.sharePrice))+' is debited from your bank account');
                                            control[1].shareinfo.push(info1);
                                            control[1].shareNo=control[1].shareNo+parseInt(no);
                                            control[1].sharePrice=element.sharePrice ;
                                            /**
                                             * saving the user information
                                             */
                                            fs.writeFileSync(appRoot+'/user.json',JSON.stringify(control[0]),'utf8');
                                            rl.close();
                                        }else if(ans=='n'){
                                            menu(rl);
                                        }else{
                                            console.log("invalid input");
                                            rl.close();
                                        }
                                    })
                                }
                                else
                                    throw 'invalid input'
                            }catch(err){
                                console.log(err);
                                rl.close();
                            }
                        })
                    }
                });
            }   
        });
    })

}
/**
 * to sell shares
 * @param {readline} rl 
 */
function sellShare(rl){
    /**
     * checking if the user have any shares to sell
     */
    if(control[1].shareNo==0){
        console.log('\nyou cant sell shares as you dont have shares');
        menu(rl);
    }
    else{
        /**
         * showing all the possible customers
         */
        utility1.showStockReport();
        utility1.showUserReport();
        rl.question('\nwhom do you want to sell your shares,\n\n enter symbol or username :\n',function(symbol){
            rl.question('\nhow many shares you want to sell: ',function(no){
                if(/110/.test(symbol)){
                    fs.readFile(appRoot + '/stockDB.json','utf8',(err,data) => {
                        if(err) {
                            console.log(err);
                        }else{
                            data=JSON.parse(data);
                            data.Stock.forEach(element => {
                                if(element.username==symbol){
                                    element.shareNo=element.shareNo+parseInt(no);
                                    /**
                                     * saving the company info to the json file
                                     */
                                    fs.writeFileSync(appRoot+'/stockDB.json',JSON.stringify(data),'utf8');
                                    control[1].shareNo=control[1].shareNo-parseInt(no);
                                    let time=new Date().getDate()+'\\'+(parseInt(new Date().getMonth())+parseInt(1)+'\\'+new Date().getFullYear());
                                    let info1=element.name+' ,you bought '+no+' shares of '+control[1].name+' on '+ time;
                                    let info2=control[1].name+' ,you sold '+no+' shares to '+element.name+' on '+ time;
                                    StockAccount.shareInfo.add(info1);
                                            StockAccount.stockSymbol.push(element.username);
                                            StockAccount.shareInfo.add(info2);
                                            StockAccount.dateTime.push(time);

                                    /**
                                     * showing the user details to the console
                                     */
                                    userDetails(control[1]);
                                    console.log('\n'+info2);   
                                    console.log('and '+(parseInt(no)*parseInt(element.sharePrice))+' is credited to your bank account');
                                    if(/110/.test(control[1].username)){
                                        /**
                                         * saving the changed data
                                         */
                                        fs.writeFileSync(appRoot+'/stockDB.json',JSON.stringify(control[0]),'utf8');                                        
                                    }else if(/220/.test(control[1].username)){
                                        /**
                                         * saving the changed data
                                         */
                                        fs.writeFileSync(appRoot+'/user.json',JSON.stringify(control[0]),'utf8');                                        
                                    }
                                    rl.close();
                                }else{
                                    console.log('invalid');
                                }
                            })   
                        }
                    })        
                }else if(/220/.test(symbol)){
                    fs.readFile(appRoot + '/user.json','utf8',(err,data) => {
                        if(err) {
                            console.log(err);
                        }else{
                            data=JSON.parse(data);
                            data.Stock.forEach(element => {
                                if(element.username==symbol){
                                    element.shareNo=element.shareNo+parseInt(no);
                                    /**
                                     * saving the user info to the json file
                                     */
                                    fs.writeFileSync(appRoot+'/user.json',JSON.stringify(data),'utf8');
                                    control[1].shareNo=control[1].shareNo-parseInt(no);
                                    let time=new Date().getDate()+'\\'+(parseInt(new Date().getMonth())+parseInt(1)+'\\'+new Date().getFullYear());
                                    
                                    let info1=element.name+' ,you bought '+no+' shares of '+control[1].name+' on '+ time;
                                    let info2=control[1].name+' ,you sold '+no+' shares to '+element.name+' on '+ time;
                                    StockAccount.shareInfo.add(info1);
                                    StockAccount.shareInfo.add(info2); 
                                            StockAccount.dateTime.push(time);
                                            StockAccount.stockSymbol.push(element.username);
                                    /**
                                     * showing the user data to the console
                                     */
                                    userDetails(control[1]);
                                    console.log('\n'+info2);   
                                    console.log('and '+(parseInt(no)*parseInt(element.sharePrice))+' is credited to your bank account');
                                    if(/110/.test(control[1].username)){
                                        fs.writeFileSync(appRoot+'/stockDB.json',JSON.stringify(control[0]),'utf8');                                        
                                    }else if(/220/.test(control[1].username)){
                                        fs.writeFileSync(appRoot+'/user.json',JSON.stringify(control[0]),'utf8');                                        
                                    }
                                    rl.close();
                                }else{
                                    console.log('invalid');
                                }
                            })
                        }
                    })

                }
            })
        })
    }
}



module.exports={
    checkUser,
    checkCompany,
    userDetails,
    registration,
    StockAccount,
    User,
    Stock
}