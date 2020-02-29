import React, { Component } from 'react'
import { Button } from 'reactstrap'

class InfoForm extends Component {
    
    render(props){
        return(
            <div className="form-elements">
                <input 
                    type="text" 
                    value={this.props.currencyAmount} 
                    onChange={this.props.handleCurrencyChange} 
                    placeholder="$ Amount to be exchanged" 
                    size="35"
                />

                <br />
                <br />

                <select 
                    type="select" 
                    name="selectionFrom" 
                    value={this.props.currencyFrom}
                    onChange={this.props.handleCurrencyFrom} 
                                
                    >
                    <option value=''>- From -</option>
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
                    value={this.props.currencyTo}
                    onChange={this.props.handleCurrencyTo}      
                >
                    <option value=''>- To -</option>
                    <option value='USD'>US Dollar</option>
                    <option value='EUR'>Euro</option>
                    <option value='AUD'>Australian Dollar</option>
                    <option value='GBP'>Great British Pound</option>
                    <option value='JPY'>Japanese Yen</option>
                </select>

                    <br />
                    <br />

                <Button 
                    onClick={this.props.getCurrency} 
                    color="secondary"
                    >
                    Calculate
                </Button>
                
            </div>   
        )
    }
}

export default InfoForm