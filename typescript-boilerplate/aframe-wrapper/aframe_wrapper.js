"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemWrapper = exports.ComponentWrapper = void 0;
var hasMethod = function (obj, name) {
    var desc = Object.getOwnPropertyDescriptor(obj, name);
    return !!desc && typeof desc.value === "function";
};
var getInstanceMethodNames = function (obj, stop) {
    var array = [];
    var proto = Object.getPrototypeOf(obj);
    while (proto && proto !== stop) {
        Object.getOwnPropertyNames(proto)
            .forEach(function (name) {
            if (name !== "constructor") {
                if (hasMethod(proto, name)) {
                    array.push(name);
                }
            }
        });
        proto = Object.getPrototypeOf(proto);
    }
    return array;
};
var ComponentWrapper = (function () {
    function ComponentWrapper(name, schema) {
        this.name = name;
        this.schema = schema || {};
    }
    ComponentWrapper.prototype.remove = function () { };
    ComponentWrapper.prototype.update = function (oldData) { };
    ComponentWrapper.prototype.extendSchema = function (update) { };
    ComponentWrapper.prototype.flushToDOM = function () { };
    ComponentWrapper.prototype.init = function () { };
    ComponentWrapper.prototype.pause = function () { };
    ComponentWrapper.prototype.play = function () { };
    ComponentWrapper.prototype.merge = function () {
        var _this = this;
        var funcs = getInstanceMethodNames(this, Object.prototype);
        funcs.forEach(function (k) { return _this[k] = _this[k]; });
    };
    ComponentWrapper.prototype.destroy = function () {
        var parent = this.el.parentElement;
        if (!!parent) {
            parent.removeChild(this.el);
        }
    };
    ComponentWrapper.prototype.register = function () {
        if (!!AFRAME.components[this.name]) {
            console.log("WARNING -- unregistering already registered component with name \"" + this.name + "\".");
            delete AFRAME.components[this.name];
        }
        this.merge();
        AFRAME.registerComponent(this.name, this);
        return this;
    };
    ComponentWrapper.prototype.registerCallback = function (callbackName, fn) {
        this.el.addEventListener(callbackName, fn.bind(this));
    };
    return ComponentWrapper;
}());
exports.ComponentWrapper = ComponentWrapper;
var SystemWrapper = (function () {
    function SystemWrapper(name, schema) {
        this.name = name;
        this.schema = schema || {};
    }
    SystemWrapper.prototype.init = function () { };
    SystemWrapper.prototype.pause = function () { };
    SystemWrapper.prototype.play = function () { };
    SystemWrapper.prototype.merge = function () {
        var _this = this;
        var funcs = getInstanceMethodNames(this, Object.prototype);
        funcs.forEach(function (k) { return _this[k] = _this[k]; });
    };
    SystemWrapper.prototype.register = function () {
        this.merge();
        AFRAME.registerSystem(this.name, this);
    };
    return SystemWrapper;
}());
exports.SystemWrapper = SystemWrapper;
