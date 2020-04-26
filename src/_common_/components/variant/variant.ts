import { Component, element } from "../../../../../_common_/components/component";
import { Button } from "../button/button";
import { Action } from "scripts/builder/builder";

type VariantComponents = "button";

export class Variant implements Component {
    private el: HTMLElement;

    actions: Action[];

    constructor(variant: Variant, active: boolean) {
        const componentName = (Object.keys(variant)[0]) as VariantComponents;
        const componentConfig = (Object.values(variant)[0]);

        this.actions = variant.actions;

        this.el = element(`<div class="variant"></div>`);
        active && this.el.classList.add("active");

        switch (componentName) {
            case "button":
                this.el.appendChild(new Button(componentConfig).element());
                break;
            default:
                throw Error(`Variant component "${componentName}" is not implemented`);
        }
    }

    element(): HTMLElement {
        return this.el;
    }
}
