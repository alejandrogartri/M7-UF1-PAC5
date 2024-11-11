/**
 * 
 * @param {HTMLCollectionOf<Element>} group 
 * @param {HTMLElement} where
 */
function loadDishes(group, where) {
    let dishes = group.getElementsByTagName("dish");

    let groupTitle = document.createElement("h2");
    where.classList.add("dish-group");
    groupTitle.innerHTML = group.getElementsByTagName("group-name")[0].innerHTML;
    where.append(groupTitle);
    
    for (let i = 0; i < dishes.length; i++) {
        const dish = dishes[i];
        let dishContainer = document.createElement("div");
        dishContainer.classList.add("dish");

        let imgLink = dish.getElementsByTagName("image")[0].innerHTML;
        let name = dish.getElementsByTagName("name")[0].innerHTML;
        let description = dish.getElementsByTagName("description")[0].innerHTML;
        let price = dish.getElementsByTagName("price")[0].innerHTML;
        dishContainer.innerHTML = ('<p><img class="f-left" src="' + imgLink + '">' + name
                                + '<span class="price">' + price + '</span>'
                                + '<br><span class="desc">' + description + "</span>"
                                + "</p>");
        where.append(dishContainer);
    }
}

function loadData() {
    //fetch("./dishes.xml")
    fetch("https://raw.githubusercontent.com/alejandrogartri/M7-UF1-PAC5/refs/heads/main/dishes.xml")
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
        let groups = data.getElementsByTagName("group");
        for (let i = 0; i < groups.length; i++) {
            const dishGroup = groups[i];
            let dishGroupContainer = document.createElement("div");
            loadDishes(dishGroup, dishGroupContainer);
            document.getElementById("dishes").appendChild(dishGroupContainer);
        }
    });
}