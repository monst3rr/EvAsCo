output "client_key" {
  value = "${azurerm_kubernetes_cluster.k8s.kube_config.0.client_key}"
}

output "client_certificate" {
  value = "${azurerm_kubernetes_cluster.k8s.kube_config.0.client_certificate}"
}

output "cluster_ca_certificate" {
  value = "${azurerm_kubernetes_cluster.k8s.kube_config.0.cluster_ca_certificate}"
}

output "cluster_username" {
  value = "${azurerm_kubernetes_cluster.k8s.kube_config.0.username}"
}

output "cluster_password" {
  value = "${azurerm_kubernetes_cluster.k8s.kube_config.0.password}"
}

output "kube_config" {
  value = "${azurerm_kubernetes_cluster.k8s.kube_config_raw}"
}

output "host" {
  value = "${azurerm_kubernetes_cluster.k8s.kube_config.0.host}"
}

output "node_resource_group" {
  value = "${azurerm_kubernetes_cluster.k8s.node_resource_group}"
}

output "azurerm_public_ip" {
  value = "${azurerm_public_ip.k8s.ip_address}"
}

output "fqdn" {
  value = "${azurerm_public_ip.k8s.fqdn}"
}

output "connection_strings" {
  value = "${azurerm_cosmosdb_account.db.connection_strings.0}"
}

output "endpoint" {
  value = "${azurerm_cosmosdb_account.db.endpoint}"
}

output "account_id" {
  value = "${azurerm_cosmosdb_account.db.id}"
}

output "account_username" {
  value = "${azurerm_cosmosdb_account.db.name}"
}

output "primary_master_key" {
  value = "${azurerm_cosmosdb_account.db.primary_master_key}"
}
