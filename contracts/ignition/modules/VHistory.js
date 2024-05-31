const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const VERIFIER = "0x66fF3184f1ECFDC03110a26A222E565974180196";
const OWNER = "0x7476aFa3f3de67536DA7B6dAD77bcCf41FFC9717";

module.exports = buildModule("VHistoryModule", (m) => {

  const verifier = m.getParameter("DataVerifier", VERIFIER);
  const dataVerifier = m.contract("DataVerifier", [verifier], {});

  const owner = m.getParameter("Manufacturer", OWNER);
  const manufacturer = m.contract("Manufacturer", [verifier, owner]);

  const carOwner = m.contract("CarOwner", [manufacturer]);
  const carShops = m.contract("CarShops", [manufacturer]);

  return { dataVerifier, manufacturer, carOwner, carShops };
  // return {dataVerifier, manufacturer}

});
