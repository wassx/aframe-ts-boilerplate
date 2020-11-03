import {ComponentWrapper} from "aframe-typescript-toolkit";

export interface Test {
    handRotationY: number;
}

export class Main extends ComponentWrapper<Test>{

    constructor() {
        super("test", {
            handRotationY: {
                type: "number",
                default: 0
            }
        })
    }

    init() {
    }

    tick() {
        const ctrls = document.querySelectorAll('[hand-tracking-controls]');
    }

}

new Main().register();