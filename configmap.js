const kubernetes = require('kubernetes-client');
let config
try {
    config = kubernetes.config.getInCluster()
} catch (err) {
    config = kubernetes.config.fromKubeconfig()
}
client = new kubernetes.Client({ config })


let myFirstPromise = new Promise((resolve, reject) => {
    
    try {
        client.loadSpec();    
        resolve();
    } catch (error) {
        reject(error);    
    }
    console.log("loading spec ...");
    
}).then(() => {
    console.log("inside then ...");
    let apiRes
    if (client.apis.apps.v1) {
        client.apis
            .apps
            .v1
            .namespaces("api-hub-operator-project")
            .deployments("incluster-app-git")
            .get().then((apiRes) => {
                console.log("API RES BODY", apiRes.body);
            })
    } else {
        client.apis
            .extensions
            .v1beta1
            .namespaces("api-hub-operator-project")
            .deployments("incluster-app-git")
            .get().then((apiRes) => {
                console.log("API RES BODY", apiRes.body);
            })
    }
}).catch((err) => {
    console.log("in catch ...", err);
});