import { Component, element } from "../../../../../_common_/components/component";

export enum ButtonTypes {
    name = "name",
    color = "color",
    src = "src",
    svg = "svg",
}

export interface ButtonConfig {
    type: ButtonTypes;
    value: string;
    css?: string;
    className?: string;
}

export class Button implements Component {
    private el: HTMLElement;
    private css: string;

    constructor(config: ButtonConfig) {
        this.css = config.css ? config.css : null;

        this.el = element(`
            <div class="button${config.className ? ` ${config.className}` : ``}">
                ${this.css ? this.css : ``}
            </div>
        `);

        this.el.classList.add(config.type);
        switch (config.type) {
            case "name":
                this.el.innerHTML += config.value;
                break;
            case "color":
                this.el.style.backgroundColor = config.value;
                break;
            case "src":
                this.el.appendChild(element(`<img src="${config.value}" alt>`));
                break;
            case "svg":
                this.el.appendChild(element(atob(config.value)));
                break;
            default:
                throw Error(`Button type "${config.type}" is not implemented`);
        }
    }

    element(): HTMLElement {
        return this.el;
    }
}
