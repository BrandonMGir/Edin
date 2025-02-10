import { LightningElement } from 'lwc';
import DUMMY_PROPERTY from '@salesforce/resourceUrl/DummyProperty';

export default class Carousel extends LightningElement {

    images = [
        {name: 'img1', image: DUMMY_PROPERTY},
        {name: 'img2', image: DUMMY_PROPERTY},
        {name: 'img3', image: DUMMY_PROPERTY},
    ];
}