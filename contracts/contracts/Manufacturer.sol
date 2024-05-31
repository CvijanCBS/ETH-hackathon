// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

error NotApprovedToChangeOwnership();
error InvalidVIN();
error InvalidProductionDate();

/**
 * @title Manufacturer
 * @author VHistory
 * @dev Contract for managing vehicle production and ownership.
 */
contract Manufacturer is Ownable {

    event VehicleProduced(string indexed vin, uint256 productionDate, uint256 initialMileage, address wallet);
    event DataVerified(string indexed vin, bool isValid);
    event NewOwner(address indexed  newOwner);
    event NewWalletCreated(address indexed wallet, address owner);
    event CarInfoChanged(string vin);

    address public verifierContract;

    struct Vehicle {
        uint256 productionDate;
        uint256 initialMileage;
        address owner;
        address wallet;
    }

    mapping(string => Vehicle) public vehicles; // Mapping from VIN to Vehicle

    constructor(address _verifierContract, address owner) Ownable(owner) {
        verifierContract = _verifierContract;
    }

    /**
     * @notice Produces a new vehicle.
     * @param vin The Vehicle Identification Number (VIN) of the vehicle.
     * @param productionDate The production date of the vehicle.
     * @param owner The address of the vehicle owner.
     * @param initialMileage The initial mileage of the vehicle.
     * @dev Reverts if the VIN is not 17 characters long or if the production date is invalid.
     */
    function produceVehicle(string memory vin, uint256 productionDate, address owner, uint256 initialMileage) public onlyOwner {
        if(bytes(vin).length != 17 || vehicles[vin].owner != address(0x0)) {
            revert InvalidVIN();
        }

        if(productionDate > block.timestamp) {
            revert InvalidProductionDate();
        }
        
        address newWallet = createWallet(msg.sender);
        vehicles[vin] = Vehicle(productionDate, initialMileage, owner, newWallet);

        emit VehicleProduced(vin, productionDate, initialMileage, newWallet);
    }

    /**
     * @notice Creates a new wallet for a given owner.
     * @param _owner The address of the wallet owner.
     * @return The address of the newly created wallet.
     */
    function createWallet(address _owner) internal returns (address) {
        address newWallet = address(new Wallet(_owner));

        emit NewWalletCreated(newWallet, _owner);

        return newWallet;
    }

    /**
     * @notice Verifies data using the verifier contract.
     * @param vin The Vehicle Identification Number (VIN) of the vehicle.
     * @param data The data to be verified.
     */
    function verifyData(string memory vin, string memory data) public {
        bool isValid = DataVerifier(verifierContract).verifyData(data);
        emit DataVerified(vin, isValid);
    }

    /**
     * @notice Approves a new owner for a vehicle.
     * @param vin The Vehicle Identification Number (VIN) of the vehicle.
     * @param newOwner The address of the new owner.
     * @dev Reverts if the caller is not approved to change ownership.
     */
    function approveOwnership(string memory vin, address newOwner) public {
        Vehicle memory temp = getVehicleData(vin);

        if(bytes(vin).length != 17) {
            revert InvalidVIN();
        }

        if(temp.owner != msg.sender && temp.wallet != msg.sender) {
            revert NotApprovedToChangeOwnership();
        }

        vehicles[vin].owner = newOwner;

        emit NewOwner(newOwner);
    }

    /**
     * @notice Changes the information of a car.
     * @param vin The Vehicle Identification Number (VIN) of the car.
     * @param productionDate The production date of the car.
     * @param initialMileage The initial mileage of the car.
     * @dev Reverts if the VIN is not 17 characters long or if the production date is in the future.
     */
    function changeCarInfo(string memory vin, uint256 productionDate, uint256 initialMileage) public {
        if(bytes(vin).length != 17) {
            revert InvalidVIN();
        }

        if(productionDate > block.timestamp) {
            revert InvalidProductionDate();
        }

        vehicles[vin] = Vehicle(productionDate, initialMileage, msg.sender, msg.sender);

        emit CarInfoChanged(vin);
    }

    /**
     * @notice Retrieves vehicle data for a given VIN.
     * @param vin The Vehicle Identification Number (VIN) of the vehicle.
     * @return The Vehicle struct containing vehicle information.
     */
    function getVehicleData(string memory vin) public view returns(Vehicle memory) {
        return vehicles[vin];
    }
}

contract Wallet is Ownable {
 
    constructor(address wallet) Ownable(wallet) {}
}

contract DataVerifier {
    address public verifier;

    constructor(address _verifier) {
        verifier = _verifier;
    }

    function verifyData(string memory data) public view returns (bool) {
        // Implementation for data verification
        return true;
    }
}
