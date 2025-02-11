import { api, LightningElement } from 'lwc';
import PictureModal from 'c/pictureModal';

export default class Gallery extends LightningElement {

    @api
    images;

    handleClick(event){
        console.log(event.target.dataset);
        this.handleModal(event.target.dataset.image);
    }

    async handleModal(image){
        const result = await PictureModal.open({
            size: 'large',
            content: image
        });
    }

    next(){
        const gallery = this.refs.gallery;
        const item = this.template.querySelector(".item");
        const itemWidth = item.offsetWidth;

        gallery.scrollBy({left: -itemWidth, behavior: "smooth"});
    }

    previous(){
        const gallery = this.refs.gallery;
        const item = this.template.querySelector(".item");
        const itemWidth = item.offsetWidth;

        gallery.scrollBy({left: itemWidth, behavior: "smooth"});
    }
}