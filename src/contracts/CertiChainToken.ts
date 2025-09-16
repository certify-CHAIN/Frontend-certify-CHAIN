import { ethers } from "ethers";
import CertiChainTokenABI from "../contracts/CertifyRoles/CertiChainTokenABI.json";

// Dirección de tu contrato desplegado en la red correspondiente
const CERTICHAIN_TOKEN_ADDRESS = "0x3942A2e611Cd2C8272Ae9C05A40001aF1903d1aD";
//const abi = CertiChainTokenABI.abi;

export function getCertiChainTokenContract(signerOrProvider: ethers.Signer | ethers.Provider) {
  return new ethers.Contract(CERTICHAIN_TOKEN_ADDRESS, CertiChainTokenABI.abi, signerOrProvider);
}