import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
  state={
    stocks: [],
    myStocks: [],
    selectedStocks: []
  }

  componentDidMount(){
    fetch('http://localhost:3000/stocks')
    .then(res => res.json())
    .then(data => this.setState({stocks: data, selectedStocks:data}))
  }

  buyStock = (stock) =>{
    let newList = this.state.myStocks.concat(stock)
    this.setState({myStocks: newList})
  }

  sellStock = (stock) => {
    let newList = this.state.myStocks.filter(s => s !== stock)
    this.setState({myStocks: newList})
  }

  selectStocks = (typeInput) => {
    if (typeInput === "All"){
      this.setState({selectedStocks: this.state.stocks})
    } else {
      let newList = this.state.stocks.filter(s => s.type === typeInput)
      this.setState({selectedStocks: newList})
    }    
  }

  sortByAlph = (e) => {
    if (e.target.checked === true) {
      let sortedN = this.state.selectedStocks.sort((a, b) => a.name.localeCompare(b.name))
      this.setState({selectedStocks: sortedN})
    }
  }

  sortByPrice = (e) => {
    if (e.target.checked === true) {
      let sortedP = this.state.selectedStocks.sort((a, b) => b.price - a.price)
      this.setState({selectedStocks: sortedP})
    }
  }

  render() {
    return (
      <div>
        <SearchBar selectStocks={this.selectStocks} sortByAlph={this.sortByAlph} sortByPrice={this.sortByPrice}/>

          <div className="row">
            <div className="col-8">

              <StockContainer buyStock={this.buyStock} stocks={this.state.selectedStocks}/>

            </div>
            <div className="col-4">

              <PortfolioContainer sellStock={this.sellStock} stocks={this.state.myStocks}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
