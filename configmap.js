const kubernetes = require('kubernetes-client');
let config
try {
    config = kubernetes.config.getInCluster()
} catch (err) {
    config = kubernetes.config.fromKubeconfig()
}
client = new kubernetes.Client({ config })


let myFirstPromise = new Promise((resolve, reject) => {
    client.loadSpec()

}).then((successMessage) => {

    let apiRes
    if (client.apis.apps.v1) {
        client.apis
            .apps
            .v1
            .namespaces(req.params.namespace)
            .deployments(req.params.deployment)
            .get().then((apiRes) => {
                console.log("API RES BODY", apiRes.body);
            })
    } else {
        client.apis
            .extensions
            .v1beta1
            .namespaces(req.params.namespace)
            .deployments(req.params.deployment)
            .get().then((apiRes) => {
                console.log("API RES BODY", apiRes.body);
            })
    }
});