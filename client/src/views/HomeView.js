import View from './View'

export default class HomeView extends View {

    constructor(elemento) {
        
        this._elemento = elemento;
    }
    
    template() {
        
        throw new Error('O método template deve ser implementado');
    }
    
    update(model) {
        this._elemento.innerHTML = this.template(model);
    }
}