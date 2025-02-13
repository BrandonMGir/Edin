import { LightningElement, api, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import NAV_LINK_CHANNEL from '@salesforce/messageChannel/navLinkChannel__c';

export default class GalleryLink extends LightningElement {
    @api
    content;

    @wire(MessageContext)
    messageContext;

    subscription = null;

    handleClick(){
        const payload = {
            page: this.content.page,
            id: this.content.id
        };

        publish(this.messageContext, NAV_LINK_CHANNEL, payload);
    }
}