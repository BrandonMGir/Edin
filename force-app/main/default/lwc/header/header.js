import { api, LightningElement } from 'lwc';

export default class Header extends LightningElement {
    loggedIn = false;

    @api
    pages = [];
}