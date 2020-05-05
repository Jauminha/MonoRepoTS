import { element } from "../components/component";

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
