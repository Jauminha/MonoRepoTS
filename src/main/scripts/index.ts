// Constants defined in tools\webpack\config.ts
export const MODE = process.env.MODE;

const start = (): void => {
    console.log(`Mode ${MODE}`);
};

start();
