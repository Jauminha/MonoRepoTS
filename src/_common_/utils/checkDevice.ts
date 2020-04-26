export const isMacOsX = (): boolean => {
    const deviceMatcher: RegExp = /Mac OS X/;
    return navigator.userAgent.match(deviceMatcher) !== null;
};

export const isMobileDevice = (): boolean => {
    const deviceMatcher: RegExp = /(iPhone|iPad|Android)/;
    return navigator.userAgent.match(deviceMatcher) !== null;
};

export const getMobilePlatform = (): "android" | "apple" | "none" => {
    return isArAndroidCapableDevice() ?
        "android" : isArAppleCapableDevice() ?
            "apple" : "none";
};

const isArAppleCapableDevice = (): boolean => {
    const isiPadOS = (): boolean => {
        if (/Safari[/\s](\d+\.\d+)/.test(window.navigator.userAgent)) {
            return "ontouchstart" in window;
        }
        return false;
    };

    const iOSversion = (): number[] => {
        const v = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
        return [
            parseInt(v[1], 10),
            parseInt(v[2], 10),
            parseInt(v[3] || "0", 10),
        ];
    };

    let iosVersion;
    if (/iP(hone|od|ad)/.test(navigator.platform)) {
        iosVersion = iOSversion();
    }
    const ua = window.navigator.userAgent;
    const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
    const isFirefox = navigator.userAgent.toLowerCase().includes("fxios");

    if ((iosVersion && iOS && iosVersion[0] >= 12 && !isFirefox) || isiPadOS()) {
        return true;
    }
    return false;
};

const isArAndroidCapableDevice = (): boolean => {
    const ua = navigator.userAgent.toLowerCase();
    const isAndroid = ua.includes("android");

    return isAndroid;
};
