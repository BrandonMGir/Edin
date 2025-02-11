import { api, LightningElement } from 'lwc';
import LightningModal from 'lightning/modal';

export default class PictureModal extends LightningModal {

    @api
    content;

    handleOkay(){
        this.close('okay');
    }
}