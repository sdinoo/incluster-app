const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromCluster();
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
// This is a new comment i want to see get pushed into github
kc.
k8sApi.listNamespacedPod('api-hub-operator-project')
    .then((res) => {
	console.log(res.body);
    })
    .catch((err) => {
        console.log(err);
    });
    