import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { deleteOrderDetails } from '../actions/actions';

const DashboardContainer = styled.div`
	margin-top: 20px;
	border: 1px solid #000;
	padding: 5px;
	text-align: center;
`;

const OrderTemplate = styled.div`
	border: 1px solid #000;
	text-align: left;
	padding: 5px;
`;

class OrderDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    componentDidMount() {
        this.intervalID = setInterval(() => this.tick(), 1000);
    }

    tick() {
        this.setState({
            count: this.state.count + 1
        });
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    getOrderCompletionTime = (order) => {
        const remainingTime = new Date(order.orderTime + order.remainingTime * 60000).getTime();
        return new Date(remainingTime - this.state.count).toTimeString();
    };

    getTimer = (order) => {
        const timer = (order.remainingTime * 60) - (Math.floor((new Date().getTime() - new Date(order.orderTime).getTime()) / 1000));
        if (timer === 0) {
            this.props.dispatch(deleteOrderDetails(order.uuid));
        }
        return timer;
    };

    render() {
        const { orders } = this.props;
        if (orders.length === 0) {
            return (
                <DashboardContainer>
					<span>Currently, there are zero order preparing.</span>
					<br></br>
					<br></br>
					<span>Press <strong>Create New Order</strong> button to create new order.</span>
					<br></br>
					<br></br>
				</DashboardContainer>
            );
        } else {
            return (
                <DashboardContainer>
				{
                    orders.map((order) => {
                        return (
                            <OrderTemplate key={order.uuid}>
								<div> <strong>Order Id:</strong> {order.uuid}</div>
								<div>
									<div>Final Price : {order.finalPrice} Rs.</div>
									<div>Order Time : {new Date(order.orderTime).toTimeString()}</div>
									<div>Order Completion Time: {this.getOrderCompletionTime(order)}</div>
									<div>Timer : {this.getTimer(order)} seconds</div>
								</div>
							</OrderTemplate>
                        );
                    })
                }
				</DashboardContainer>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state
    };
};

export default connect(mapStateToProps)(OrderDashboard);
