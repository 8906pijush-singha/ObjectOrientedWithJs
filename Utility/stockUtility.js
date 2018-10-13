/*************************************************************************
 * @description :utility functions
 * @author  Pijush Singha
 * @version 1.0
 * @since 12/10/2018
 *************************************************************************/
let control=[];
var appRoot = process.cwd();
let utility=require('./utility');
let fs=require('fs');
function checkCompany(name,rl){
    fs.readFile(appRoot + '/stockDB.json','utf8',(err,data) => {
        if(err) {
            console.log(err);
        }else{
            /**
             * converting the string data to js object
             */
            data=JSON.parse(data);
            data.Stock.forEach(element => {
                if(element.username==name){
                    rl.question('\nenter your password: ',function(password){
                        if(element.password==password){
                            control.push(data);                            
                            control.push(element);
                            console.log(element);
                            menu(rl);
                        }
                    })
                }
            });
        }   
    });
}
function checkUser(name,rl){
    fs.readFile(appRoot + '/user.json','utf8',(err,data) => {
        if(err) {
            console.log(err);
        }else{
            /**
             * converting the string data to js object
             */
            data=JSON.parse(data);
            data.Stock.forEach(element => {
                if(element.username==name){
                    rl.question('\nenter your password: ',function(password){
                        if(element.password==password){
                            console.log(element);
                            control.push(data);                            
                            control.push(element);
                            menu(rl);
                        }
                    })
                }
            });
        }   
    });
}
function userDetails(element){
    for (const key in element) {
        if (element.hasOwnProperty(key)) {
            if(key=='name')
                console.log('\n'+'welcome '+element[key]+'\n');
            else if(key=='shareNo')
                console.log('you have '+element[key]+' no of shares.'+'\n');
            else if(key=='sharePrice')
                console.log('your share price is '+element[key]+' rupees/share')
            
        }
    }
}
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
function userRegistration(rl){
    rl.question('\nenter your name: ',function(name){
        let data=JSON.parse(fs.readFileSync('./user.json','utf8'));
        let user=new User(name);
        data.Stock.push(user);
        fs.writeFileSync('./user.json',JSON.stringify(data),'utf8');
        console.log('\ncongratulation your registration is done');
        console.log(user.toString());
        control.push(data);                            
        control.push(user);
        menu(rl);
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
                            let stock=new Stock(name,no,price);
                                data.Stock.push(stock);
                                fs.writeFileSync(appRoot+'/stockDB.json',JSON.stringify(data),'utf8');
                                console.log('\ncongratulation your registration is done');
                                console.log(user.toString());
                                control.push(data);                            
                                control.push(element);                                
                                menu(rl);
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
function buyShare(rl){
    utility.showStockReport();
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
                                console.log('share no=',element.shareNo);
                                if(parseInt(no)<parseInt(element.shareNo)){
                                    console.log('\nto buy '+no+' shares of '+element.name ,'you will be charged for '+(parseInt(no)*parseInt(element.sharePrice))+' rupees.');
                                    rl.question('\nenter y for yes and n for no ',function(ans){
                                        if(ans=='y'){
                                            element.shareNo=element.shareNo-parseInt(no);
                                            fs.writeFileSync(appRoot+'/stockDB.json',JSON.stringify(data),'utf8');
                                            console.log(element);
                                            let time=new Date().getDate()+'\\'+(parseInt(new Date().getMonth())+parseInt(1)+'\\'+new Date().getFullYear());
                                            console.log('\nyou bought ',no,'shares of',element.name,'on',time);   
                                            console.log('\nand '+(parseInt(no)*parseInt(element.sharePrice))+' is debited from your bank account');
                                            control[1].shareNo=control[1].shareNo+parseInt(no);
                                            control[1].sharePrice=element.sharePrice ;
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
                                    throw 'invalid iinput'
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
function sellShare(rl){
    if(control[1].shareNo==0){
        console.log('\nyou cant sell shares as you dont have shares');
        menu(rl);
    }
    else{
        utility.showStockReport();
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
                                    fs.writeFileSync(appRoot+'/stockDB.json',JSON.stringify(data),'utf8');
                                    control[1].shareNo=control[1].shareNo-parseInt(no);
                                    console.log(control[1]);
                                    let time=new Date().getDate()+'\\'+(parseInt(new Date().getMonth())+parseInt(1)+'\\'+new Date().getFullYear());
                                    console.log('\nyou sold ',no,'shares of',element.name,'on',time);   
                                    console.log('\nand '+(parseInt(no)*parseInt(element.sharePrice))+' is credited to your bank account');
                                    if(/110/.test(control[1].username)){
                                        
                                        fs.writeFileSync(appRoot+'/stockDB.json',JSON.stringify(control[0]),'utf8');                                        
                                    }else if(/220/.test(control[1].username)){
                                        fs.writeFileSync(appRoot+'/user.json',JSON.stringify(control[0]),'utf8');                                        
                                    }
                                    rl.close();
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
                                    fs.writeFileSync(appRoot+'/user.json',JSON.stringify(data),'utf8');
                                    control[1].shareNo=control[1].shareNo-parseInt(no);
                                    console.log(control[1]);
                                    let time=new Date().getDate()+'\\'+(parseInt(new Date().getMonth())+parseInt(1)+'\\'+new Date().getFullYear());
                                    console.log('\nyou sold ',no,'shares of',element.name,'on',time);   
                                    console.log('\nand '+(parseInt(no)*parseInt(element.sharePrice))+' is credited to your bank account');
                                    if(/110/.test(control[1].username)){
                                        fs.writeFileSync(appRoot+'/stockDB.json',JSON.stringify(control[0]),'utf8');                                        
                                    }else if(/220/.test(control[1].username)){
                                        fs.writeFileSync(appRoot+'/user.json',JSON.stringify(control[0]),'utf8');                                        
                                    }
                                    rl.close();
                                }
                            })
                        }
                    })

                }
            })
        })
    }
}

 class User{
    constructor(name){
        this.name=name;
        this.username=name+220;
        this.password=name;
        this.shareNo=0;
        this.sharePrice=0;
        this.shareInfo=[];
    }
 }
 User.prototype.toString=function(){
    return 'name='+this.name.toUpperCase()+'\n'+
            'user-name='+this.username+'\n'+
            'password='+this.password+'\n'+
            'total no of shares you bought='+this.shareNo+'\n'+
            'your share price='+this.sharePrice+'\n'+
            'and your share info is'+this.shareInfo;
 }
 /**
 * defination of stock class
 */
class Stock{
    constructor(name,no,price){
        this.password=name;
        this.name=name.toUpperCase();
        this.shareNo=no;
        this.sharePrice=price;
        this.username=this.password+110;
    }
}
Stock.prototype.toString=function(){
    return 'name='+this.name+'\n'+
            'user-name='+this.username+'\n'+
            'password='+this.password+'\n'+
            'total no of share='+this.shareNo+'\n'+
            'share price='+this.price;
 }
 module.exports={
     checkUser,
     checkCompany,
     User,
     registration,
     companyRegistration,
     Stock
 }
