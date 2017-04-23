import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams, BaseRequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ProductCategory} from './product-category.model';

@Injectable()
export class ProductCategoryService {

    private resourceUrl = 'api/product-categories';
    imageDirectory = '/content/images/categories';

    constructor(private http: Http) {
    }

    create(productCategory: ProductCategory): Observable<ProductCategory> {
        let copy: ProductCategory = Object.assign({}, productCategory);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(productCategory: ProductCategory): Observable<ProductCategory> {
        let copy: ProductCategory = Object.assign({}, productCategory);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<ProductCategory> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<Response> {
        let options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options);
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }


    private createRequestOption(req?: any): BaseRequestOptions {
        let options: BaseRequestOptions = new BaseRequestOptions();
        if (req) {
            let params: URLSearchParams = new URLSearchParams();
            params.set('page', req.page);
            params.set('size', req.size);
            if (req.sort) {
                params.paramsMap.set('sort', req.sort);
            }
            params.set('query', req.query);

            options.search = params;
        }
        return options;
    }

    categoryImageUploadCancel(category_id: number) {
        let requestParams: URLSearchParams = new URLSearchParams();
        requestParams.set('token_id', category_id.toString());
        return this.http.delete('api/category/image', {search: requestParams});
    }
}
