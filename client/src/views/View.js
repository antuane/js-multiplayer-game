export default class View {

    constructor(elemento) {
        
        this._elemento = elemento;
    }
    
    render() {
        
        throw new Error('O método template deve ser implementado');
    }
    
    update(model) {
        this._elemento.innerHTML = this.template(model);
    }
    
}