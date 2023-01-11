// Array para el carrito de compras
const carrito = []

// Ordenar productos 
const deMenorAMayor = () => {
    productos.sort((a, b) => a.precio - b.precio)
    mostrarLista()
};


const mostrarLista = () => {
    const listaDeProductos = productos.map(producto => {
        return '- ' + producto.nombre + ' $' + producto.precio
    })

    alert('Lista de Productos:' + '\n\n' + listaDeProductos.join('\n'))
    alCarrito(listaDeProductos)
};




const alCarrito = (listaDeProductos) => {
    let productoNombre = ''
    let productoCantidad = 0
    let otroProducto = false

    do {
        productoNombre = prompt('¿Qué producto queres comprar?' + '\n\n' + listaDeProductos.join('\n'))
        productoCantidad = parseInt(prompt('¿Cuántos necesitas comprar?'))

        const producto = productos.find(producto => producto.nombre.toLowerCase() === productoNombre.toLowerCase())

        if (producto) {
            agregarAlCarrito(producto, producto.id, productoCantidad)
        } else {
            alert('El producto no se encuentra en el catálogo!')
        }

        otroProducto = confirm('Te falta agregar otro producto?')
    } while (otroProducto);

  

    confirmarCompra()


};



const agregarAlCarrito = (producto, productoId, productoCantidad) => {
    const productoRepetido = carrito.find(producto => producto.id === productoId)
    if (!productoRepetido) {
        producto.cantidad += productoCantidad
        carrito.push(producto)
    } else {
        productoRepetido.cantidad += productoCantidad
    }
};


const eliminarProducto = (eliminarProductos) => {
    carrito.forEach((producto, index) => {
        if (producto.nombre.toLowerCase() === eliminarProductos.toLowerCase()) {
            if (producto.cantidad > 1) {
                producto.cantidad--
            } else {
                carrito.splice(index, 1)
            }
        }
    })
    
    confirmarCompra()
};



const confirmarCompra = () => {
    const listaDeProductos = carrito.map(producto => {
        return '- '+producto.nombre+' | Cantidad: '+producto.cantidad
    })

    const isCheckout = confirm('Checkout: '
        +'\n\n'+listaDeProductos.join('\n')
        +'\n\nPara continuar presione "Aceptar" sino "Cancelar" para eliminar un producto del carrito'
    )

    if (isCheckout) {
        finalizarCompra(listaDeProductos)
    } else {
        const eliminarProductos = prompt('Ingrese el nombre del producto a eliminar:')
        eliminarProducto(eliminarProductos)
    }
};

const finalizarCompra = (listaDeProductos) => {
    const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0)
    const precioTotal = carrito.reduce((acc, item) => acc + (item.cantidad * item.precio), 0)
    alert('Detalle de su compra: '
        +'\n\n'+listaDeProductos.join('\n')
        +'\n\nTotal de productos: '+cantidadTotal
        +'\n\nEl total de su compra es: '+precioTotal
        +'\n\nGracias por su compra, te esperamos pronto!'
    )
};




deMenorAMayor()
