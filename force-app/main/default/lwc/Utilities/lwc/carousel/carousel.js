import { api, LightningElement } from 'lwc';
import DUMMY_PROPERTY from '@salesforce/resourceUrl/DummyProperty';

export default class Carousel extends LightningElement {

    @api
    images;
}