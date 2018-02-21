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

    add(message: string) {
        this.messages.push(message);
        this.openModalWithComponent(['zxcvzxcv', 'zxcvzxcv'])
    }

    clear() {
        this.messages = [];
    }

    openModalWithComponent(content: Array<Object>, title = 'asdfasdf') {
        let initialState = {
            list: content,
            title: title,
            closeBtnName: 'Close'
        };

        this.bsModalRef = this.modalService.show(PopupComponent, {initialState});
    }
}
