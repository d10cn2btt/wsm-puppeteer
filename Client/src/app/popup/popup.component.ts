import {Component, OnInit, TemplateRef, Input} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
    selector: 'popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
    title: string;
    closeBtnName: string;
    list: string[];

    constructor(public bsModalRef: BsModalRef) {}

    ngOnInit() {
    }

}
