import { api, LightningElement } from 'lwc';
import PictureModal from 'c/pictureModal';

export default class GalleryImage extends LightningElement {

    @api
    content;

    handleClick(){
        this.openModel();
    }

    async openModel(){
        const result = await PictureModal.open({
            size: 'large',
            content: this.content.image
        });
    }
}