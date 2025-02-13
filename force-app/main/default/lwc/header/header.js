import { api, LightningElement } from 'lwc';
import Id from '@salesforce/user/Id';

import {NavigationMixin} from "lightning/navigation";

const LOGOUTPAGEREF = {
    type: "comm__loginPage",
    attributes: {
        actionName: "logout"
    }
};

export default class Header extends NavigationMixin(LightningElement) {

    logout(){
        this[NavigationMixin.Navigate](LOGOUTPAGEREF);
    }

    get isLoggedIn(){
        return Id != null;
    }
}