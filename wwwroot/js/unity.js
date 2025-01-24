window.initializeUnity = function () {
    // Aspetta che WebGL.loader.js sia caricato
    if (typeof createUnityInstance !== "function") {
        console.error("Unity loader is not loaded. Ensure WebGL.loader.js is included before this script.");
        return;
    }

    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        // Stile per i dispositivi mobili
        var meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
        document.getElementsByTagName('head')[0].appendChild(meta);

        var canvas = document.querySelector("#unity-canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.position = "fixed";

        document.body.style.textAlign = "left";
    }

    // Configurazione Unity
    createUnityInstance(document.querySelector("#unity-canvas"), {
        arguments: [],
        dataUrl: "Unity/Build/WebGL.data",
        frameworkUrl: "Unity/Build/WebGL.framework.js",
        codeUrl: "Unity/Build/WebGL.wasm",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "DefaultCompany",
        productName: "Blazorize",
        productVersion: "0.1.0",
    }).then((unityInstance) => {
        console.log("Unity instance loaded successfully.");
        window.unityInstance = unityInstance; // Memorizza l'istanza globalmente
    }).catch((error) => {
        console.error("Failed to load Unity instance:", error);
    });
};

window.sendMessageToUnity = function (gameObjectName, methodName, message) {
    if (window.unityInstance) {
        window.unityInstance.SendMessage(gameObjectName, methodName, message);
    } else {
        console.error("Unity instance is not initialized.");
    }
};
