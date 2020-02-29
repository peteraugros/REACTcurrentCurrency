import React, { Component } from 'react'
import axios from 'axios'
import { Button } from 'reactstrap'

const currencyKey = process.env.REACT_APP_CURRENCY_KEY


class InfoForm extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            currencyFrom: "",
            currencyTo: "",
            currencyAmount: "",
            currencyRate: "",
            APIresponse: {},
            finalResult: ""
        }   
    }

    getCurrency = (e) => {
        e.preventDefault();
        
        const queryURL = `https://currency-converter5.p.rapidapi.com/currency/historical/2018-02-09?format=json&to=${this.state.currencyTo}&from=${this.state.currencyFrom}&amount=1`;
        // const queryURL = `http://data.fixer.io/api/latest?&source=USD&access_key=${currencyKey}` working;

        axios({
                "async": true,
                "crossDomain": true,
                "url": queryURL,
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "currency-converter5.p.rapidapi.com",
                    "x-rapidapi-key": currencyKey
                }
            })
            .then((response)=>{
              console.log(response)
              this.setState({APIresponse: response})
              this.setRate()
            })
                 .catch((error)=>{
                  console.log(error)
                })
            }
        
    setRate = () =>{
    
      switch(this.state.currencyTo) {
      case "EUR":
        let EUR = this.state.APIresponse.data.rates.EUR.rate
        this.setState({currencyRate: EUR })
        console.log("Rate from switch statement", EUR)
        break;
      case "JPY":
        let JPY = this.state.APIresponse.data.rates.JPY.rate
        this.setState({currencyRate: JPY })
        console.log("Rate from switch statement", JPY)
        break;
      case "USD":
        let USD = this.state.APIresponse.data.rates.USD.rate
        this.setState({currencyRate: USD })
        console.log("Rate from switch statement", USD)
        break;
      case "AUD":
        let AUD = this.state.APIresponse.data.rates.AUD.rate
        this.setState({currencyRate: AUD })
        console.log("Rate from switch statement", AUD)
        break;
      case "GBP":
        let GBP = this.state.APIresponse.data.rates.GBP.rate
        this.setState({currencyRate: GBP })
        console.log("Rate from switch statement", GBP)
        break;
        default:
    }
        this.calculateRate()
    }

    calculateRate = () => {
       
        if(this.state.currencyAmount && this.state.currencyTo && this.state.currencyFrom ){
            let amount = parseInt(this.state.currencyAmount)
            let rate = this.state.currencyRate
            let result = amount * rate
            console.log("result from calculate rate", result, "rate: ", rate, "amount: ", amount)
            this.formatResult(result)
            }
    }

    formatResult = (result) => {
        let decimal = result.toFixed(2);
        let formattedResult = decimal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.setState({finalResult: formattedResult})
        console.log("I am the finalResult living in state", this.state.finalResult)
    }

    handleCurrencyFrom = e => {
        this.setState({
            currencyFrom: e.target.value
        })  
    }

    handleCurrencyTo = e => {
        this.setState({
            currencyTo: e.target.value
        })
    }

    handleCurrencyChange = e => {
        this.setState({
            currencyAmount: e.target.value
        })
    }

    render(){
        return(
            <div className="form-elements">
                <input 
                    type="text" 
                    value={this.state.currencyAmount} 
                    onChange={this.handleCurrencyChange} 
                    placeholder="$" 
                />

                <br />
                <br />

                <select 
                    type="select" 
                    name="selectionFrom" 
                    value={this.state.currencyFrom}
                    onChange={this.handleCurrencyFrom}              
                    >
                    <option value=''>- Please choose -</option>
                    <option value='USD'>US Dollar</option>
                    <option value='EUR'>Euro</option>
                    <option value='AUD'>Australian Dollar</option>
                    <option value='GBP'>Great British Pound</option>
                    <option value='JPY'>Japanese Yen</option>
                    </select>
                
                <br />
                <br />

                <select 
                    type="select" 
                    name="selectionTo" 
                    value={this.state.currencyTo}
                    onChange={this.handleCurrencyTo}       
                >
                    <option value=''>- Please choose -</option>
                    <option value='USD'>US Dollar</option>
                    <option value='EUR'>Euro</option>
                    <option value='AUD'>Australian Dollar</option>
                    <option value='GBP'>Great British Pound</option>
                    <option value='JPY'>Japanese Yen</option>
                </select>

                    <br />
                    <br />

                <Button 
                    onClick={this.getCurrency} 
                    color="secondary"
                    >
                    Calculate
                </Button>
                
            </div>   
        )
    }

}

export default InfoForm