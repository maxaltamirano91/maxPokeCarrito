let listaDeBarrios = document.getElementById('selector');

fetch('/assets/js/barrios.json')

    .then(respo => respo.json())
    

.then(function (data){
    console.log(data)
    Object.values(data).map(barrios => {
        let opt = document.createElement('option');
        opt.innerHTML = barrios.barrio;
        listaDeBarrios.appendChild(opt);
    })
})

.catch(function (error){
    console.log(error);
})

.finally(function(error){
    console.log('Finaliza la consulta')
})