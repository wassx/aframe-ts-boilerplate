"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityBuilder = void 0;
var EntityBuilder = (function () {
    function EntityBuilder(type, attributes) {
        this.entity = document.createElement(type);
        if (attributes) {
            this.setAttributes(attributes);
        }
    }
    EntityBuilder.create = function (type, attributes, children) {
        var builder = new EntityBuilder(type, attributes);
        if (!!children) {
            children.forEach(function (c) {
                c.attachTo(builder.entity);
            });
        }
        return builder;
    };
    EntityBuilder.prototype.set = function (a, b, c) {
        if (!!b && !!c) {
            this.entity.setAttribute(a, b, c);
        }
        else if (!!b) {
            this.entity.setAttribute(a, b || "");
        }
        else {
            this.entity.setAttribute(a, "");
        }
        return this;
    };
    EntityBuilder.prototype.setAttributes = function (attributes) {
        var _this = this;
        Object.keys(attributes).forEach(function (k) {
            _this.set(k, attributes[k]);
        });
        return this;
    };
    EntityBuilder.prototype.toEntity = function () {
        return this.entity;
    };
    EntityBuilder.prototype.attachTo = function (parent) {
        if (!parent) {
            document.querySelector("a-scene").appendChild(this.entity);
            return this;
        }
        if ("el" in parent) {
            parent.el.appendChild(this.entity);
        }
        else {
            if ("appendChild" in parent) {
                parent.appendChild(this.entity);
            }
            else {
            }
        }
        return this;
    };
    return EntityBuilder;
}());
exports.EntityBuilder = EntityBuilder;
