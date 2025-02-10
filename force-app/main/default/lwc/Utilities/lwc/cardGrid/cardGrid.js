import { api, LightningElement } from 'lwc';

export default class CardGrid extends LightningElement {

    @api
    cardinfo;

    connectedCallback(){
        console.log('card info: ' + this.cardinfo);
    }

    renderedCallback(){
        console.log('card info: ' + this.cardinfo);
    }
}