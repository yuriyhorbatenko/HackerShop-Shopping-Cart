import React, { Component } from "react";
import "./index.css";

export default class Cart extends Component {

    render() {
        return (
            <div className="card my-16 mr-25 flex-30">
                <section className="layout-row align-items-center justify-content-center px-16">
                    <h4>Your Cart</h4>
                </section>
                <div className="divider" />
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Item</th>
                            <th className="numeric">Quantity</th>
                            <th className="numeric">Item Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.cart.items.map((cartItem, idx) => {
                                return (
                                    <tr data-testid={'cart-item-' + idx}
                                        key={idx + 1}
                                        className="slide-up-fade-in">
                                        <td>{idx + 1}.</td>
                                        <td className="name" data-testid="cart-item-name">{cartItem.item}</td>
                                        <td className="numeric quantity" data-testid="cart-item-quantity">
                                            {cartItem.quantity}
                                        </td>
                                        <td className="numeric total" data-testid="cart-item-quantity-price">
                                            {cartItem.quantity * cartItem.price}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <h3 style={{ margin: '0 100px' }}>Total - {this.props.cart.items.reduce((prev, curr) => prev + (curr.price * curr.quantity), 0)}</h3>
            </div>

        );
    }
}
