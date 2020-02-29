import React from 'react'

const ResultsBox = (props) => {
    return(
    <div className="result-header">
    <h1>${props.currencyAmount} {props.currencyFrom} is worth</h1>
    <h1>${props.finalResult} {props.currencyTo}</h1>
    <h1>at an exchange rate of {props.currencyRate}%</h1>
    </div>
    )
}

export default ResultsBox
