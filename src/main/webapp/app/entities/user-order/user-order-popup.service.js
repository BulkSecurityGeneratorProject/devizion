"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_order_model_1 = require("./user-order.model");
var UserOrderPopupService = (function () {
    function UserOrderPopupService(modalService, router, userOrderService) {
        this.modalService = modalService;
        this.router = router;
        this.userOrderService = userOrderService;
        this.isOpen = false;
    }
    UserOrderPopupService.prototype.open = function (component, id) {
        var _this = this;
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        if (id) {
            this.userOrderService.find(id).subscribe(function (userOrder) {
                if (userOrder.orderedAt) {
                    userOrder.orderedAt = {
                        year: userOrder.orderedAt.getFullYear(),
                        month: userOrder.orderedAt.getMonth() + 1,
                        day: userOrder.orderedAt.getDate()
                    };
                }
                _this.userOrderModalRef(component, userOrder);
            });
        }
        else {
            return this.userOrderModalRef(component, new user_order_model_1.UserOrder());
        }
    };
    UserOrderPopupService.prototype.userOrderModalRef = function (component, userOrder) {
        var _this = this;
        var modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.userOrder = userOrder;
        modalRef.result.then(function (result) {
            _this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true });
            _this.isOpen = false;
        }, function (reason) {
            _this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true });
            _this.isOpen = false;
        });
        return modalRef;
    };
    return UserOrderPopupService;
}());
UserOrderPopupService = __decorate([
    core_1.Injectable()
], UserOrderPopupService);
exports.UserOrderPopupService = UserOrderPopupService;
