# resource "kubernetes_pod" "backend" {
#   metadata {
#     name = "azure-vote-back"
#     labels {
#       App = "azure-vote-back"
#     }
#   }
#   spec {
#     container {
#       image = "redis"
#       name  = "azure-vote-back"
#       port {
#         container_port = 6379
#       }
#     }
#   }
#   depends_on = ["local_file.kube_config"]
# }
# resource "kubernetes_service" "backend" {
#   metadata {
#     name = "azure-vote-back"
#   }
#   spec {
#     selector {
#       App = "${kubernetes_pod.backend.metadata.0.labels.App}"
#     }
#     port {
#       port = 6379
#     }
#   }
#   depends_on = ["local_file.kube_config"]
# }
# resource "kubernetes_pod" "frontend" {
#   metadata {
#     name = "azure-vote-front"
#     labels {
#       App = "azure-vote-front"
#     }
#   }
#   spec {
#     container {
#       image = "microsoft/azure-vote-front:v1"
#       name  = "azure-vote-front"
#       port {
#         container_port = 80
#       }
#       env {
#         name  = "REDIS"
#         value = "azure-vote-back"
#       }
#     }
#   }
#   depends_on = ["local_file.kube_config"]
# }
# resource "kubernetes_service" "frontend" {
#   metadata {
#     name = "azure-vote-front"
#   }
#   spec {
#     selector {
#       App = "${kubernetes_pod.frontend.metadata.0.labels.App}"
#     }
#     port {
#       port = 80
#     }
#     type             = "LoadBalancer"
#     load_balancer_ip = "${azurerm_public_ip.k8s.ip_address}"
#   }
#   depends_on = ["local_file.kube_config"]
# }

