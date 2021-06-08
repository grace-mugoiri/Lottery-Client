import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {
  state = { 
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: ''
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance })
  }

  onSubmit = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on Transaction success...'});

    try {
      await lottery.methods.enterLottery().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });
    this.setState({ message: 'You have been entered!'});
  } catch (error) {
    this.setState({ message: 'Waiting'})
  }
  this.setState({ message: 'User rejected transaction'})
  };


  onClick = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...'});
    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    this.setState({ message: 'A winner has been picked.'});

  }

  render() {
    return (
      <div className="section">
        <section className="section">
          <h2 className="lottery">The Lottery Contract</h2>
          <p id="para">This Contract is managed by: { this.state.manager}</p>
          
          <p id="para">There are currently -  <strong>{this.state.players.length} </strong> - people entered. 
          Competing to win: {web3.utils.fromWei(this.state.balance, 'ether')} Ether! </p>
          <hr />

          <form onSubmit={this.onSubmit}>
            <h3 className="lottery">Want to try your luck?</h3>
            <div>
              <label id="para">Amount of Ether to enter</label>
              <input
                placeholder="ether"
                id="input"
                value={this.state.value}
                onChange={ event => this.setState({ value: event.target.value })}
              />
            </div>
            <button id="enter">Enter</button>
          </form>
          <hr />
          <h3 className="lottery">ready to pick a winner?</h3>
          <button onClick={this.onClick} id="enter">Pick a winner</button>
          <hr />
          <h1>{this.state.message}</h1>
          
        </section>
      </div>
    )
  };
}

export default App;
