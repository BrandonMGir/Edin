import { api, LightningElement } from 'lwc';

export default class CardGrid extends LightningElement {

    @api
    cardinfo;

    @api
    variant = 'default';


    get isDefault(){
        return this.variant == 'default';
    }

    get isDetailed(){
        return this.variant == 'detailed';
    }
}