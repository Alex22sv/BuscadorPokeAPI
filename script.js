/* 
    This project was inspired from the YouTube tutorial: https://www.youtube.com/watch?v=MkESyVB4oUw
    It was modified by me for it to work with the search PokeAPI.
*/


window.addEventListener("load", () => {
    const form = document.querySelector("#new_pokemon_form");
    const input = document.querySelector("#new_pokemon_input");
    const list_el = document.querySelector("#pokemons");
    const header = document.querySelector("header");

    const baseURL = 'https://pokeapi.co/api/v2';

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const poke = input.value;
        const resource = "/pokemon-form/"+poke;

        if(!poke) {
            const no_poke_el = document.createElement("p");
            no_poke_el.classList.add("errorMsg");
            no_poke_el.innerHTML = "Empty input.";
            header.appendChild(no_poke_el);
            setTimeout(function() {
                header.removeChild(no_poke_el);
            },18000)
            return;
        }
        const poke_el = document.createElement("div");
        poke_el.classList.add("pokemon");

        const poke_content_el = document.createElement("div");
        poke_content_el.classList.add("content");

        poke_el.appendChild(poke_content_el);


        fetch(`${baseURL}${resource}`)
        .then(res => res.json())
        .then(pokemon => {
            if(!pokemon){
                return console.log("Invalid search");
            }            
            // Add the pokemon's image
            const poke_image_el = document.createElement("img");
            poke_image_el.src = pokemon.sprites["front_default"];
            poke_image_el.alt = "Pokemon img";

            poke_content_el.appendChild(poke_image_el);

            // Add the pokemon's information
            const poke_input_el = document.createElement("input");
            poke_input_el.classList.add("text");
            poke_input_el.type = "text";
            poke_input_el.value = `Name: ${pokemon["name"]} - ID: ${pokemon["id"]}`;
            poke_input_el.setAttribute("readonly", "readonly");
    
            poke_content_el.appendChild(poke_input_el);

            const poke_actions_el = document.createElement("div");
            poke_actions_el.classList.add("actions");
    
            const poke_edit_el = document.createElement("button");
            poke_edit_el.classList.add("edit");
            poke_edit_el.innerHTML = "Edit";
    
            const poke_delete_el = document.createElement("button");
            poke_delete_el.classList.add("delete");
            poke_delete_el.innerHTML = "Delete";
    
            poke_actions_el.appendChild(poke_edit_el);
            poke_actions_el.appendChild(poke_delete_el);
    
            poke_el.appendChild(poke_actions_el);
    
            list_el.appendChild(poke_el);
    
            input.value = "";
    
            poke_edit_el.addEventListener("click", () => {
                if(poke_edit_el.innerHTML.toLowerCase() == "edit") {
                    poke_input_el.removeAttribute("readonly");
                    poke_input_el.focus();
                    poke_edit_el.innerText = "Save";
                } else {
                    poke_input_el.setAttribute("readonly", "readonly");
                    poke_edit_el.innerHTML = "Edit";
                }
            });
            poke_delete_el.addEventListener("click", () => {
                list_el.removeChild(poke_el);
            });
        }).catch(error => {
            console.log("Error! " + error);
        })

    });
});