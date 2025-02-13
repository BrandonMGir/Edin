import { api, wire, LightningElement } from 'lwc';
import DUMMY_PROPERTY from '@salesforce/resourceUrl/DummyProperty';
import { publish, MessageContext } from 'lightning/messageService';
import NAV_LINK_CHANNEL from '@salesforce/messageChannel/navLinkChannel__c';

export default class Carousel extends LightningElement {

    @api
    content;

    @wire(MessageContext)
    messageContext;

    handleClick(e){
        const payload = {
            page: e.target.dataset.page,
            id: e.target.dataset.id
        };

        publish(this.messageContext, NAV_LINK_CHANNEL, payload);
    }
}