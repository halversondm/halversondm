/**
 * Created by Daniel on 7/11/2016.
 */
"use strict";

/**
 * JSONP function
 * @param {string} url  the URL to call
 * @param {function} successCallback What to do when there is a successful call
 * @param {function} errorCallback What to do when there is an error
 */
const jsonp = function (url, successCallback, errorCallback) {
    const callbackName = "jsonp_callback_" + Math.round(100000 * Math.random());
    const script = document.createElement("script");
    const cleanUp = () => {
        Reflect.deleteProperty(window, callbackName);
        document.body.removeChild(script);
    };
    script.src = url + (url.indexOf("?") >= 0 ? "&" : "?") + "callback=" + callbackName;
    script.onerror = () => {
        cleanUp();
        if (typeof errorCallback === "function") {
            errorCallback();
        }
    };
    window[callbackName] = data => {
        cleanUp();
        if (typeof successCallback === "function") {
            successCallback(data);
        }
    };
    document.body.appendChild(script);
};

export default jsonp;
