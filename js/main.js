//console.log('SPA en JS')
function ajax(url, metodo = 'get') {
    let xhr = new XMLHttpRequest
    xhr.open(metodo, url)
    xhr.send()
    return xhr
}

/* -------------------------------------------------- */
/*   Carga de la barra de navegación mediante Ajax    */
/* -------------------------------------------------- */
let nav = document.querySelector('nav')
let xhr = ajax('navbar.html')
xhr.addEventListener('load', () => {
    if (xhr.status == 200) {
        nav.innerHTML = xhr.response

        //getPlantillasSinHistory()
        getPlantillasConHistoryHash()
    }
})


function marcarLink(archivo) {
    let id = archivo.split('.')[0]

    let links = document.querySelectorAll('a')
    links.forEach(link => {
        link.classList.remove('active')
        if (link.id == id) {
            link.classList.add('active')
        }
    })
}

function getNombreArchivo(hash) {
    return hash ? hash.slice(1) + '.html' : 'home.html'
}

/* ------------------------------------------------- */
/*      Navegación SPA con Historial Hash (#)        */
/* ------------------------------------------------- */
function getPlantillasConHistoryHash() {
    let main = document.querySelector('main')

    //let links = document.getElementsByTagName('a')
    let links = document.querySelectorAll('a')
    //console.log(links)

    /* --------------------------- */
    /* Carga del contenido inicial */
    /* --------------------------- */
    let hash = location.hash
    let archivo = getNombreArchivo(hash)

    let paginaInicial = archivo

    marcarLink(paginaInicial)

    let xhr = ajax(paginaInicial)
    xhr.addEventListener('load', () => {
        if (xhr.status == 200) {
            main.innerHTML = xhr.response
        }
    })

    /* ------------------------------------------------ */
    /* Configuración de la carga del contenido dinámico */
    /* ------------------------------------------------ */
    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault()

            let id = link.id
            //console.log(id)

            // registro la navegación de la SPA en el historial del navegador
            location.hash = id
        })
    })

    /* --------------------------------------------------------------- */
    /* Registro del evento de cambio de URL (para inyectar navegación) */
    /* --------------------------------------------------------------- */
    window.addEventListener('hashchange', () => {
        //console.log('Cambió la URL')

        let hash = location.hash
        //console.log(hash)

        let archivo = getNombreArchivo(hash)
        //console.log(archivo)

        /* --------------------------------------------------------------------- */
        /*  Cargo con Ajax la plantilla elegida correspondiente a la navegación  */
        /* --------------------------------------------------------------------- */
        marcarLink(archivo)

        let xhr = ajax(archivo)
        xhr.addEventListener('load', () => {
            if (xhr.status == 200) {
                main.innerHTML = xhr.response
            }
        })
    })
}

/* --------------------------------------------------------------------------------- */

/* ------------------------------------------------- */
/*            Navegación SPA sin Historial           */
/* ------------------------------------------------- */
function getPlantillasSinHistory() {

    let main = document.querySelector('main')

    //let links = document.getElementsByTagName('a')
    let links = document.querySelectorAll('a')
    //console.log(links)

    /* --------------------------- */
    /* Carga del contenido inicial */
    /* --------------------------- */
    let paginaInicial = 'home.html'
    let xhr = ajax(paginaInicial)
    xhr.addEventListener('load', () => {
        if (xhr.status == 200) {
            main.innerHTML = xhr.response
        }
    })

    /* ------------------------------------------------ */
    /* Configuración de la carga del contenido dinámico */
    /* ------------------------------------------------ */
    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault()

            let id = link.id
            //console.log(id)

            /* -------------------------------------------------------- */
            /*  Cargo con Ajax la plantilla elegida mediante la Navbar  */
            /* -------------------------------------------------------- */
            let archivo = id + '.html'
            console.log(archivo)

            let xhr = ajax(archivo)
            xhr.addEventListener('load', () => {
                if (xhr.status == 200) {
                    main.innerHTML = xhr.response
                }
            })
        })
    })
}