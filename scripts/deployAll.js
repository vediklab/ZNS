async function main() {
  const ENSRegistry = await ethers.getContractFactory("ENSRegistry");
  const ens = await ENSRegistry.deploy();
  console.log(ens.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
