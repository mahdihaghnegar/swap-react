// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "./MyTokenA.sol";
import "./MyTokenB.sol";

contract Swap {
    MyTokenA tokenA;
    MyTokenB tokenB;
    uint256 amountA;
    uint256 amountB;
    uint256 k;

    constructor(MyTokenA tA, MyTokenB tB) {
        tokenA = tA;
        tokenB = tB;
    }

    function getK() public view returns (uint256) {
        return k;
    }

    function startCreatePool(uint256 _amountA, uint256 _amountB) public {
        require(amountA == 0, "start with zero Amount tokenA");
        require(amountB == 0, "start with zero Amount tokenB");

        require(
            tokenA.balanceOf(msg.sender) >= _amountA,
            "Insufficient balance of token A"
        );
        require(
            tokenB.balanceOf(msg.sender) >= _amountB,
            "Insufficient balance of token B"
        );

        require(
            tokenA.allowance(msg.sender, address(this)) >= _amountA,
            "Insufficient allowance of token A"
        );
        require(
            tokenB.allowance(msg.sender, address(this)) >= _amountB,
            "Insufficient allowance of token B"
        );
        tokenA.transferFrom(msg.sender, address(this), _amountA);
        tokenB.transferFrom(msg.sender, address(this), _amountB);

        amountA = _amountA;
        amountB = _amountB;
        k = amountA * amountB;
    }

    function swapAtoB(uint256 amount) public {
        require(amount > 0, "Amount must be greater than zero");
        require(
            tokenA.balanceOf(msg.sender) >= amount,
            "Insufficient balance of token A"
        );

        require(
            tokenA.allowance(msg.sender, address(this)) >= amount,
            "Insufficient allowance of token A"
        );

        tokenA.transferFrom(msg.sender, address(this), amount);

        amountA += amount;
        uint256 _amountB = k / amountA;
        uint256 transfer = amountB - _amountB;

        tokenB.approve(msg.sender, transfer);
        tokenB.transfer(msg.sender, transfer);

        amountB = _amountB;
    }

    function perviewSwapAtoB(uint256 amount) public view returns (uint256) {
        uint256 _amountA = amountA + amount;
        uint256 _amountB = k / _amountA;
        uint256 transfer = amountB - _amountB;
        return transfer;
    }

    function swapBtoA(uint256 amount) public {
        require(amount > 0, "Amount must be greater than zero");
        require(
            tokenB.balanceOf(msg.sender) >= amount,
            "Insufficient balance of token B"
        );

        require(
            tokenB.allowance(msg.sender, address(this)) >= amount,
            "Insufficient allowance of token B"
        );

        tokenB.transferFrom(msg.sender, address(this), amount);

        amountB += amount;
        uint256 _amountA = k / amountB;
        uint256 transfer = amountA - _amountA;

        tokenA.approve(msg.sender, transfer);
        tokenA.transfer(msg.sender, transfer);

        amountA = _amountA;
    }

    function perviewSwapBtoA(uint256 amount) public view returns (uint256) {
        uint256 _amountB = amountB + amount;
        uint256 _amountA = k / _amountB;
        uint256 transfer = amountA - _amountA;
        return transfer;
    }
}
