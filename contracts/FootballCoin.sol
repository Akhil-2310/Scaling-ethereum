
// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract FootballCoin is ERC20, Ownable, ERC20Permit {
	constructor(
		address initialOwner
	) ERC20("FootballCoin", "FBC") Ownable(initialOwner) ERC20Permit("FootballCoin") {}

	function mint(address to, uint256 amount) public {
		_mint(to, amount);
	}

	function userBalanceOf(address user) public view returns (uint256) {
		return balanceOf(user);
	}
}
