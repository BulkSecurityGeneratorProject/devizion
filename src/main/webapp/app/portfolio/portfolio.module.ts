/**
 * Created by Dmitrij on 26.04.2017.
 */
import {NgModule} from "@angular/core";
import {DevizionSharedModule} from "../shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule} from "@angular/common";
import {FlexLayoutModule} from "@angular/flex-layout";
import {PortfolioComponent} from "./portfolio-cards-grid-component/portfolio.component";
import {PortfolioCardComponent} from "./portfolio-card-component/portfolio-card.component";
import {PortfolioFlippingCard} from "./flip-card-component/portfolio-flipping-card.component";
import {MdGridListModule, MdTooltipModule} from "@angular/material";
import {PortfolioModalComponent} from "./portfolio-modal/portfolio-modal.component";
import {SpinnerModule} from "../spinner/spinner.module";
import {MySidenavWrapperModule} from "../entities/my-sidenav-wrapper/my-sidenav-wrapper.module";
@NgModule({
    imports: [
        MdTooltipModule,
        MdGridListModule,
        DevizionSharedModule,
        BrowserAnimationsModule,
        CommonModule,
        MySidenavWrapperModule,
        SpinnerModule,
        FlexLayoutModule],
    exports: [PortfolioComponent, PortfolioCardComponent, PortfolioFlippingCard],
    declarations: [PortfolioComponent, PortfolioCardComponent, PortfolioFlippingCard, PortfolioModalComponent]
})
export class PortfolioModule {

}
