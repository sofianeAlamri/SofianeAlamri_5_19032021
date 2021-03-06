import {productsContainer, formContent, rightBox,selectElement, btnAddToart, tableBody, table, totalOrder} from "../helpers/dom.js";
import {getUrlParams, findOneProduct} from "../helpers/functions.js";

export default class RenderProduct{
    /**
     * Affiche sur la page d'accueil tous les produits retournés par l'API
     * @param {Array} products Tableau retourné par l'api fetch
     */
    static renderHomePage(products){

        products.map(product => {
            const html = `
                <a href="/pages/produit.html?id=${product._id}" class="card">
                    <figure class="camera">
                        <div class="camera__img-box">
                            <div class="camera__img-hidden">
                                <img src="${product.imageUrl}" alt="" class="camera__img">
                                <img src="${product.imageUrl}" alt="" class="camera__img camera__img-hover">
                            </div>
                        </div>
                        <figcaption class="camera__caption">
                            <p class="camera__name">${product.name}</p>
                            <p class="camera__price">${product.price / 100}€</p>
                        </figcaption>
                    </figure>
                    <span class="card__icon"><img src="assets/img/eye.svg" alt="icone oeil"></span> 
                </a>
            `;
            productsContainer.insertAdjacentHTML("afterbegin", html)
        });
    }

    /**
     * Récupère un produit en fonction du paramètre de l'url et l'affiche
     * @param {Object} product Objet correspondant à un produit
     */
    static renderOneProduct(product){

        const imageHtml = `
            <div class="left-box">
                <img src="${product.imageUrl}" alt="" class="img">
            </div>
        `;

        const detailsHtml = `
            <div class="details">
                <p class="details__name">${product.name}</p>
                <p class="details__price">${product.price/100}€</p>
                <p class="details__description">${product.description}</p>
            </div>
        `;

        productsContainer.insertAdjacentHTML("afterbegin", imageHtml);
        rightBox.insertAdjacentHTML("afterbegin", detailsHtml);
        btnAddToart.setAttribute("data-id", product._id);

        product.lenses.forEach(lense => selectElement.insertAdjacentHTML("afterbegin", `<option value="${lense}">${lense}</option>`));
    }

    /**
    * Affiche sur la page panier tous les produits stocké dans le localStorage
    * @param {Array} products Tableau retourné par localStorage
    */
    static renderCartPage(products) {
        let html = "";
        const totalPerProduct = [];
        let total;
    
        if (!products){
            html = "<p class='emptyCart'>Le panier est vide</p>"
            productsContainer.insertAdjacentHTML("afterbegin", html);
        }else{
            products.map(product => {
                formContent.classList.remove("hidden");
                table.classList.remove("hidden");
                html += `
                <tr >
  
                        <td>
                            <img src="${product.imageUrl}" alt="" class="cart-array__image">
                        </td>
                        <td class="cart-array__name">${product.name}</td>
                        <td class="pu">${product.price / 100}€</td>

      
                        <td>
                            <span  class="cart-array__quantity-box">
                                <button class="cart-array__btn cart-array__btn--less cart-array__btn--quantity" data-id=${product._id}>-</button>
                                <input type="text" class="cart-array__quantity" value="${product.quantity}" disabled>
                                <button class="cart-array__btn cart-array__btn--more cart-array__btn--quantity" data-id=${product._id}>+</button>
                            </span>
                        </td>
                        <td class="cart-array__total">${(product.price * product.quantity)/100}€</td>
                        <td class="cart-array__trash-box">
                            <button class="cart-array__btn cart-array__btn--delete" data-id=${product._id}>
                                <span class="cart-array__icon"><img src="../assets/img/trash.svg" alt="icone poubelle" class=""></span>
                            </button>
                        </td>
   
                </tr>
                `

                //Calcul du total de la commande
                totalPerProduct.push(product.price * product.quantity);
                total = totalPerProduct.reduce((total, price) => total + price, 0);
            });
        }
        totalOrder.insertAdjacentHTML("afterbegin", total/100);
        tableBody.insertAdjacentHTML("afterbegin", html);
    }
}