import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {
  state = { 
    manager: '',
    players: [],
    balance: '',
    value: ''
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance })
  }

  onSubmit = async () => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    await lottery.methods.enterLottery().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });
  }

  render() {
    return (
      <div>
        <h2>The Lottery Contract</h2>
        <p>This Contract is managed by {this.state.manager} </p>
        <br />
        <p>There are currently {this.state.players.length} people entered. 
        Competing to win {web3.utils.fromWei(this.state.balance, 'ether')} Ether! </p>
        <hr />

        <form onSubmit={this.onSubmit}>
          <h3>Want to try your luck?</h3>
          <div>
            <label>Amount of Ether to enter</label>
            <input 
              value={this.state.value}
              onChange={ event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>
      </div>
    )
  };
}

export default App;
