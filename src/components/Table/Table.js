/* eslint-disable */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ListTableHeader = styled('div')`
${({ theme }) => `
    display: flex;
    margin-bottom: ${theme.spacing.px10};
    @media screen and (max-width: ${theme.breakpoint.lg}){
        display: none;
    }
`}`

const ListTableHeaderItem = styled('div')`
${({ theme, columnWidth, buttonAction, removeCursorPointer, columnTitleColor, titleAlign }) => `
    width: ${columnWidth}%;
    padding: ${theme.spacing.none} ${theme.spacing.px10};
    color: ${columnTitleColor ? theme.colors[columnTitleColor] : theme.colors.blue2};
    font-size: ${theme.fontSize.px14};
    display: flex;
    justify-content: flex-start;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: none;
    cursor: pointer;
    box-sizing: border-box;
    & > span {
        width: initial;
    }
    ${buttonAction ? `
        text-align: center;
        justify-content: center;
        `
            : ``
        }
    ${titleAlign == 'right' ?
            `justify-content: flex-end;`
            :
            ``
        }
    ${removeCursorPointer ? `
        cursor: initial;
        `
            : ``
        }
`}`

const ContainerPadding = styled('div')`
    margin-bottom: 14px;
`

const TableRow = styled('div')`
${({ theme, firstItem, color, lastItem }) => `
    background-color: ${theme.colors.white};
    border-bottom: 1px solid ${theme.colors.grey1};
    box-shadow: 2px 17px 18px -24px rgba(0,0,0,.3);
    display: flex;
    border-left: 4px solid ${color};
    position: relative;
    transition: all .1s;
    @media screen and (max-width: ${theme.breakpoint.lg}){
        flex-direction: column;
        align-items: center;
        box-shadow: 0 0 20px rgba(0,0,0,.2);
        border-radius: 10px !important;
        margin: 30px 0;
        border-left: 0;
    }
    ${firstItem ? `
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        border-top: none;
    ` : ``}

    ${lastItem ? `
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        border-bottom: none;
    ` : ``}

    :hover {
        background-color: ${theme.colors.grey2};
    }

`}`
const TableRowItem = styled('div')`
${({ theme, columnWidth, firstItem, buttonAction, noDivider }) => `
    padding: ${theme.spacing.px15} ${theme.spacing.px10};
    width: ${columnWidth}%;
    text-align: left;
    justify-content: center;
    flex-direction: column;
    display: flex;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    border-left: 1px solid #aaa;
    
    font-size: ${theme.fontSize.px14};
    color: ${theme.colors.grey1};
    
    @media screen and (max-width: ${theme.breakpoint.lg}){
        width: 100%;
        align-items: center;
        border-top: 1px solid #aaa;
        padding: ${theme.spacing.px0} ${theme.spacing.px20} 0 0;
        flex-direction: row;
        justify-content: space-between;
        border-left: 0;
        :first-child  {
            border-top: 0;
        }
        ${buttonAction ?
            `max-width: none;`
            : ``
        }
    }
    ${firstItem || noDivider ? `
        border-left: 0;
    ` : ``}

    ${buttonAction ? `
        text-align: center;
        cursor: pointer;
        overflow: visible;
    ` : ``}
`}`

const IconStyled = styled('div')`
${({ theme }) => `
    color: ${theme.colors.grey1};
    font-size: ${theme.fontSize.px18};
    width: 22px;
    height: 22px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 50%;
    transition: background 0.3s;
    &:hover{
        background: #f2f2f2 radial-gradient(circle, transparent 1%, #f2f2f2 1%) center/15000%;
    }
    &:active {
        background-color: #cecece;
        background-size: 100%;
        transition: background 0s;
    }
`}`

const ActionButton = styled('div')`
${({ theme }) => `
    @media screen and (max-width: ${theme.breakpoint.lg}){
        display: flex;
        flex-direction: column;
    }
`}`

const ActionStyled = styled('span')`
${({ theme }) => `
    text-transform: capitalize
    color: ${theme.colors.grey1}
    font-size: ${theme.fontSize.px10};
    @media screen and (max-width: ${theme.breakpoint.lg}){
        font-size: ${theme.fontSize.px12};
        padding: ${theme.spacing.px5} 0;
    }
`}`

const IconOrderBy = styled('span')`
${({ theme }) => `
    padding-left: 8px;
    color: ${theme.colors.blue2};
    font-size: ${theme.fontSize.px12};
`}`

const ColumnTitleMobile = styled('div')`
${({ theme }) => `
    display: none;
    width: 15%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    min-width: 100px;
    padding: ${theme.spacing.px20};
    margin-right: ${theme.spacing.px20};
    text-align: left;
    border-right: 1px solid ${theme.colors.grey2};
    color: ${theme.colors.blue2};
    font-size: ${theme.fontSize.px16};
    
    @media screen and (max-width: ${theme.breakpoint.lg}){
        display: block;
    }

`}`
const ColumnContent = styled('div')`
${({ theme }) => `
    @media screen and (max-width: ${theme.breakpoint.lg}){
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
`}`

function Table(props) {
    const { headers, actionPositions, data } = props;

    const [fieldOrder, setFieldOrder] = useState('');
    const [order, setOrder] = useState('desc');
    const [iconOrder, setIconOrder] = useState('sort-amount-down');
    const [globalData, setGlobalData] = useState([]);
    const [columnWidth, setColumnWidth] = useState(0);

    useEffect(() => {
        setFieldOrder(headers[0]);
    }, [])

    useEffect(() => {
        if (data.length) {
            setGlobalData(data);
        }
    }, [data]);

    useEffect(() => {
        if (globalData.length) {
            if (fieldOrder) {
                orderBy(fieldOrder, order === 'desc' ? 'asc' : 'desc');
            } else {
                orderBy(headers[0], order);
            }
            updateColumnWidth();
        }
    }, [globalData]);

    const updateColumnWidth = () => {
        let totalWidthSetted = 0;
        let totalItemsWithWidthSetted = 0;
        if (globalData.length) {
            Object.entries(globalData[0]).forEach(item => {
                if (item[1]['width']) {
                    totalWidthSetted += item[1]['width'];
                    totalItemsWithWidthSetted++;
                }
            });
        }

        let newColumnWidth = (100 - totalWidthSetted) / (headers.length - totalItemsWithWidthSetted);

        newColumnWidth = newColumnWidth < 10 ? 10 : newColumnWidth;

        setColumnWidth(newColumnWidth);
    }

    const orderBy = (field, newOrder) => {
        const data = globalData.sort((a, b) => {
            const curr = a[field].originalValue !== undefined ? a[field].originalValue : a[field].value;
            const next = b[field].originalValue !== undefined ? b[field].originalValue : b[field].value;

            if (newOrder === 'asc') {
                return curr < next ? -1 : curr > next ? 1 : 0;
            }
            return curr > next ? -1 : curr < next ? 1 : 0;
        });

        setOrder(newOrder === 'desc' ? 'asc' : 'desc');
        setGlobalData(data);
        setFieldOrder(field);
        setIconOrder(newOrder === 'desc' ? 'sort-amount-up' : 'sort-amount-down');
    }

    return (
        globalData.length ?
            <>
                <ListTableHeader>
                    {headers.map((item, index) => {
                        const isAction = actionPositions.some(item => item === index);
                        const width = (globalData.length && globalData[0][item] && globalData[0][item].width) || columnWidth;
                        const removeTitle = globalData.length && globalData[0][item] && globalData[0][item].noTitle;
                        const noSort = globalData.length && globalData[0][item] && globalData[0][item].noSort;
                        const columnTitleColor = globalData.length && globalData[0][item] && globalData[0][item].columnTitleColor;
                        const titleAlign = globalData.length && globalData[0][item] && globalData[0][item].titleAlign;

                        return (
                            <ListTableHeaderItem
                                key={index}
                                buttonAction={isAction}
                                columnWidth={width}
                                columnTitleColor={columnTitleColor}
                                titleAlign={titleAlign}
                                removeCursorPointer={removeTitle || isAction || noSort}
                                onClick={removeTitle || noSort ? () => { } : () => orderBy(item, order)}
                            >
                                {!removeTitle &&
                                    <>
                                        {item}
                                        {item === fieldOrder && !isAction && !noSort &&
                                            (iconOrder === 'sort-amount-down' ? ` ^` : ' v')
                                        }
                                    </>

                                }
                            </ListTableHeaderItem>
                        )
                    })}
                </ListTableHeader>

                <ContainerPadding>
                    {globalData.map((row, index, array) => {
                        return (
                            <TableRow firstItem={index === 0} lastItem={array.length - 1 === index} key={index}>
                                {headers.map((column, indexColumn, arrayColumn) => {
                                    const isAction = actionPositions.some(item => item === indexColumn);
                                    const columnInfo = row[column] || {}
                                    const width = (columnInfo.width) || columnWidth;
                                    return (
                                        <TableRowItem
                                            key={-indexColumn}
                                            firstItem={indexColumn === 0}
                                            lastItem={arrayColumn.length - 1 === indexColumn}
                                            buttonAction={isAction}
                                            columnWidth={width}
                                            noDivider={columnInfo.noDivider}
                                        >
                                            <ColumnTitleMobile>{column}</ColumnTitleMobile>
                                            {isAction ?
                                                <ColumnContent>
                                                    <ActionButton onClick={columnInfo.action ? columnInfo.action : () => { }}>
                                                        <ActionStyled>{columnInfo.value}</ActionStyled>
                                                    </ActionButton>
                                                </ColumnContent>
                                                :
                                                <div>{columnInfo.value} </div>
                                            }
                                        </TableRowItem>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </ContainerPadding>
            </>
            :
            null
    )
}

export default Table;


/*
    PARÂMETROS
    headers = [NomeColuna1, NomeColuna2, ..., NomeColunaN], -> Strings com o nome que será exibido na coluna
    actionPositions = [0,6,...,n], -> Number das posições das colunas que serão ações (é centralizado no meio e não tem ordenação),
    data = Um array contendo as informações que serão exibidas na tabela no seguinte formato:
            [{
                NomeDaColuna1: {
                    value: Valor -> Este valor pode ser qualquer coisa, um componente, string, number.
                    originalValue: valor -> É o valor que será utilizado para ordenar, caso o campo 'value' esteja recebendo algum valor transformado,
                    noTitle: true, -> Sem titulo na coluna
                    noDivider: true, -> sem divisor na esquerda
                    noSort: true, -> sem ordenção para a coluna
                    width: 20, -> largura da coluna
                    columnTitleColor: 'grey2' -> cor do título da coluna
                },
                NomeDaColuna2: {
                    ...
                },
                ...
            },
            {Linha 2},
            ...
        ]


*/