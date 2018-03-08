import {Component, OnInit, Input, Output, EventEmitter, HostBinding} from '@angular/core';
import * as moment from 'moment';

import {MessageService} from "../service/message.service";
import {ApiService} from "../service/api.service";
import {slideInDownAnimation} from '../animations';

@Component({
    selector: 'list-date',
    templateUrl: './list-date.component.html',
    styleUrls: ['./list-date.component.scss'],
    animations: [slideInDownAnimation],
})
export class ListDateComponent implements OnInit {
    @HostBinding('@flyInOut') flyInOut = true;
    @HostBinding('style.display') display = 'block';

    TYPE_REQUEST_IL = 1;
    TYPE_REQUEST_LE = 14;

    @Output() myEvent = new EventEmitter();

    @Input() listDate = {
        day_IL: [],
        day_LE: [],
    };

    @Input() userInfo = {
        email: "",
        password: "",
    };
    currentDate = "";
    currentReason = "";
    typeRequest = this.TYPE_REQUEST_IL;
    reasonTxt = "";
    listReason = {
        "IL": [
            "Sorry I'm late. Traffic was unusually bad today.",
            "I apologize for being late. I had to drop off my wife at work. It took longer than I thought.",
            "I had a dentist appointment this morning and it was longer than I expected",
            "Forgot set alarm",
            "I'm sorry for being date. I got stuck in every light this morning.",
            "Working late last night",
        ],
        "LE": [
            "I have to leave a little early today. Is this ok if I finish my work at home?",
            "I have a terrible headache. Is this ok if I leave early today?",
            "I have an urgent work at home. Is it ok if I leave a little early?",
            "I have to pick up my wife at the airport tomorrow. Is it ok if I leave at three?",
            "My son got sick and I have to pick him up from school. Will that be ok?",
        ]
    };
    reasonSelect = this.listReason.IL;
    isRandomReason = 1;
    rangeCompensation = 3;
    listCompensation = [];
    currentCompensation = "";

    constructor(public messageService: MessageService, public apiService: ApiService) {
        for (let i = 0; i < this.rangeCompensation; i++) {
            this.listCompensation.push(moment().add(i, "days").format('YYYY-MM-DD'));
        }

        this.currentCompensation = this.listCompensation[0];
    }

    ngOnInit() {
        if (this.listDate.day_IL.length == 0 && this.listDate.day_LE.length == 0) {
            this.messageService.openModalWithComponent(["You worked very hard !"], "Congratulation");
        }
    }

    selectDate(date, type) {
        this.currentDate = date;
    }

    selectReason(reason) {
        this.currentReason = reason;
    }

    changeTab(tab) {
        this.typeRequest = tab;
        this.currentReason = this.currentDate = "";

        this.reasonSelect = this.listReason.IL;
        if (tab == this.TYPE_REQUEST_LE) {
            this.reasonSelect = this.listReason.LE
        }
    }

    submitRequest() {
        if (this.currentDate == "") {
            this.messageService.openModalWithComponent(["Please select date"], "Submit Request");
            return false;
        }

        if (!this.isRandomReason && this.reasonTxt == "") {
            this.messageService.openModalWithComponent(["Please write reason"], "Submit Request");
            return false;
        }

        let randomReason = Math.floor((Math.random() * this.reasonSelect.length));
        let formData = {
            "reason": this.isRandomReason ? this.reasonSelect[randomReason] : this.reasonTxt,
            "date": this.currentDate,
            "type_request": this.typeRequest,
            "email": this.userInfo.email,
            "compensation_date": this.currentCompensation + " 16:45:00",
            "password": this.userInfo.password,
        };

        this.apiService.submitRequest(formData).subscribe((response: any) => {
            this.messageService.openModalWithComponent([
                "Check request  <a target='_blank' href='" + response.url_edit + "'>here</a>"
            ], "Submit request successfully");

            if (this.typeRequest == this.TYPE_REQUEST_IL) {
                this.listDate.day_IL = this.listDate.day_IL.filter(e => e != this.currentDate);
            } else {
                this.listDate.day_LE = this.listDate.day_LE.filter(e => e != this.currentDate);
            }

            this.currentDate = "";
        });
    }

    logout() {
        this.myEvent.emit();
    }
}
