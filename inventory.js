/*************************************************************************
 * @description :inventory calculation
 * @author  Pijush Singha
 * @version 1.0
 * @since 10/10/2018
 *************************************************************************/
let fs=require('fs');
 /**
 * require('readline') is used to access the readline module
 */
var readline=require('readline');
/**
 * readline.createInterface is used to access process.stdin and process.stdout
 */
var rl=readline.createInterface(process.stdin,process.stdout);

let data=fs.readFileSync('./inventory1.json','utf8');
let json=JSON.parse(data);
/**
 * test() declaretion
 */
function test(){
    rl.question('enter the type: ',function(type){
        rl.question('enter name: ',function(name){
            rl.question('enter weight: ',function(weight){
                rl.question('enter price per kg: ',function(price){
                    let inven=new inventory(type,name,weight,price);
                    json.inventory.push(inven);
                    fs.writeFileSync('./inventory1.json',JSON.stringify(json),'utf8');
                    console.log('file is saved');
                    rl.close();
                    console.log('total price of '+inven.name+' ' +inven.type+' is '+inven.total_price);
                })
            })
        })
    })
}
class inventory{
    constructor(type,name,weight,price){
        this.type=type;
        this.name=name;
        this.weight=weight;
        this.price=price;
        
    }
    get total_price(){
        return parseInt(this.weight)*parseInt(this.price);
    }
}
/**
 * calling the test() to start execuiting the program
 */
test();