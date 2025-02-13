import { LightningElement, wire } from 'lwc';
import DUMMY_PROPERTY from '@salesforce/resourceUrl/DummyProperty';
import Id from '@salesforce/user/Id';
import getUser from '@salesforce/apex/AccountController.getUserById';

export default class Account extends LightningElement {

    @wire(getUser, {id: Id})
    user({error, data}){
        if(data){
            console.log('USER: ' + JSON.stringify(data));
            this.name = data.Name;
            this.email = data.Email;
        }
        else{
            console.log('ERROR: ' + JSON.stringify(error));
        }
    }

    profileimage = DUMMY_PROPERTY;
    name = '';
    email = '';

    favoritedproperties = [
        {name: 'property 1'},
        {name: 'property 2'},
        {name: 'property 3'},
        {name: 'property 4'},
        {name: 'property 5'},
    ];
}