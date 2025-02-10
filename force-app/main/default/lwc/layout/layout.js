import { LightningElement } from 'lwc';

export default class Layout extends LightningElement {

    pages = [
        {name: 'home', label: 'Home', active: true},
        {name: 'listings', label: 'Listings', active: false},
        {name: 'details', label: 'Details', active: false},
        {name: 'account', label: 'Account', active: false}
    ];
}