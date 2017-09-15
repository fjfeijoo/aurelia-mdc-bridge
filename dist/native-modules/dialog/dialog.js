var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { inject, bindable, customElement } from 'aurelia-framework';
import { getLogger } from 'aurelia-logging';
import { MDCDialog, util as MDCUtil } from '@material/dialog';
import * as util from '../util';
var MdcDialog = (function () {
    function MdcDialog(element) {
        this.element = element;
        this.header = '';
        this.accept = '';
        this.cancel = '';
        this.acceptAction = false;
        this.cancelAction = false;
        this.scrollable = false;
        this.controlId = '';
        this.controlId = "mdc-dialog-" + MdcDialog_1.id++;
        this.log = getLogger('mdc-dialog');
    }
    MdcDialog_1 = MdcDialog;
    MdcDialog.prototype.show = function (showDialog) {
        if (showDialog === void 0) { showDialog = true; }
        if (showDialog) {
            this.mdcElement.show();
        }
        else {
            this.mdcElement.close();
        }
    };
    MdcDialog.prototype.bind = function () { };
    MdcDialog.prototype.unbind = function () { };
    MdcDialog.prototype.attached = function () {
        this.scrollableChanged(this.scrollable);
        this.mdcElement = new MDCDialog(this.diagElement);
        this.mdcDialogFoundation = this.mdcElement.foundation_.adapter_;
        this.mdcDialogFoundation.registerTransitionEndHandler(this.onTransitionEnd.bind(this));
        this.mdcElement.listen('MDCDialog:accept', this.onButtonAccept.bind(this));
        this.mdcElement.listen('MDCDialog:cancel', this.onButtonCancel.bind(this));
        this.acceptActionChanged(this.acceptAction);
        this.cancelActionChanged(this.cancelAction);
        if (this.focusAt) {
            this.log.debug('this.focusAt:', this.focusAt);
            this.mdcElement.focusTrap_ = MDCUtil.createFocusTrapInstance(this.mdcElement.dialogSurface_, this.focusAt);
        }
    };
    MdcDialog.prototype.detached = function () {
        this.mdcElement.unlisten('MDCDialog:accept', this.onButtonAccept.bind(this));
        this.mdcElement.unlisten('MDCDialog:cancel', this.onButtonCancel.bind(this));
        this.mdcDialogFoundation.deregisterTransitionEndHandler(this.onTransitionEnd.bind(this));
        this.mdcDialogFoundation = null;
        this.mdcElement.destroy();
    };
    MdcDialog.prototype.onButtonAccept = function () {
        util.fireEvent(this.diagElement, 'on-click', true);
    };
    MdcDialog.prototype.onButtonCancel = function () {
        util.fireEvent(this.diagElement, 'on-click', false);
    };
    MdcDialog.prototype.acceptActionChanged = function (newValue) {
        var value = util.getBoolean(newValue);
        this.acceptButtonElement.classList[value ? 'add' : 'remove']('mdc-dialog__action');
    };
    MdcDialog.prototype.cancelActionChanged = function (newValue) {
        var value = util.getBoolean(newValue);
        this.cancelButtonElement.classList[value ? 'add' : 'remove']('mdc-dialog__action');
    };
    MdcDialog.prototype.scrollableChanged = function (newValue) {
        this.scrollable = util.getBoolean(newValue);
    };
    MdcDialog.prototype.onTransitionEnd = function (evt) {
        if (this.mdcDialogFoundation.isDialog(evt.target)) {
            if (evt.propertyName === 'opacity') {
                if (this.mdcElement.open) {
                    util.fireEvent(this.diagElement, 'on-opened', {});
                }
                else {
                    util.fireEvent(this.diagElement, 'on-closed', {});
                }
            }
        }
    };
    MdcDialog.id = 0;
    __decorate([
        bindable(),
        __metadata("design:type", Object)
    ], MdcDialog.prototype, "header", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Object)
    ], MdcDialog.prototype, "accept", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Object)
    ], MdcDialog.prototype, "cancel", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Object)
    ], MdcDialog.prototype, "acceptAction", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Object)
    ], MdcDialog.prototype, "cancelAction", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Object)
    ], MdcDialog.prototype, "scrollable", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", HTMLElement)
    ], MdcDialog.prototype, "focusAt", void 0);
    MdcDialog = MdcDialog_1 = __decorate([
        customElement('mdc-dialog'),
        inject(Element),
        __metadata("design:paramtypes", [Element])
    ], MdcDialog);
    return MdcDialog;
    var MdcDialog_1;
}());
export { MdcDialog };
