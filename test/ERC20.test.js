const ERC20_ALTAYB = artifacts.require('./ERC20_ALTAYB');
require('chai').use(require('chai-as-promised')).should()

contract("ERC20_ALTAYB",([owner ,receiver])=>{
    let token;
        beforeEach( async ()=>{
            token = await ERC20_ALTAYB.new();
        })

        describe("Deployment", ()=>{

            it("Track the token name", async ()=>{
                const result = await token.name();
                result.should.equal("Altayb")
            }),

            it("Track the symbol", async ()=>{
                const result = await token.symbol();
                result.should.equal("ATB")
            }),

            it("Track the decimals", async ()=>{
                const result = await token.decimals();
                result.toString().should.equal("10")
            }),

            it("Track the totalSupply", async ()=>{
                const result = await token.totalSupply();
                result.toString().should.equal("20000000000000")
            })
        })

        describe("transfer token",async()=>{

            it("cheack token balances",async()=>{
                let balanceOf 
                //balanceof before transfare
                balanceOf = await token.balanceOf(owner)
                console.log("the owner balance is >>>>>>>>>>>",balanceOf.toString())
                /////////////////////////////////////////////////
                balanceOf = await token.balanceOf(receiver)
                console.log("the receiver balance is >>>>>>>>>>>",balanceOf.toString())

                //start transfer 
                await token.transfer(receiver,"20000000000000",{from:owner})

                //balanceof after transfare
                balanceOf = await token.balanceOf(owner)
                console.log("the owner balance after is **********",balanceOf.toString())
                /////////////////////////////////////////////////
                balanceOf = await token.balanceOf(receiver)
                console.log("the receiver balance after is *********",balanceOf.toString())

            })
            it("emit the transfer",async()=>{
                const result = await token.transfer(receiver,"20000000000000",{from:owner});
                const log = result.logs[0];
                log.event.should.equal("Transfer");
                console.log(log.args._from.toString());
                log.args._from.toString().should.equal(owner);
            })
            it("ivalid reciver",async()=>{
                await token.transfer(0x0,"20000000000000",{from:owner}).should.be.rejected
            })
            it("invalid owner balance",async()=>{
                await token.transfer(receiver,"20000000000000",{from:receiver}).should.be.rejected
            })

        })




})