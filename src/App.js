import React, { Component } from 'react';
import './App.css';
import ProductList from "./components/product-list";
import Cart from "./components/cart";

const title = "HackerShop";

class App extends Component {
    constructor() {
        super();
        const products = [...PRODUCTS].map((product, index) => {
            product.id = index + 1;
            product.image = `/images/items/${product.name.toLocaleLowerCase()}.png`;
            product.cartQuantity = 0;
            product.price = product.price;
            return product;
        });
        this.state = {
            cart: {
                items: []
            },
            products
        }
    }

    onAddItemToCart = (newItem) => {
        let items = [...this.state.cart.items.slice()];
        items.push(newItem);
        let itemIndex = items.findIndex(item => item.id === newItem.id);
        if (itemIndex === -1) {
            items[0] = { ...items[0], quantity: items[0].quantity + 1 }
        } else {
            items[itemIndex] = { ...items[itemIndex], quantity: items[itemIndex].quantity + 1 }
        }
        this.setState(prevState => ({
            cart: {
                ...prevState.cart,
                items
            }
        }))
    }

    onRemoveItemFromCart = (itemId) => {
        let cartItems = [...this.state.cart.items.slice()];
        cartItems = cartItems.filter(item => item.id !== itemId)
        this.setState(prevState => ({
            cart: {
                ...prevState.cart,
                items: cartItems
            }
        }))
    }

    onDecrementItemCount = (itemId) => {
        let cartItems = [...this.state.cart.items.slice()]
        let itemIndex = cartItems.findIndex(item => item.id === itemId);
        if (cartItems[itemIndex].quantity > 1) {
            cartItems[itemIndex] = {
                ...cartItems[itemIndex],
                quantity: cartItems[itemIndex].quantity - 1
            }

            this.setState(prevState => ({
                cart: {
                    ...prevState.cart,
                    items: cartItems
                }
            }))
        } else {
            this.onRemoveItemFromCart(cartItems[itemIndex].id)
        }

    }

    onIncrementItemCount = (itemId) => {
        let cartItems = [...this.state.cart.items.slice()]
        let itemIndex = cartItems.findIndex(item => item.id === itemId);
        cartItems[itemIndex] = { ...cartItems[itemIndex], quantity: cartItems[itemIndex].quantity + 1 }
        this.setState(prevState => ({
            cart: {
                ...prevState.cart,
                items: cartItems
            }
        }))
    }


    render() {
        return (
            <div>
                <h8k-navbar header={title}></h8k-navbar>
                <div className="layout-row shop-component">
                    <ProductList
                        products={this.state.products}
                        cartItems={this.state.cart.items}
                        addItemToCart={this.onAddItemToCart}
                        decrementItemCount={this.onDecrementItemCount}
                        incementItemCount={this.onIncrementItemCount}
                    />
                    <Cart cart={this.state.cart} />
                </div>
            </div>
        );
    }
}

export const PRODUCTS = [
    {
        name: "Cap",
        price: 5
    },
    {
        name: "HandBag",
        price: 30
    },
    {
        name: "Shirt",
        price: 35
    },
    {
        name: "Shoe",
        price: 50
    },
    {
        name: "Pant",
        price: 35
    },
    {
        name: "Slipper",
        price: 25
    }
];
export default App;
