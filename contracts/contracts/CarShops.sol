// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./Manufacturer.sol";

/**
 * @title CarShops
 * @author VHistory
 * @dev Contract for managing car shops and vehicle services.
 */
contract CarShops {

    event CarShopRegistered(address indexed shopAddress, string shopName);
    event AddServiceData(string indexed vin);

    enum Brands {
        BMW,
        AUDI,
        FIAT,
        RENAULT,
        PAGANI,
        KOENIGSEGG
    }

    enum Services {
        OIL_CHANGE,
        OIL_FILTER_CHANGE,
        AIR_FILTER_CHANGE,
        FUEL_FILTER_CHANGE,
        CABIN_FILTER_CHANGE
    }

    struct VehicleService {
        string vin;
        uint256 date;
        address who;
        Services[] service;
        uint256 mileage;
    }

    struct CarShop {
        string name;
        string location;
        Brands[] brands;
        bool verified;
    }

    Manufacturer public manufacturer;
    VehicleService[] public vehicleServices;
    mapping (address => CarShop) public carShops;

    modifier ValidVIN(string memory vin) {
        address carWalletAddress = manufacturer.getVehicleData(vin).wallet;
        require(carWalletAddress != address(0x0), "Invalid VIN");
        _;
    }

    constructor(address _manufacturer) {
        manufacturer = Manufacturer(_manufacturer);
    }

    /**
     * @notice Registers a new car shop.
     * @param name The name of the car shop.
     * @param location The location of the car shop.
     * @param brands The brands serviced by the car shop.
     * @dev This function creates a new entry in the carShops mapping.
     */
    function registerCarShop(string memory name, string memory location, Brands[] memory brands) public {
        // call manufacturer for validating data
        // bool verified = manufacturer.verifyData(vin, data);
        bool verified;

        carShops[msg.sender] = CarShop(name, location, brands, verified);

        emit CarShopRegistered(msg.sender, name);
    }

    /**
     * @notice Records service data for a vehicle.
     * @param vin The Vehicle Identification Number (VIN) of the vehicle.
     * @param services The list of services performed.
     * @param mileage The mileage of the vehicle at the time of service.
     * @dev This function adds a new entry to the vehicleServices array.
     * @dev Reverts if the VIN is invalid.
     */
    function writeServiceData(string memory vin, Services[] memory services, uint256 mileage) public ValidVIN(vin) {
        vehicleServices.push(VehicleService(vin, block.timestamp, msg.sender, services, mileage));

        // manufacturer.verifyData(vin, data);

        emit AddServiceData(vin);
    }

}