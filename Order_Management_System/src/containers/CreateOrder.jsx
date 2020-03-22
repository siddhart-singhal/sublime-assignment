import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { DISHES } from '../constants/constants';
import { insertNewOrder } from '../actions/actions';
import { v4 as uuidv4 } from 'uuid';

const DishesConatiner = styled.div`
	margin-top: 20px;
	border: 1px solid #000;
	padding: 5px;

	table {
		width: 100%;
		text-align: center;

		thead tr {
			border-bottom: 1px solid #000;
		}

		tbody tr:last-child {
			border-bottom: 1px solid #000;
		}

		tr {
			display: flex;

			td:first-child {
				width: 20%;
			}

			td:nth-child(2) {
				width: 20%;
			}

			td:nth-child(3) {
				width: 20%;
			}

			td:nth-child(4) {
				width: 20%;
				display: flex;
				justify-content: center;

				div {
					margin: 0 5px;
				}
			}

			td:last-child {
				width: 20%;
			}
		}
	}

	> div {
		margin-top: 5px;
		text-align: end;
	}

	&:last-child {
		button {
			padding: 5px;
			margin: 10px 0 0 10px;
		}
	}
`;

class CreateOrder extends Component {
    constructor() {
        super();
        this.state = {
            quantity: {
                roti: 0,
                rice: 0,
                dal: 0,
                paneer: 0,
                chicken: 0
            }
        };
    }

    getFinalPrice = () => {
        const { quantity } = this.state;
        let finalAmount = 0;
        DISHES.map((dish) => {
            finalAmount += (dish.price * quantity[dish.name.toLowerCase()]);
        });
        return finalAmount;
    };

    getTotalPrice = dish => {
        const { quantity } = this.state;
        return dish.price * quantity[dish.name.toLowerCase()];
    };

    getOrderRemainingTime = () => {
        const { quantity } = this.state;
        let remainingTime = 0;
        DISHES.map((dish) => {
            if ((quantity[dish.name.toLowerCase()] > 0) && dish.time > remainingTime) {
                remainingTime = dish.time;
            }
        });
        return remainingTime;
    };

    handleNewOrder = () => {
        const { dispatch, history } = this.props;

        const orderDetails = {
            finalPrice: this.getFinalPrice(),
            quantity: this.state.quantity,
            remainingTime: this.getOrderRemainingTime(),
            orderTime: new Date().getTime(),
            uuid: uuidv4()
        };
        dispatch(insertNewOrder(orderDetails));
        history.push('/');
    };

    render() {
        const { quantity } = this.state;
        const { history } = this.props;
        return (
            <DishesConatiner>
				<table>
					<thead>
						<tr>
							<td><div>Dish Name</div></td>
							<td><div>Price</div></td>
							<td><div>Preparation Time</div></td>
							<td><div>Quantity</div></td>
							<td><div>Total Price</div></td>
						</tr>
					</thead>
					<tbody>
						{
                            DISHES.map((dish) => {
                                return (
                                    <tr key={dish.key}>
										<td><div>{dish.name}</div></td>
										<td><div>{dish.price} Rs.</div></td>
										<td><div>{dish.time} minutes</div></td>
										<td>
											<div
                                                data-attr-name={dish.name}
                                                onClick={(e) => {
                                                    const dish = e.target.getAttribute('data-attr-name').toLowerCase();
                                                    this.setState(state => (state.quantity[dish] = state.quantity[dish] + 1, state));
                                                }}
                                            >
												+
											</div>
											<div>{quantity[dish.name.toLowerCase()]}</div>
											<div
                                                data-attr-name={dish.name}
                                                onClick={(e) => {
                                                    const dish = e.target.getAttribute('data-attr-name').toLowerCase();
                                                    if (quantity[dish] >= 1) {
                                                        this.setState(state => (state.quantity[dish] = state.quantity[dish] - 1, state));
                                                    }
                                                }}
                                            >
												-
											</div>
										</td>
										<td>{this.getTotalPrice(dish)}</td>
									</tr>
                                );
                            })
                        }
					</tbody>
				</table>
				<div>
					<span>Final Price: {this.getFinalPrice()}</span>
				</div>
				<div>
					<button
                        disabled={this.getFinalPrice() === 0}
                        onClick={this.handleNewOrder}
                    >
						Submit Order
					</button>
					<button
                        onClick={() => history.push('/')}
                    >
						Cancel
					</button>
				</div>
			</DishesConatiner>
        );
    }
}

export default connect()(CreateOrder);
