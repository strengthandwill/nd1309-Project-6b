// This script is designed to test the solidity smart contract - SuppyChain.sol -- and the various functions within
// Declare a variable and assign the compiled smart contract artifact
var FarmerRole = artifacts.require('FarmerRole');
var DistributorRole = artifacts.require('DistributorRole');
var RetailerRole = artifacts.require('RetailerRole');
var ConsumerRole = artifacts.require('ConsumerRole');

contract('FarmerRole DistributorRole RetailerRole ConsumerRole', function(accounts) {
    console.log("ganache-cli accounts used here...")
    console.log("Contract Owner: accounts[0] ", accounts[0])
    console.log("Farmer: accounts[1] ", accounts[1])
    console.log("Distributor: accounts[2] ", accounts[2])
    console.log("Retailer: accounts[3] ", accounts[3])
    console.log("Consumer: accounts[4] ", accounts[4])

    describe('FarmerRole', () => {
        // 1st Test
        it("Testing smart contract function addFarmer() that adds this role", async() => {
            const farmerRole = await FarmerRole.deployed();

            const resultBeforeAdding = await farmerRole.isFarmer(accounts[1]);
            const { logs } = await farmerRole.addFarmer(accounts[1]);;
            const resultAfterAdding = await farmerRole.isFarmer(accounts[1]);        

            // Verify the result set
            assert.equal(resultBeforeAdding, false);        
            assert.equal(resultAfterAdding, true);  
            assert.equal(logs[0].event, 'FarmerAdded');
        });     

        // 2nd Test
        it("Testing smart contract function isFarmer() that to check this role", async() => {
            const farmerRole = await FarmerRole.deployed();        
            
            const resultWithRole = await farmerRole.isFarmer(accounts[1]);
            const resultWithoutRole = await farmerRole.isFarmer(accounts[2]);        

            // Verify the result set
            assert.equal(resultWithRole, true);        
            assert.equal(resultWithoutRole, false);                
        });   

        // 3rd Test
        it("Testing smart contract function renounceFarmer() to remove this role", async() => {
            const farmerRole = await FarmerRole.deployed();

            const resultBeforeAdding = await farmerRole.isFarmer(accounts[1]);
            const { logs } = await farmerRole.renounceFarmer({from: accounts[1]});
            const resultAfterAdding = await farmerRole.isFarmer(accounts[1]);        

            // Verify the result set
            assert.equal(resultBeforeAdding, true);        
            assert.equal(resultAfterAdding, false);  
            assert.equal(logs[0].event, 'FarmerRemoved');
        });   
    }); 

    describe('DistributorRole', () => {
        // 1st Test
        it("Testing smart contract function addDistributor() that adds this role", async() => {
            const distributorRole = await DistributorRole.deployed();

            const resultBeforeAdding = await distributorRole.isDistributor(accounts[2]);
            const { logs } = await distributorRole.addDistributor(accounts[2]);;
            const resultAfterAdding = await distributorRole.isDistributor(accounts[2]);        

            // Verify the result set
            assert.equal(resultBeforeAdding, false);        
            assert.equal(resultAfterAdding, true);  
            assert.equal(logs[0].event, 'DistributorAdded');
        });     

        // 2nd Test
        it("Testing smart contract function isDistributor() that to check this role", async() => {
            const distributorRole = await DistributorRole.deployed();        
            
            const resultWithRole = await distributorRole.isDistributor(accounts[2]);
            const resultWithoutRole = await distributorRole.isDistributor(accounts[1]);        

            // Verify the result set
            assert.equal(resultWithRole, true);        
            assert.equal(resultWithoutRole, false);            
        });   

        // 3rd Test
        it("Testing smart contract function renounceDistributor() to remove this role", async() => {
            const distributorRole = await DistributorRole.deployed();

            const resultBeforeAdding = await distributorRole.isDistributor(accounts[2]);
            const { logs } = await distributorRole.renounceDistributor({from: accounts[2]});
            const resultAfterAdding = await distributorRole.isDistributor(accounts[2]);        

            // Verify the result set
            assert.equal(resultBeforeAdding, true);        
            assert.equal(resultAfterAdding, false);  
            assert.equal(logs[0].event, 'DistributorRemoved');
        });   
    });    

    describe('RetailerRole', () => {
        // 1st Test
        it("Testing smart contract function addRetailer() that adds this role", async() => {
            const retailerRole = await RetailerRole.deployed();

            const resultBeforeAdding = await retailerRole.isRetailer(accounts[3]);
            const { logs } = await retailerRole.addRetailer(accounts[3]);;
            const resultAfterAdding = await retailerRole.isRetailer(accounts[3]);        

            // Verify the result set
            assert.equal(resultBeforeAdding, false);        
            assert.equal(resultAfterAdding, true);  
            assert.equal(logs[0].event, 'RetailerAdded');
        });     

        // 2nd Test
        it("Testing smart contract function isRetailer() that to check this role", async() => {
            const retailerRole = await RetailerRole.deployed();        
            
            const resultWithRole = await retailerRole.isRetailer(accounts[3]);
            const resultWithoutRole = await retailerRole.isRetailer(accounts[1]);        

            // Verify the result set
            assert.equal(resultWithRole, true);        
            assert.equal(resultWithoutRole, false);            
        });   

        // 3rd Test
        it("Testing smart contract function renounceRetailer() to remove this role", async() => {
            const retailerRole = await RetailerRole.deployed();

            const resultBeforeAdding = await retailerRole.isRetailer(accounts[3]);
            const { logs } = await retailerRole.renounceRetailer({from: accounts[3]});;
            const resultAfterAdding = await retailerRole.isRetailer(accounts[3]);        

            // Verify the result set
            assert.equal(resultBeforeAdding, true);        
            assert.equal(resultAfterAdding, false);  
            assert.equal(logs[0].event, 'RetailerRemoved');
        });   
    });     

    describe('ConsumerRole', () => {
        // 1st Test
        it("Testing smart contract function addConsumer() that adds this role", async() => {
            const consumerRole = await ConsumerRole.deployed();

            const resultBeforeAdding = await consumerRole.isConsumer(accounts[4]);
            const { logs } = await consumerRole.addConsumer(accounts[4]);
            const resultAfterAdding = await consumerRole.isConsumer(accounts[4]);        

            // Verify the result set
            assert.equal(resultBeforeAdding, false);        
            assert.equal(resultAfterAdding, true);  
            assert.equal(logs[0].event, 'ConsumerAdded');
        });     

        // 2nd Test
        it("Testing smart contract function isConsumer() that to check this role", async() => {
            const consumerRole = await ConsumerRole.deployed();        
            
            const resultWithRole = await consumerRole.isConsumer(accounts[4]);
            const resultWithoutRole = await consumerRole.isConsumer(accounts[1]);        

            // Verify the result set
            assert.equal(resultWithRole, true);        
            assert.equal(resultWithoutRole, false);            
        });   

        // 3rd Test
        it("Testing smart contract function renounceConsumer() to remove this role", async() => {
            const consumerRole = await ConsumerRole.deployed();

            const resultBeforeAdding = await consumerRole.isConsumer(accounts[4]);
            const { logs } = await consumerRole.renounceConsumer({from: accounts[4]});;
            const resultAfterAdding = await consumerRole.isConsumer(accounts[4]);        

            // Verify the result set
            assert.equal(resultBeforeAdding, true);        
            assert.equal(resultAfterAdding, false);  
            assert.equal(logs[0].event, 'ConsumerRemoved');
        });   
    }); 
});

