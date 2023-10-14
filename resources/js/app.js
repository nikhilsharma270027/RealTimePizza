import axios from "axios";
//import { error } from "laravel-mix/src/Log";
import Noty from "noty";

let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#cartCounter')

function updateCart(pizza) {
    axios.post('/update-cart', pizza).then(res => {
            //console.log(res)
            cartCounter.innerText = res.data.totalQty
            new Noty({
                type: 'success',
                timeout: 1000,
                text: 'Item Added to cart',
                progressBar: false
                //layout: 'bottomLeft'
            }).show();
    }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 1000,
            text: 'Something went wrong',
            progressBar: false
            //layout: 'bottomLeft'
        })
    })
    }    

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        //console.log(e);
        let pizza = JSON.parse(btn.dataset.pizza) //after clicking add btn ,we get data in json of paticular click
        //console.log(pizza);
        updateCart(pizza)
    })
})