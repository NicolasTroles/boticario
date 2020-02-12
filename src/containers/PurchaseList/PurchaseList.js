import React, { Component } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import { translate } from 'react-translate';
import numeral from 'numeral';
import moment from 'moment';

// Components
import Table from 'components/Table/Table';

// Types
import { EDIT_PURCHASE } from 'redux/authentication/types';

// Services
import CashbackService from 'services/cashback'

const Title = styled('h1')`
    ${({ theme }) => `
        font-size: ${theme.fontSize.px40};
        text-align: center;
        margin: 30px 0;
        color: ${theme.colors.grey1};
`};`

const Actions = styled('div')`
    ${({ theme }) => `
        display: flex;
        p {
            margin: 0 5px;
            color: ${theme.colors.blue2};
            cursor: pointer;
            :hover{ 
                text-decoration: underline;
            }
        }
`};`



class PurchaseList extends Component {
    state = {
        myCashback: null,
    }

    componentDidMount() {
        this.fetchCashback();
    }

    fetchCashback = async () => {
        const { props: { authenticationReducer: { tokenDecoded: { cpf } } } } = this;

        try {
            const response = await CashbackService.Cashback(cpf);
            this.setState({
                myCashback: response.data.body.credit,
            })
        } catch (e) {
            console.log(e)
        }

    }


    deletePurchase = code => {
        let purchases = JSON.parse(localStorage.getItem('purchases'));
        purchases = purchases.filter(purchase => purchase.code !== code);
        localStorage.setItem('purchases', JSON.stringify(purchases));
        this.forceUpdate();
    }

    editPurchase = purchase => {
        const { props: { dispatch } } = this;
        dispatch({
            type: EDIT_PURCHASE.SUCCESS,
            purchase,
        });
    }

    render() {
        const { state, props: { authenticationReducer: { tokenDecoded: { id } } } } = this;
        let purchases = localStorage.getItem('purchases');
        let newData = [];
        const headers = ['Código', 'Valor', 'Data', 'Cashback em %', 'Cashback em R$', 'Status', 'Ações'];

        if (purchases && JSON.parse(purchases).some(purchase => purchase.userId === id)) {
            purchases = JSON.parse(purchases);

            newData = purchases
                .filter(purchase => purchase.userId === id)
                .map(purchase => {
                    const newItem = [];
                    newItem['Código'] = {
                        value: purchase.code,
                        originalValue: purchase.code
                    };
                    newItem['Valor'] = {
                        value: `R$${numeral(purchase.value).format('0.0,[00]')}`,
                        originalValue: purchase.value
                    };
                    newItem['Data'] = {
                        originalValue: purchase.date,
                        value: moment(new Date(purchase.date)).format('LL'),
                    };
                    newItem['Cashback em %'] = {
                        originalValue: 15,
                        value: '15%',
                    };
                    newItem['Cashback em R$'] = {
                        originalValue: purchase.value * .15,
                        value: `R$${numeral((purchase.value * .15).toFixed(2)).format('0.0,[00]')}`,
                    };
                    newItem['Status'] = {
                        value: purchase.status,
                    };
                    newItem['Ações'] = {
                        value: purchase.status === 'Em Validação' &&
                            <Actions>
                                <p onClick={() => this.editPurchase(purchase)}>Editar</p>{' | '}
                                <p onClick={() => this.deletePurchase(purchase.code)}>Excluir</p>
                            </ Actions>
                    };

                    return newItem;
                });


        } else {
            return <Title>Não há compras cadastradas <br /> Cashback acumulado R${numeral(state.myCashback).format('0.0,[00]')}</Title>
        }

        return (
            <div>
                <Title>Minhas compras <br /> Cashback acumulado R${numeral(state.myCashback).format('0.0,[00]')}</Title>
                <Table headers={headers} data={newData} actionPositions={[]} />;
        </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        authenticationReducer: state.authenticationReducer,
    }
}

export default translate('Header')(connect(mapStateToProps)(PurchaseList));
