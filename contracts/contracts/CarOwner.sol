// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./Manufacturer.sol";

/**
 * @title CarOwner
 * @author VHistory
 * @dev Contract for car owners to interact with the Manufacturer contract.
 */
contract CarOwner {
    Manufacturer public manufacturer;

    constructor(address _manufacturer) {
        manufacturer = Manufacturer(_manufacturer);
    }

    /**
     * @notice Changes the information of a car.
     * @param vin The Vehicle Identification Number (VIN) of the car.
     * @param productionDate The production date of the car.
     * @param initialMileage The initial mileage of the car.
     * @dev This function calls the changeCarInfo function in the Manufacturer contract.
     */
    function changeCarInfo(string memory vin, uint256 productionDate, uint256 initialMileage) public {
       manufacturer.changeCarInfo(vin, productionDate, initialMileage);
    }

    /**
     * @notice Requests a change of ownership for a car.
     * @param vin The Vehicle Identification Number (VIN) of the car.
     * @param newOwner The address of the new owner.
     * @dev This function calls the approveOwnership function in the Manufacturer contract.
     */
    function requestOwnershipChange(string memory vin, address newOwner) public {
        manufacturer.approveOwnership(vin, newOwner);
    }
}