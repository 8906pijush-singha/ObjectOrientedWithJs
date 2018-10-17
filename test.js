
let fs=require('fs');
let utility=require('./Utility/LLstockUtility')

function test()
{

    let user=new utility.StockAccount('pijush');
    console.log(user);
    let user1=new utility.User('pijush');
    console.log(user1);
    let user2=new utility.Stock('pijush',50,50);
    console.log(user2);
    console.log(user2.shareNo1);
}
test();

