document.addEventListener('DOMContentLoaded',() => {


    let index = 0

    fetch('http://localhost:3000/monsters')
    .then(response => response.json())
    .then(monsters => loadMonsters(monsters, index))



})


function loadMonsters(monsters, index){


    let monsterForm = document.getElementById('monster-form')
    monsterForm.addEventListener('submit', (event) => {

        event.preventDefault()

        fetch('http://localhost:3000/monsters', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            body: JSON.stringify({
                "name": event.target.name.value,
                "age": event.target.age.value,
                "description":event.target.description.value
            })
        })
        .then(response => response.json())
        .then(monster => {
            console.log(index)
            if (index > monsters.length - 50){
                addSingleMonster(monster)
            }
            monsters.push(monster)
            })

    })

    load50(monsters, index)


    let forward = document.querySelector('#forward')

    forward.addEventListener('click', () => {
        let monsterContainer = document.getElementById('monster-container')

        if (index < monsters.length - 50) {
            monsterContainer.innerHTML = ''
            index += 50
            load50(monsters, index)
        }


    })

    let back = document.querySelector('#back')

    back.addEventListener('click', () => {
        let monsterContainer = document.getElementById('monster-container')

        if (index > 0){
            monsterContainer.innerHTML = ''
            index -= 50
            load50(monsters, index)
        }


    })


}



function load50(monsters, index) {

    let max = index + 50;
    if (monsters.length < index + 50){
        max = monsters.length
    }


    for (let i = index; i < max; i++){

        addSingleMonster(monsters[i])

    }
}


function addSingleMonster(monster) {
    let monsterContainer = document.getElementById('monster-container')
    const div = document.createElement('div')

    const h2 = document.createElement('h2')
    h2.innerHTML = monster.name
    div.appendChild(h2)

    const h4 = document.createElement('h4')
    h4.innerHTML = 'Age: ' + monster.age
    div.appendChild(h4)

    const p = document.createElement('p')
    p.innerHTML = monster.description
    div.appendChild(p)

    monsterContainer.appendChild(div)
}