import { api, LightningElement } from 'lwc';

export default class ExpandFilter extends LightningElement {

    bedroomoptions = [
        { label: 'Any', value: 'any' },
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3+', value: '3' },
    ];

    featureoptions = [
        { label: 'Pet-Friendly', value: '0' },
        { label: 'Pool', value: '1' },
        { label: 'Garage', value: '2' },
    ];

    typeoptions = [
        { label: 'House', value: '0' },
        { label: 'Apartment', value: '1' },
        { label: 'Condo', value: '2' },
        { label: 'Townhouse', value: '3' },
    ];

    minPriceOptions = [
        { label: 'Any', value: 'any' },
        { label: '50,000', value: '50000' },
        { label: '100,000', value: '100000' },
        { label: '200,000', value: '200000' },
        { label: '250,000', value: '250000' },
        { label: '300,000', value: '300000' },
        { label: '350,000', value: '350000' },
        { label: '400,000', value: '400000' },
        { label: '450,000', value: '450000' },
        { label: '500,000', value: '500000' },
        { label: '550,000', value: '550000' },
        { label: '1,000,000', value: '1000000' },
    ];

    maxPriceOptions = [
        { label: 'Any', value: 'any' },
        { label: '50,000', value: '50000' },
        { label: '100,000', value: '100000' },
        { label: '200,000', value: '200000' },
        { label: '250,000', value: '250000' },
        { label: '300,000', value: '300000' },
        { label: '350,000', value: '350000' },
        { label: '400,000', value: '400000' },
        { label: '450,000', value: '450000' },
        { label: '500,000', value: '500000' },
        { label: '550,000', value: '550000' },
        { label: '1,000,000', value: '1000000' },
    ];


    typefiltervalue = [];
    bedroomfiltervalue = '0';
    bathroomfiltervalue = '0';
    minpricefiltervalue = 'Any';
    maxpricefiltervalue = 'Any';
    featurefiltervalue = [];

    @api get bedroomvalue(){return this.bedroomfiltervalue == '0' ? 'any' : this.bedroomfiltervalue;}
    @api get typevalue(){return this.typefiltervalue}
    @api get bathroomvalue(){return this.bathroomfiltervalue == '0' ? 'any' : this.bathroomfiltervalue;}
    @api get featurevalue(){return this.featurefiltervalue;}
    @api get minpricevalue(){return this.minpricefiltervalue;}
    @api get maxpricevalue(){return this.maxpricefiltervalue;}

    handleFeatureChange(e) {
        this.featurefiltervalue = e.detail.value;
    }

    handleBedroomChange(e){
        this.bedroomfiltervalue = e.detail.value;
    }

    handleBathroomChange(e){
        this.bathroomfiltervalue = e.detail.value;
    }

    handleTypeChange(e){
        this.typefiltervalue = e.detail.value;
    }

    handleMinPriceChange(e){
        this.minpricefiltervalue = e.detail.value;
    }

    handleMaxPriceChange(e){
        this.maxpricefiltervalue = e.detail.value;
    }

    update(){
        this.dispatchEvent(new CustomEvent('update'));
    }
}