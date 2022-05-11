const { expect } = require("chai");
const { ethers } = require("hardhat");
const namehash = require('eth-ens-namehash');
const sha = require("js-sha3");

describe("ZNS Tests: ", () => {
    const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
    const ZERO_HASH = "0x0000000000000000000000000000000000000000000000000000000000000000";
    async function deployContracts() {
        console.log("deploying...");
        const ENSRegistry = await ethers.getContractFactory("ENSRegistry");
        ens = await ENSRegistry.deploy();
        console.log("Registry=>", ens.address);
        const BaseRegistrarImplementation = await ethers.getContractFactory("BaseRegistrarImplementation");
        registrar = await BaseRegistrarImplementation.deploy(ens.address, namehash.hash('0'));
        console.log("Registrar=>", registrar.address);
        await registrar.connect(owner).addController(ankit.address);
        await ens.connect(owner).setSubnodeOwner(ZERO_HASH, "0x" + sha.keccak256('0'), registrar.address)
        console.log("done...");
    }

    before(async () => {
        accounts = await ethers.getSigners();
        [
            owner,
            ankit, bhuvan, chitra, daksh, ekta, fateh, gagan, hari, isha,
            defaulter_1, defaulter_2, defaulter_3, defaulter_4,
            A, B, C, D, E, USDAO_whale] = accounts;
        await deployContracts();
    })


    it("mint a new domain for bhuvan ==> bhuvan.0 ", async () => {
        try {
            await registrar.connect(ankit).register("0x" + sha.keccak256('bhuvan'), bhuvan.address, 86400)
        } catch (err) {
            console.log(err);
        }
        console.log("Address output=>", await registrar.ownerOf("0x" + sha.keccak256('bhuvan')));
        expect(bhuvan.address).to.equal(await registrar.ownerOf("0x" + sha.keccak256('bhuvan')));
    })

})