import { LightningElement } from 'lwc';
import DUMMY_PROPERTY from '@salesforce/resourceUrl/DummyProperty';

export default class Home extends LightningElement {

    properties = [
        {name: 'property', info: 'info', image: DUMMY_PROPERTY},
        {name: 'property', info: 'info', image: DUMMY_PROPERTY},
        {name: 'property', info: 'info', image: DUMMY_PROPERTY},
        {name: 'property', info: 'info', image: DUMMY_PROPERTY},
        {name: 'property', info: 'info', image: DUMMY_PROPERTY},
        {name: 'property', info: 'info', image: DUMMY_PROPERTY},
    ];
}