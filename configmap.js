const kubernetes = require('kubernetes-client');
let config
try {
    config = kubernetes.config.getInCluster()
} catch (err) {
    config = kubernetes.config.fromKubeconfig()
}
client = new kubernetes.Client({ config })



    (async function () {
        await client.loadSpec()
        let apiRes
        if (client.apis.apps.v1) {
            apiRes = await client.apis
                .apps
                .v1
                .namespaces(req.params.namespace)
                .deployments(req.params.deployment)
                .get()
        } else {
            apiRes = await client.apis
                .extensions
                .v1beta1
                .namespaces(req.params.namespace)
                .deployments(req.params.deployment)
                .get()
        }

        console.log("API RES BODY", apiRes.body);
    })()