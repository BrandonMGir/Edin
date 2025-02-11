import { LightningElement } from 'lwc';
import DUMMY_PROPERTY from '@salesforce/resourceUrl/DummyProperty';

export default class Account extends LightningElement {

    profileimage = DUMMY_PROPERTY;
    name = 'John Doe';
    email = 'jdoe123@gmail.com';

    favoritedproperties = [
        {name: 'property 1'},
        {name: 'property 2'},
        {name: 'property 3'},
        {name: 'property 4'},
        {name: 'property 5'},
    ];
}