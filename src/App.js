import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios'
import './App.css';
import Header from './components/Header'
import InfoForm from './components/InfoForm'
import ResultsBox from './components/ResultsBox'

const currencyKey = process.env.REACT_APP_CURRENCY_KEY
console.log(currencyKey)

class App extends React.Component {

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
        this.handleCurrencyChange = this.handleCurrencyChange.bind(this)
        this.handleCurrencyFrom = this.handleCurrencyFrom.bind(this)
        this.handleCurrencyTo = this.handleCurrencyTo.bind(this)
        this.getCurrency = this.getCurrency.bind(this)
        this.setRate = this.setRate.bind(this)
        this.calculateRate = this.calculateRate.bind(this)
        this.formatResult = this.formatResult.bind(this)
    }

    getCurrency = (e) => {
        e.preventDefault();

        console.log("currency amount: ", this.state.currencyAmount)
        console.log("currency to: ", this.state.currencyTo)
        console.log("currency from: ", this.state.currencyFrom)
        
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
        console.log("currency from: ", this.state.currencyFrom) 
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
  return (

    <Container>
        <Row>
              <Header />
        </Row>
        <Row>
          <Col md={6} className="results-div">
      
              <InfoForm 
               currencyAmount={this.state.currencyAmount} 
               currencyFrom={this.state.currencyFrom}
               currencyTo={this.state.currencyTo}
               handleCurrencyChange={this.handleCurrencyChange} 
               handleCurrencyFrom={this.handleCurrencyFrom}
               handleCurrencyTo={this.handleCurrencyTo}
               getCurrency={this.getCurrency}
              />
          </Col>     
          <Col md={6} className="results-div">
            {this.state.currencyRate ? (
              <ResultsBox 
              finalResult={this.state.finalResult}
              currencyAmount={this.state.currencyAmount}
              currencyFrom={this.state.currencyFrom}
              currencyTo={this.state.currencyTo}
              currencyRate={this.state.currencyRate}

              />

              ) : (<p></p>)}

         




              
          </Col>   
        </Row>
    </Container>
  );
}
}
export default App;
