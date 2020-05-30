const k8s = require('@kubernetes/client-node');
const kc = new k8s.KubeConfig();
kc.loadFromCluster();
//kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const sf = kc.makeApiClient(k8s.CoreV1Api);
k8sApi.listNamespacedConfigMap('api-hub-operator-project').then((res) => {
    console.log("configmaps: ", res.body.items);
    for (const configmap of res.body.items) {
        console.log("", configmap.data)
    }
})
.catch((err) => {
    console.log("error: ", err);
});