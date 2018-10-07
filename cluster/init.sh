export TF_VAR_config=$HOME/.kube/config
terraform init
terraform apply -var-file=cred.tfvars
export TF_VAR_config=$HOME/.kube/config
echo "$(terraform output kube_config)" > ./azurek8s
export KUBECONFIG=./azurek8s
kubectl create secret generic dbsecret --from-literal=connection="$(terraform output connection_strings)" --dry-run -o yaml | kubectl apply -f -
helm init --wait
helm version
helm install ./../chart --set-string ip="$(terraform output azurerm_public_ip)"
echo "//////////////////////////////////////////////////////////END//////////////////////////////////////////////////////////////////"
echo ""
echo ""
echo ""
echo "http://$(terraform output fqdn)"