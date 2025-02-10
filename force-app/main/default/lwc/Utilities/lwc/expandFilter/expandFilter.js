import { api, LightningElement } from 'lwc';

export default class ExpandFilter extends LightningElement {

    @api
    bedroomoptions;

    @api
    featureoptions;

    bedroomfiltervalue = '';
    featurefiltervalue = [];

    handleFeatureChange(e) {
        this.featurefiltervalue = e.detail.value;
    }

    update(){
        //custom event
    }
}