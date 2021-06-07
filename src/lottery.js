import web3 from 'web3';

const address = '0xe948D06FB8669B80cbfB5Ed9516A1A1ce3166d78';

const abi = [
    {
        "constant":true,
        "inputs":[],
        "name":"manager",
        "outputs":[{"name":"","type":"address"}],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[],
        "name":"pickWinner",
        "outputs":[],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[],
        "name":"getPlayers",
        "outputs":[{"name":"","type":"address[]"}],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[],
        "name":"enterLottery",
        "outputs":[],
        "payable":true,
        "stateMutability":"payable",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[{"name":"","type":"uint256"}],
        "name":"players",
        "outputs":[{"name":"","type":"address"}],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "inputs":[],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"constructor"
    }
]

export default new web3.eth.Contract(abi, address);