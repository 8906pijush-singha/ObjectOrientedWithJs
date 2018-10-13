/*************************************************************************
 * @description :inventory calculation
 * @author  Pijush Singha
 * @version 1.0
 * @since 10/10/2018
 *************************************************************************/
 /**
 * requiring fs module
 */
 let fs=require('fs');
let data=fs.readFileSync('./inventory.json','utf8');
let json=JSON.parse(data);
/**
 * test() declaretion
 */
function test(){
    //json.rice[3]={"new one":"hi am recently added"};
    /**
     * adding data to the json object
     */
    json.wheats[2]={
        "name":"chakki2",
        "weight":5,
        "price":35
    }
    /**
     * traversing through the json object and accessing the datas one by one
     */
    for (const key in json) {
        if (json.hasOwnProperty(key)) {
            let total_price=0;
            json[key].forEach(element => { 
            total_price=total_price+(element.weight*element.price);
            console.log(element.name,'total price=',element.weight*element.price);
        });
        console.log('Total price for',key,'=',total_price);
        console.log();
        }
    }
}
/**
 * calling the test() to start execuiting the program
 */
test();