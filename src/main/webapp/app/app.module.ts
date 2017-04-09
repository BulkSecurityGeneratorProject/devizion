import "./vendor.ts";

import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {Ng2Webstorage} from "ng2-webstorage";

import {DevizionSharedModule, UserRouteAccessService} from "./shared";
import {DevizionHomeModule} from "./home/home.module";
import {DevizionAdminModule} from "./admin/admin.module";
import {DevizionAccountModule} from "./account/account.module";
import {DevizionEntityModule} from "./entities/entity.module";

import {
    ActiveMenuDirective,
    ErrorComponent,
    FooterComponent,
    JhiMainComponent,
    LayoutRoutingModule,
    NavbarAdminMenuItemComponent,
    NavbarComponent,
    PageRibbonComponent,
    ProfileService
} from "./layouts";
import {customHttpProvider} from "./blocks/interceptor/http.provider";
import {PaginationConfig} from "./blocks/config/uib-pagination.config";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
    imports: [
        BrowserModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        NgbModule.forRoot(),
        DevizionSharedModule,
        DevizionHomeModule,
        DevizionAdminModule,
        DevizionAccountModule,
        DevizionEntityModule
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent,
        NavbarAdminMenuItemComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class DevizionAppModule {}
