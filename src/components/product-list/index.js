import React, { Component } from "react";
import "./index.css";

export default class ProductList extends Component {
    onAddToCart = (product) => {
        let cartItem = {
            id: product.id,
            item: product.name,
            quantity: product.cartQuantity,
            price: product.price
        }
        this.props.addItemToCart(cartItem);
    }

    isItemInCart = (itemId) => {
        let foundItem = this.props.cartItems.find(item => item.id === itemId) || {}
        return Object.keys(foundItem).length > 0 ? true : false
    }

    decrementItemCount = (productId) => {
        this.props.decrementItemCount(productId);
    }

    incementItemCount = (productId) => {
        this.props.incementItemCount(productId);
    }

    getCountOfProduct = (productId) => {
        let item = this.props.cartItems.find(item => item.id === productId)
        return item?.quantity || 0;
    }

    render() {
        return (
            <div className="layout-row wrap justify-content-center flex-70 app-product-list">
                {this.props.products.map((product, i) => {
                    return (
                        <section className="w-30"
                            data-testid={'product-item-' + i}
                            key={product.id}>
                            <div className="card ma-16">
                                <img alt="Your Cart" src={product.image}
                                    className="d-inline-block align-top product-image" />
                                <div className="card-text pa-4">
                                    <h5 className="ma-0 text-center">{product.name}</h5>
                                    <p className="ma-0 mt-8 text-center">${product.price}</p>
                                </div>
                                <div className="card-actions justify-content-center pa-4">

                                    {!this.isItemInCart(product.id) && <button className="x-small outlined" data-testid="btn-item-add"
                                        onClick={() => this.onAddToCart(product)}
                                    >
                                        Add To Cart
                                    </button>}

                                    {this.isItemInCart(product.id) && <div className="layout-row justify-content-between align-items-center">
                                        <button className="x-small icon-only outlined"
                                            data-testid="btn-quantity-subtract"
                                            onClick={() => this.decrementItemCount(product.id)}
                                        >
                                            <i className="material-icons">-</i>
                                        </button>

                                        <input type="number"
                                            value={this.getCountOfProduct(product.id)}
                                            disabled
                                            className="cart-quantity" data-testid="cart-quantity" />

                                        <button className="x-small icon-only outlined"
                                            data-testid="btn-quantity-add"
                                            onClick={() => this.incementItemCount(product.id)}
                                        >
                                            <i className="material-icons">+</i>
                                        </button>
                                    </div>}

                                </div>
                            </div>
                        </section>
                    )
                })}

            </div>

        );
    }
}

export const UpdateMode = {
    ADD: 1,
    SUBTRACT: 0
}
