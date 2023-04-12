variable "env" {
    type = string
}

variable "domain" {
    type = string
}

variable "regions" {
    type = list(object({
        name = string
        cpus = number
        cputype = string
        memorymb = number
    }))
}

variable "app_image" {
    type = string
}