// This script is designed to test the solidity smart contract - Ownable.sol -- and the various functions within
// Declare a variable and assign the compiled smart contract artifact
var FairTradeCoffee = artifacts.require('FairTradeCoffee');

contract('FairTradeCoffee', function(accounts) {
    console.log("Contract Owner: accounts[0] ", accounts[0]);
    console.log("New Contract Owner: accounts[5] ", accounts[5]);

    describe('Ownable', () => {
        // 1st Test
        it("Testing smart contract function isOwner() that check if the calling address is the owner of the contract", async() => {
            const ftc = await FairTradeCoffee.deployed();
            
            const resultWithOwner = await ftc.isOwner({from: accounts[0]});
            const resultWithoutOwner = await ftc.isOwner({from: accounts[5]});        

            // Verify the result set
            assert.equal(resultWithOwner, true);        
            assert.equal(resultWithoutOwner, false); 
        });

        it("Testing smart contract function transferOwnership() that transfer ownership", async() => {
            const ftc = await FairTradeCoffee.deployed();

            const resultBeforeTransferring = await ftc.isOwner({from: accounts[5]});
            const { logs } = await ftc.transferOwnership(accounts[5], {from: accounts[0]});
            const resultAfterTransferring = await ftc.isOwner({from: accounts[5]});        

            // Verify the result set
            assert.equal(resultBeforeTransferring, false);        
            assert.equal(resultAfterTransferring, true);  
            assert.equal(logs[0].event, 'TransferOwnership');        
        });    

        it("Testing smart contract function renounceOwnership() that renounce ownerhip", async() => {
            const ftc = await FairTradeCoffee.deployed();

            const resultBeforeRenouncing = await ftc.isOwner({from: accounts[5]});
            const { logs } = await ftc.renounceOwnership({from: accounts[5]});
            const resultAfterRenouncing = await ftc.isOwner({from: accounts[5]});        

            // Verify the result set
            assert.equal(resultBeforeRenouncing, true);        
            assert.equal(resultAfterRenouncing, false);  
            assert.equal(logs[0].event, 'TransferOwnership');        
        });    
    });
});