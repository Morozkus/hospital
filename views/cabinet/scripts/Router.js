import routerController from "./RouterController.js";

class RouterAdmin {
    constructor() {
        this.list = document.querySelector('#admin-list')
        this.addPacient = document.querySelector('#admin-add-pacient')
        this.addPrice = document.querySelector('#admin-add-price')
    }

    setCallback(element, callback) {
        if (typeof callback === 'function') {
            element.addEventListener('click', (event) => callback(event));
        }
    }
}

const routerAdmin = new RouterAdmin();

routerAdmin.setCallback(routerAdmin.list, routerController.list)
routerAdmin.setCallback(routerAdmin.addPacient, routerController.addPacient)
routerAdmin.setCallback(routerAdmin.addPrice, routerController.addPrice)

export default routerAdmin