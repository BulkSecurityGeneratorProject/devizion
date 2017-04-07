import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Custumer } from './custumer.model';
import { CustumerPopupService } from './custumer-popup.service';
import { CustumerService } from './custumer.service';

@Component({
    selector: 'jhi-custumer-dialog',
    templateUrl: './custumer-dialog.component.html'
})
export class CustumerDialogComponent implements OnInit {

    custumer: Custumer;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private custumerService: CustumerService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['custumer']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.custumer.id !== undefined) {
            this.custumerService.update(this.custumer)
                .subscribe((res: Custumer) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.custumerService.create(this.custumer)
                .subscribe((res: Custumer) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess (result: Custumer) {
        this.eventManager.broadcast({ name: 'custumerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError (error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-custumer-popup',
    template: ''
})
export class CustumerPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private custumerPopupService: CustumerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.custumerPopupService
                    .open(CustumerDialogComponent, params['id']);
            } else {
                this.modalRef = this.custumerPopupService
                    .open(CustumerDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
