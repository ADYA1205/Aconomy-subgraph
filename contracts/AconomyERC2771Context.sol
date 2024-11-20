// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.7.0) (metatx/ERC2771Context.sol)

pragma solidity 0.8.11;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

/**
 * @dev Context variant with ERC2771 support.
 */
// copied from https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/metatx/ERC2771Context.sol
contract AconomyERC2771Context is OwnableUpgradeable {
    mapping(address => bool) public trustedForwarders;

    // Initializes the contract and sets the trusted forwarder
    function AconomyERC2771Context_init(address tfGelato) internal onlyInitializing {
        trustedForwarders[tfGelato] = true;
        __Ownable_init();
    }

    // Check if the provided address is a trusted forwarder
    function isTrustedForwarder(address forwarder)
        public
        view
        virtual
        returns (bool)
    {
        return trustedForwarders[forwarder];
    }

    // Override _msgSender to extract the original sender from the forwarded call
    function _msgSender()
        internal
        view
        virtual
        override
        returns (address sender)
    {
        if (isTrustedForwarder(msg.sender)) {
            // Extract sender address from the end of calldata (EIP-2771)
            assembly {
                sender := shr(96, calldataload(sub(calldatasize(), 20)))
            }
        } else {
            return super._msgSender();
        }
    }

    // Override _msgData to handle data correctly for meta-transactions
    function _msgData()
        internal
        view
        virtual
        override
        returns (bytes calldata)
    {
        if (isTrustedForwarder(msg.sender)) {
            return msg.data[:msg.data.length - 20]; // Return calldata minus the last 20 bytes (address)
        } else {
            return super._msgData();
        }
    }

    // Add a new trusted forwarder
    function addTrustedForwarder(address _tf) external onlyOwner {
        trustedForwarders[_tf] = true;
    }

    // Remove a trusted forwarder
    function removeTrustedForwarder(address _tf) external onlyOwner {
        trustedForwarders[_tf] = false;
    }

    // Set a new trusted forwarder (e.g., Biconomy's trusted forwarder)
    function setBiconomyTrustedForwarder(address _biconomyForwarder) external onlyOwner {
        trustedForwarders[_biconomyForwarder] = true;
    }
}
