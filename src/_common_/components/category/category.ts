import { Component, element } from "../../../../../_common_/components/component";
import { Variant } from "../variant/variant";

export class Category implements Component {
    private el: HTMLElement;

    name: string;
    initial: number;
    variants: Variant[] = [];

    constructor(categoryObject: Category) {
        this.name = categoryObject.name;
        this.initial = categoryObject.initial;

        this.el = element(`<div class="category"></div>`);

        categoryObject.variants.forEach((variantObject, i) => {
            const newVariant = new Variant(variantObject, i === this.initial);
            this.variants.push(newVariant);
            this.el.appendChild(newVariant.element());
        });
    }

    element(): HTMLElement {
        return this.el;
    }
}
