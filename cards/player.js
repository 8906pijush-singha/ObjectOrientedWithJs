/*************************************************************************
 * @description :cards distribution
 * @author  Pijush Singha
 * @version 1.0
 * @since 16/10/2018
 *************************************************************************/
/**
 * requiring data structure module
 */
 let ds=require('../../DataStructureWithJs/dataStructure');
/**
 * player class defination
 */
class Player{
    /**
     * 
     * @param {array} cards 
     */
    constructor(cards){
        this.cards=cards;
    }
    /**
     * @returns queue
     */
    get hand(){
        let queue=new ds.Queue();
        for(let i=0;i<this.cards.length;i++){
            queue.sorted(this.cards[i]);
        }
        return queue;
    }
}
module.exports={
    Player
}