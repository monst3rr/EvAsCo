# Create a resource group
resource "azurerm_resource_group" "k8s" {
  name     = "${var.resource_group_name}"
  location = "${var.location}"
}

resource "azurerm_kubernetes_cluster" "k8s" {
  name                = "${var.cluster_name}"
  location            = "${azurerm_resource_group.k8s.location}"
  resource_group_name = "${azurerm_resource_group.k8s.name}"
  dns_prefix          = "${var.dns_prefix}"

  agent_pool_profile {
    name            = "default"
    count           = "${var.agent_count}"
    vm_size         = "Standard_DS2_v2"
    os_type         = "Linux"
    os_disk_size_gb = 30
  }

  service_principal {
    client_id     = "${var.client_id}"
    client_secret = "${var.client_secret}"
  }

  tags {
    Environment = "Development"
  }
}

resource "azurerm_public_ip" "k8s" {
  name                         = "k8sPublicIp"
  location                     = "${var.location}"
  resource_group_name          = "${azurerm_kubernetes_cluster.k8s.node_resource_group}"
  public_ip_address_allocation = "static"
  domain_name_label            = "test-dns-${random_integer.ri.result}"

  tags {
    Environment = "Development"
  }
}

resource "local_file" "kube_config" {
  content    = "${azurerm_kubernetes_cluster.k8s.kube_config_raw}"
  filename   = "${var.config}"
  depends_on = ["azurerm_kubernetes_cluster.k8s"]
}

resource "random_integer" "ri" {
  min = 10000
  max = 99999
}

resource "azurerm_cosmosdb_account" "db" {
  name                = "cosmos-db-${random_integer.ri.result}"
  location            = "${azurerm_resource_group.k8s.location}"
  resource_group_name = "${azurerm_resource_group.k8s.name}"
  offer_type          = "Standard"
  kind                = "MongoDB"

  consistency_policy {
    consistency_level = "Strong"
  }

  geo_location {
    location          = "${azurerm_resource_group.k8s.location}"
    failover_priority = 0
  }
}
