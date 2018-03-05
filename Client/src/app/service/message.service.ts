import {Injectable} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

import {PopupComponent} from "../popup/popup.component";

@Injectable()
export class MessageService {
    messages: string[] = [];
    bsModalRef: BsModalRef;

    constructor(public modalService: BsModalService) {
    }

    openModalWithComponent(content, title = 'Error') {
        if (typeof content == "undefined") {
            content = "Can't access WSM or Server has a problem. Pls try later or contact with ADMIN";
        } else {
            content = content.replace(/(?:\r\n|\r|\n)/g, '<br />');
        }

        let initialState = {
            list: content,
            title: title,
            closeBtnName: 'Close'
        };

        this.bsModalRef = this.modalService.show(PopupComponent, {initialState});
    }
}
