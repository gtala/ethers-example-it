const { ethers } = require("ethers")

const ABI = [
    {
        "inputs": [],
        "name": "retrieve",
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
                "internalType": "uint256",
                "name": "num",
                "type": "uint256"
            }
        ],
        "name": "store",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

const contractAdress = '0x3921c2dEE4C31C2D7075f028FA1D2F759bf05422'

const privateKey = ''


const provider = ethers.providers.getDefaultProvider('sepolia')

const main = async ()=> {
    readBlockchain()
    //readSmartContract()
    //writeSmartContract()
}


const readBlockchain = async ()=> {
    console.log("hola mundo")

    
    const blockNumber = await provider.getBlockNumber()

    console.log('blockNumber', blockNumber)

    const balance = await provider.getBalance('0xeEB5fce994AaF685D0D396484e7943ba5A06bfd6')

    console.log('balance', balance.toString(), ethers.utils.formatEther(balance.toString()) )
}

const writeSmartContract = async ()=> {
    const wallet = new ethers.Wallet(privateKey, provider)
    const instance  = new ethers.Contract(contractAdress, ABI, wallet)
    console.log('Inicio la Tx')
    const tx = await instance.store(10)
    await tx.wait()
    console.log("Finalizo la Tx!")

}

const readSmartContract = async () => {
    const instance  = new ethers.Contract(contractAdress, ABI, provider)
    const value =  await instance.retrieve()
    console.log('value', value.toString())
}


main()