/*************************************************************************
 * @description :cards distribution
 * @author  Pijush Singha
 * @version 1.0
 * @since 16/10/2018
 *************************************************************************/
class Card{
    constructor(rank,color){
        this.rank=rank;
        this.color=color;
    }
    /**
    * to shuffle the cards
    */
    static shuffle(cards){
        for (var i = cards.length-1;i>0;i--){
            var j=Math.floor(Math.random()*(i+1));
            var temp = cards[i];
            cards[i] = cards[j];
            cards[j] = temp;
        }
    }
    get rank1(){
        if(this.rank<=10)
            return this.rank;
        else if(this.rank=='Jack')
            return 11;
        else if(this.rank=='Queen')
            return 12;
        else if(this.rank=='King')
            return 13;
        else if(this.rank=='Ace')
            return 14;
    }
    toString(){
        return this.rank+' of '+this.color;
    }
}
/**
 * all the possible ranks of the card
 */
let rank=[2,3,4,5,6,7,8,9,10,"Jack", "Queen", "King", "Ace"];
/**
 * all the possible color of the cards
 */
let color=["Clubs", "Diamonds", "Hearts", "Spades"];


let cards=cardCreation();

function cardCreation(){
    let j=0;
    let k=0;
    let cards=[];
    for(let i=0;i<52;i++){
        cards[i]=new Card(rank[j],color[k]);
        j++;
        if(j==13){
            j=0;
            k++;
        }
    }
    return cards;
}
module.exports={
    Card,
    cards
}