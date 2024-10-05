// Connect to the local Hardhat blockchain
const web3 = new Web3('http://127.0.0.1:8545');

// Replace this ABI with the ABI from the compiled contract (artifacts)
const abi = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_initialSupply",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// Replace with your deployed contract address
const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
const tokenContract = new web3.eth.Contract(abi, contractAddress);

//Get total supply
async function getSupply() {
    const supply = await tokenContract.methods.totalSupply().call();
    document.getElementById("supply").innerText = `Total supply: ${supply}`;
}

// Check balance
async function getBalance() {
    const address = document.getElementById("address").value;
    try {
    const balance = await tokenContract.methods.balanceOf(address).call();
      document.getElementById("balance").innerText = `Balance: ${balance}`;
    } catch {
      document.getElementById("balance").innerText = `Invalid address`;
    }
}

// Transfer tokens
async function transferTokens() {
    const recipient = document.getElementById("recipient").value;
    const sender = document.getElementById("sender").value;
    const amount = document.getElementById("amount").value;

    const accounts = await web3.eth.getAccounts();
    try {
      await tokenContract.methods.transfer(recipient, amount).send({ from: sender });
      document.getElementById("transactionResult").innerText = "Transfer Successful!";
    } catch {
      document.getElementById("transactionResult").innerText = "Transfer Failed!";
      alert("Check addresses and make sure sender has sufficient funds");
    }

}

// Connect to metamask <NOT WORKING>
async function connectMetamask() {
/*/
    if(window.etherium) {
      web3 = new Web3(window.etherium);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      userAccount = (await web3.eth.getAccounts())[0];
      document.getElementById('connectButton').style.display = 'none';
      const balance = getBalance();
      document.getElementById("connection").innerText = `Connected to Metamask with ballance of ${balance}`;
    }else {
      alert('Metamask not installed.')
    }
/*/
    alert('Function not properly implemented.')
/**/
}

window.onload = getSupply();
