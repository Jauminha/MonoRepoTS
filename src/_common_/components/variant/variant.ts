import { Component, element } from "../component";
import { Button } from "../button/button";

type VariantComponents = "button";

export class Variant implements Component {
    private el: HTMLElement;

    constructor(variant: Variant, active: boolean) {
        const componentName = (Object.keys(variant)[0]) as VariantComponents;
        const componentConfig = (Object.values(variant)[0]);

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
