import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Response} from '@angular/http';

import {NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {EventManager, AlertService, JhiLanguageService} from 'ng-jhipster';

import {Product} from './product.model';
import {ProductPopupService} from './product-popup.service';
import {ProductService} from './product.service';
import {ProductCategory, ProductCategoryService} from '../product-category';
import {ImageToken} from '../image-token';
import {AuthServerProvider} from "../../shared/auth/auth-jwt.service";
import {MyImageService} from "../../shared/image/image.service";

@Component({
    selector: 'jhi-product-dialog',
    templateUrl: './product-dialog.component.html'
})
export class ProductDialogComponent implements OnInit {

    product: Product;
    authorities: any[];
    isSaving: boolean;
    imageToken = {};

    productcategories: ProductCategory[];

    constructor(public activeModal: NgbActiveModal,
                private jhiLanguageService: JhiLanguageService,
                private alertService: AlertService,
                private productService: ProductService,
                private authServiceProvider: AuthServerProvider,
                private productCategoryService: ProductCategoryService,
                private imageService:MyImageService,
                private eventManager: EventManager) {
        this.jhiLanguageService.setLocations(['product']);
    }

    onRemove($event) {
        this.imageService
            .imageUploadCancel(this.imageToken[$event.file.name].id, 'products')
            .subscribe(() => {
                delete this.imageToken[$event.file.name];
            });
    }


    onLoad($event: any) {
        if ($event.serverResponse.status == 200) {
            let imageToken = JSON.parse($event.serverResponse.response);
            this.product.productImageUri = imageToken.path;
            this.imageToken[$event.file.name] = imageToken;
        }
        else
            this.onError($event.serverResponse.json());
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.productCategoryService.query().subscribe(
            (res: Response) => {
                this.productcategories = res.json();
            }, (res: Response) => this.onError(res.json()));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.product.id !== undefined) {
            this.productService.update(this.product)
                .subscribe((res: Product) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.productService.create(this.product)
                .subscribe((res: Product) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: Product) {
        this.eventManager.broadcast({name: 'productListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackProductCategoryById(index: number, item: ProductCategory) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-product-popup',
    template: ''
})
export class ProductPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(private route: ActivatedRoute,
                private productPopupService: ProductPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.modalRef = this.productPopupService
                    .open(ProductDialogComponent, params['id']);
            } else {
                this.modalRef = this.productPopupService
                    .open(ProductDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
