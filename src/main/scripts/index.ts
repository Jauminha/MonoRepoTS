import { Button, ButtonTypes } from "../../_common_/components/button/button"

// Constants defined in tools\webpack\config.ts
const MODE = process.env.MODE;

const start = (): void => {
    console.log(`Mode "${MODE}"`);

    const button = new Button({
        type: ButtonTypes.name,
        value: "Button",
    });
    document.querySelector("body").appendChild(button.element());
};

start();
