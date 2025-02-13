import { api, LightningElement } from 'lwc';

export default class Gallery extends LightningElement {

    @api
    list;

    @api
    isLink = false;

    // handleClick(event){
    //     console.log(event.target.dataset);
    //     this.dispatchEvent(new CustomEvent('handleclick', {detail: event.target.dataset}))
    // }

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