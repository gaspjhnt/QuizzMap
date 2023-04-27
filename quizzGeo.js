let map = L.map('map',{dragging: false}).setView([47.2, 2.333], 6);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 6,
    minZoom: 6,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

map.on('click', getLatLngUser)


function getLatLngUser(e){
    getDataCommune(e.latlng.lat, e.latlng.lng)

}



async function callApiCommune(lat, lng){
    let response = await fetch(`https://geo.api.gouv.fr/communes?lat=${lat}&lon=${lng}`)
    if (response.ok){
        return response.json()
    }
}


async function getDataCommune(lat, lng){
    let data = await callApiCommune(lat, lng)
    document.getElementById("result").className = "alert alert-secondary";
    document.getElementById("result").innerText = `Quel est le nom du département ${data[0].codeDepartement}`
    getDataDepartement(data[0].codeDepartement)

}


async function callApiDepartement(code){
    let response = await fetch(`https://geo.api.gouv.fr/departements/${code}`)
    if (response.ok){
        return response.json()
    }

}


async function getDataDepartement(code){
    let data = await callApiDepartement(code)
    console.log(data.nom)
    document.getElementById("button-addon2").addEventListener("click", () =>{

        let inputUser = document.getElementById("input").value.toLowerCase();
        let resultData = data.nom.toLowerCase();


        if (document.getElementById("input").value.toLowerCase() === data.nom.toLowerCase()){
            document.getElementById("result").className = "alert alert-success"
            document.getElementById("result").innerText = `Victoire ! Vous avez trouvé le département ${data.nom}`
        } else {
            document.getElementById("result").className = "alert alert-danger"
            document.getElementById("result").innerText = `Défaite ! Bien nul le poto c'était ${data.nom}`
        }
    })


}