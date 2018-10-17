/*************************************************************************
 * @description :cards distribution
 * @author  Pijush Singha
 * @version 1.0
 * @since 16/10/2018
 *************************************************************************/
/**
 * requiring the cards to access card object and crads array
 */
let card=require('./cards');
let player1=require('./player');
let cards=card.cards;
let ds=require('../../DataStructureWithJs/dataStructure');

 function test(){
    /**
     * shuffling the array cards
     */
    card.Card.shuffle(cards);
    /**
     * two d player array
     */
    let distributer1=[[],[],[],[]];
    let distributer2=[[],[],[],[]];
    /**
     * initialising variable k to 0 to start the distribution from first element
     */
    let k=0;
    for(let i=0;i<4;i++){
       for(let j=0;j<9;j++){
           /**
            * calling toString() to print it properly
            */
           distributer1[i][j]=cards[k].toString();
           distributer2[i][j]=cards[k];
           k++;
       }
    }
    /**
     * creating player object
     */

    /**
     * CREATING A QUEUE TO HOLD ALL THE PLAYERS CARDS
     */
    let q=new ds.Queue();
    for(let j=0;j<4;j++){
        q.push( new player1.Player(distributer2[j]).hand);
    }
    console.log('before sorting:\n');
    console.log(distributer1);
    console.log('\nafter sorting:\n');
    let hand=1;
    while(q.isEmpty()==false){
        console.log('\nhand '+hand+'\n')
        let q1=q.pop();
        while(q1.isEmpty()==false){
            console.log(q1.pop().toString());
        }
        hand++;
    }
    //console.log(util.inspect(q,{depth: null}));
}
test();