import { element } from "../../../../_common_/components/component";

export enum Themes {
    default = "default",
}

export class Theme {
    private css: HTMLElement;

    themeName: Themes;

    constructor(themeName: Themes) {
        this.themeName = themeName;

        this.css = element(`
            <style>
                .builder {
                    display: flex;
                    position: absolute;
                    flex-direction: column;
                    z-index: 2;
                }

                .category {
                    display: flex;
                    align-items: flex-start;
                }

                .variant {
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    padding: 2rem 0;
                    min-width: 100px;
                }
                .variant .src,
                .variant .svg {
                    opacity: 0.3;
                }
                .variant.active .color:after,
                .variant.active .src,
                .variant.active .svg {
                    opacity: 1;
                }
                .variant:hover:not(.active) .color:after {
                    opacity: 0.1;
                }
                .variant:hover:not(.active) .src,
                .variant:hover:not(.active) .svg {
                    opacity: 0.5;
                }


                .button {
                    position: relative;
                }

                .button.color {
                    width: 26px;
                    height: 26px;
                    border-radius: 13px;
                    pointer-events: none;
                }
                .button.color:after {
                    content: "";
                    opacity: 0;
                    display: block;
                    position: absolute;
                    top: -5px;
                    left: -5px;
                    right: -5px;
                    bottom: -5px;
                    border-radius: 100%;
                    box-shadow: 0 0 0 2px #000;
                    transition: all 0.3s ease;
                }
            </style>
        `);
    }

    style(): HTMLElement {
        return this.css;
    }
}
