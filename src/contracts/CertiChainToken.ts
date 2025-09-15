import { ethers } from "ethers";
import CertiChainTokenABI from "../contracts/CertifyRoles/CertiChainTokenABI.json";

// Dirección de tu contrato desplegado en la red correspondiente
const CERTICHAIN_TOKEN_ADDRESS = "0x5e57022c7dfE939456f2aad9B11153d6beAEC06D";
//const abi = CertiChainTokenABI.abi;

export function getCertiChainTokenContract(signerOrProvider: ethers.Signer | ethers.Provider) {
  return new ethers.Contract(CERTICHAIN_TOKEN_ADDRESS, CertiChainTokenABI.abi, signerOrProvider);
}