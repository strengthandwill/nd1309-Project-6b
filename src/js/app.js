App = {
    web3Provider: null,
    contracts: {},
    emptyAddress: "0x0000000000000000000000000000000000000000",
    sku: 0,
    upc: 0,
    metamaskAccountID: "0x0000000000000000000000000000000000000000",
    ownerID: "0x0000000000000000000000000000000000000000",
    originFarmerID: "0x0000000000000000000000000000000000000000",
    originFarmName: null,
    originFarmInformation: null,
    originFarmLatitude: null,
    originFarmLongitude: null,
    productNotes: null,
    productPrice: 0,
    distributorID: "0x0000000000000000000000000000000000000000",
    retailerID: "0x0000000000000000000000000000000000000000",
    consumerID: "0x0000000000000000000000000000000000000000",

    init: async function () {
        App.readForm();
        /// Setup access to blockchain
        return await App.initWeb3();
    },

    readForm: function () {
        App.sku = $("#sku").val();
        App.upc = $("#upc").val();
        App.ownerID = $("#ownerID").val();
        App.originFarmerID = $("#originFarmerID").val();
        App.originFarmName = $("#originFarmName").val();
        App.originFarmInformation = $("#originFarmInformation").val();
        App.originFarmLatitude = $("#originFarmLatitude").val();
        App.originFarmLongitude = $("#originFarmLongitude").val();
        App.productNotes = $("#productNotes").val();
        App.productPrice = $("#productPrice").val();
        App.distributorID = $("#distributorID").val();
        App.retailerID = $("#retailerID").val();
        App.consumerID = $("#consumerID").val();
        App.acFarmerID = $("#acFarmerID").val();
        App.acDistributorID = $("#acDistributorID").val();
        App.acRetailerID = $("#acRetailerID").val();
        App.acConsumerID = $("#acConsumerID").val();
        App.newOwner = $("#newOwner").val();

        console.log(
            App.sku,
            App.upc,
            App.ownerID, 
            App.originFarmerID, 
            App.originFarmName, 
            App.originFarmInformation, 
            App.originFarmLatitude, 
            App.originFarmLongitude, 
            App.productNotes, 
            App.productPrice, 
            App.distributorID, 
            App.retailerID, 
            App.consumerID,
            App.acFarmerID,
            App.acDistributorID,
            App.acRetailerID,
            App.acConsumerID,
            App.newOwner
        );
    },

    initWeb3: async function () {
        /// Find or Inject Web3 Provider
        /// Modern dapp browsers...
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }

        App.getMetaskAccountID();

        return App.initFairTradeCoffee();
    },

    getMetaskAccountID: function () {
        web3 = new Web3(App.web3Provider);

        // Retrieving accounts
        web3.eth.getAccounts(function(err, res) {
            if (err) {
                console.log('Error:',err);
                return;
            }
            console.log('getMetaskID:',res);
            App.metamaskAccountID = res[0];
        })
    },

    initFairTradeCoffee: function () {
        /// Source the truffle compiled smart contracts
        var jsonFairTradeCoffee='../../build/contracts/FairTradeCoffee.json';
        
        /// JSONfy the smart contracts
        $.getJSON(jsonFairTradeCoffee, function(data) {
            console.log('data',data);
            var FairTradeCoffeeArtifact = data;
            App.contracts.FairTradeCoffee = TruffleContract(FairTradeCoffeeArtifact);
            App.contracts.FairTradeCoffee.setProvider(App.web3Provider);
            
            App.fetchItemBufferOne();
            App.fetchItemBufferTwo();
            App.fetchEvents();

        });

        return App.bindEvents();
    },

    bindEvents: function() {
        $(document).on('click', App.handleButtonClick);
    },

    handleButtonClick: async function(event) {
        // event.preventDefault();

        App.getMetaskAccountID();
        App.readForm();

        var processId = parseInt($(event.target).data('id'));
        console.log('processId',processId);

        switch(processId) {
            case 1:
                return await App.harvestItem(event);
                break;
            case 2:
                return await App.processItem(event);
                break;
            case 3:
                return await App.packItem(event);
                break;
            case 4:
                return await App.sellItem(event);
                break;
            case 5:
                return await App.buyItem(event);
                break;
            case 6:
                return await App.shipItem(event);
                break;
            case 7:
                return await App.receiveItem(event);
                break;
            case 8:
                return await App.purchaseItem(event);
                break;
            case 9:
                return await App.fetchItemBufferOne(event);
                break;
            case 10:
                return await App.fetchItemBufferTwo(event);
                break;
            case 11:
                return await App.addFarmer(event);
                break;                
            case 12:
                return await App.renounceFarmer(event);
                break;                         
            case 13:
                return await App.addDistributor(event);
                break;                
            case 14:
                return await App.renounceDistributor(event);
                break;                                                
            case 15:
                return await App.addRetailer(event);
                break;                
            case 16:
                return await App.renounceRetailer(event);
                break;                                                                                                 
            case 17:
                return await App.addConsumer(event);
                break;                
            case 18:
                return await App.renounceConsumer(event);
                break; 
            case 19:
                return await App.transferOwnership(event);
                break;                
            case 20:
                return await App.renounceOwnership(event);
                break;    
            case 21:
                return await App.upload(event);
                break;                             
            }
    },

    harvestItem: function(event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.FairTradeCoffee.deployed().then(function(instance) {
            return instance.harvestItem(
                App.upc, 
                App.metamaskAccountID, 
                App.originFarmName, 
                App.originFarmInformation, 
                App.originFarmLatitude, 
                App.originFarmLongitude, 
                App.productNotes,
                {from: App.metamaskAccountID}
            );
        }).then(function(result) {
            $("#ftc-item").text(JSON.stringify(result, undefined, 2));
            console.log('harvestItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    processItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.FairTradeCoffee.deployed().then(function(instance) {
            return instance.processItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(JSON.stringify(result, undefined, 2));
            console.log('processItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },
    
    packItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));        

        App.contracts.FairTradeCoffee.deployed().then(function(instance) {
            console.log('packItem');
            return instance.packItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(JSON.stringify(result, undefined, 2));
            console.log('packItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    sellItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.FairTradeCoffee.deployed().then(function(instance) {
            const productPrice = web3.toWei(App.productPrice, "ether");
            return instance.sellItem(App.upc, App.productPrice, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(JSON.stringify(result, undefined, 2));
            console.log('sellItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    buyItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.FairTradeCoffee.deployed().then(function(instance) {
            const walletValue = web3.toWei(App.productPrice, "ether");
            return instance.buyItem(App.upc, {from: App.metamaskAccountID, value: walletValue});
        }).then(function(result) {
            $("#ftc-item").text(JSON.stringify(result, undefined, 2));
            console.log('buyItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    shipItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.FairTradeCoffee.deployed().then(function(instance) {
            return instance.shipItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(JSON.stringify(result, undefined, 2));
            console.log('shipItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    receiveItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.FairTradeCoffee.deployed().then(function(instance) {
            return instance.receiveItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(JSON.stringify(result, undefined, 2));
            console.log('receiveItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    purchaseItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.FairTradeCoffee.deployed().then(function(instance) {
            return instance.purchaseItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(JSON.stringify(result, undefined, 2));
            console.log('purchaseItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    fetchItemBufferOne: function () {
    ///   event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
        App.upc = $('#upc').val();
        console.log('upc',App.upc);

        App.contracts.FairTradeCoffee.deployed().then(function(instance) {
          return instance.fetchItemBufferOne(App.upc);
        }).then(function(result) {
          $("#ftc-item").text(JSON.stringify(result, undefined, 2));
          console.log('fetchItemBufferOne', result);          
        }).catch(function(err) {
          console.log(err.message);
        });
    },

    fetchItemBufferTwo: function () {
    ///    event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
                        
        App.contracts.FairTradeCoffee.deployed().then(function(instance) {
          return instance.fetchItemBufferTwo.call(App.upc);
        }).then(function(result) {
          $("#ftc-item").text(JSON.stringify(result, undefined, 2));
          console.log('fetchItemBufferTwo', result);
        }).catch(function(err) {
          console.log(err.message);
        });
    },

    fetchEvents: function () {
        if (typeof App.contracts.FairTradeCoffee.currentProvider.sendAsync !== "function") {
            App.contracts.FairTradeCoffee.currentProvider.sendAsync = function () {
                return App.contracts.FairTradeCoffee.currentProvider.send.apply(
                App.contracts.FairTradeCoffee.currentProvider,
                    arguments
              );
            };
        }

        App.contracts.FairTradeCoffee.deployed().then(function(instance) {
        var events = instance.allEvents(function(err, log){
          if (!err)
            $("#ftc-events").append('<li>' + log.event + ' - ' + log.transactionHash + '</li>');
        });
        }).catch(function(err) {
          console.log(err.message);
        });
        
    },

    addFarmer: function () {
        ///   event.preventDefault();
        ///    var processId = parseInt($(event.target).data('id'));

        App.acFarmerID = $('#acFarmerID').val();
        console.log('acFarmerID',App.acFarmerID);

        if (App.acFarmerID != null && App.acFarmerID != '') {
            App.contracts.FairTradeCoffee.deployed().then(function(instance) {
                return instance.addFarmer(App.acFarmerID, {from: App.metamaskAccountID});
            }).then(function(result) {
                $("#ftc-item").text(JSON.stringify(result, undefined, 2));
                console.log('addFarmer', result);          
            }).catch(function(err) {
                console.log(err.message);
            });
        }
    },

    renounceFarmer: function () {
        ///   event.preventDefault();
        ///    var processId = parseInt($(event.target).data('id'));
        
        App.contracts.FairTradeCoffee.deployed().then(function(instance) {
            return instance.renounceFarmer({from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(JSON.stringify(result, undefined, 2));
            console.log('renounceFarmer', result);          
        }).catch(function(err) {
            console.log(err.message);
        });        
    },

    addDistributor: function () {
        ///   event.preventDefault();
        ///    var processId = parseInt($(event.target).data('id'));
        
        App.acDistributorID = $('#acDistributorID').val();
        console.log('acDistributorID',App.acDistributorID);        
            
        if (App.acDistributorID != null && App.acDistributorID != '') {
            App.contracts.FairTradeCoffee.deployed().then(function(instance) {            
                return instance.addDistributor(App.acDistributorID, {from: App.metamaskAccountID});
            }).then(function(result) {
                $("#ftc-item").text(JSON.stringify(result, undefined, 2));
                console.log('addDistributor', result);          
            }).catch(function(err) {
                console.log(err.message);
            });
        }
    },

    renounceDistributor: function () {
        ///   event.preventDefault();
        ///    var processId = parseInt($(event.target).data('id'));

        console.log("------------ Hello");
        console.log(App.metamaskAccountID);

        App.contracts.FairTradeCoffee.deployed().then(function(instance) {
            return instance.renounceDistributor({from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(JSON.stringify(result, undefined, 2));
            console.log('RenounceDistributor', result);          
        }).catch(function(err) {
            console.log(err.message);
        });        
    },

    addRetailer: function () {
        ///   event.preventDefault();
        ///    var processId = parseInt($(event.target).data('id'));

        App.acRetailerID = $('#acRetailerID').val();
        console.log('acRetailerID',App.acRetailerID);

        if (App.acConsumerID != null && App.acConsumerID != '') {
            App.contracts.FairTradeCoffee.deployed().then(function(instance) {                
                return instance.addRetailer(App.acRetailerID, {from: App.metamaskAccountID});
            }).then(function(result) {
                $("#ftc-item").text(JSON.stringify(result, undefined, 2));
                console.log('AddRetailer', result);          
            }).catch(function(err) {
                console.log(err.message);
            });
        }
    },

    renounceRetailer: function () {
        ///   event.preventDefault();
        ///    var processId = parseInt($(event.target).data('id'));

        App.contracts.FairTradeCoffee.deployed().then(function(instance) {
            return instance.renounceRetailer({from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(JSON.stringify(result, undefined, 2));
            console.log('RenounceRetailer', result);          
        }).catch(function(err) {
            console.log(err.message);
        });        
    },

    addConsumer: function () {
        ///   event.preventDefault();
        ///    var processId = parseInt($(event.target).data('id'));

        App.acConsumerID = $('#acConsumerID').val(); 
        console.log('acConsumerID',App.acConsumerID);

        if (App.acRetailerID != null && App.acRetailerID != '') {
            App.contracts.FairTradeCoffee.deployed().then(function(instance) {                
                return instance.addConsumer(App.acConsumerID, {from: App.metamaskAccountID});
            }).then(function(result) {
                $("#ftc-item").text(JSON.stringify(result, undefined, 2));
                console.log('AddConsumer', result);          
            }).catch(function(err) {
                console.log(err.message);
            });
        }
    },  
    
    renounceConsumer: function () {
        ///   event.preventDefault();
        ///    var processId = parseInt($(event.target).data('id'));

        App.contracts.FairTradeCoffee.deployed().then(function(instance) {
            return instance.renounceConsumer({from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(JSON.stringify(result, undefined, 2));
            console.log('RenounceConsumer', result);          
        }).catch(function(err) {
            console.log(err.message);
        });        
    },

    transferOwnership: function () {
        ///   event.preventDefault();
        ///    var processId = parseInt($(event.target).data('id'));

        App.newOwner = $('#newOwner').val(); 
        console.log('newOwner',App.newOwner);

        if (App.newOwner != null && App.newOwner != '') {
            App.contracts.FairTradeCoffee.deployed().then(function(instance) {                
                return instance.transferOwnership(App.newOwner, {from: App.metamaskAccountID});
            }).then(function(result) {
                $("#ftc-item").text(JSON.stringify(result, undefined, 2));
                console.log('TransferOwnership', result);          
            }).catch(function(err) {
                console.log(err.message);
            });
        }
    },  
    
    renounceOwnership: function () {
        ///   event.preventDefault();
        ///    var processId = parseInt($(event.target).data('id'));

        App.contracts.FairTradeCoffee.deployed().then(function(instance) {
            return instance.renounceOwnership({from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(JSON.stringify(result, undefined, 2));
            console.log('RenounceOwnership', result);          
        }).catch(function(err) {
            console.log(err.message);
        });        
    },

    upload: function() {  }
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});
