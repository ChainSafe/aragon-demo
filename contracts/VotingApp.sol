pragma solidity ^0.4.24;

import "@aragon/os/contracts/apps/AragonApp.sol";
import "@aragon/os/contracts/lib/math/SafeMath.sol";
import "@aragon/os/contracts/acl/ACL.sol";

contract VotingApp is AragonApp {

    uint startTime;
    uint endTime;
    uint votesFor;
    uint votesAgainst;
    string location;

    bytes32 constant public ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 constant public VOTER_ROLE = keccak256("VOTER_ROLE");

    mapping(address => uint) public addressToVoterId;
    mapping(uint => bool) public voterIdToResult;
    uint votingIndex; 

    function intialize(uint _startTime, uint _endTime, string _location) onlyInit public {
        require(_startTime < _endTime, "End time is invalid");
        startTime = _startTime;
        endTime = _endTime;
        location = _location;
        votingIndex = 0;
        initialized();
    }

    function addVoter(address _voter, address _ACLAddress) public auth(ADMIN_ROLE) {  
        ACL acl = ACL(_ACLAddress);      
        acl.grantPermission(_voter, address(this), VOTER_ROLE);
    }

    function vote(bool vote) public auth(VOTER_ROLE) {
        require(now < endTime, "Vote has ended.");
        require(addressToVoterId[msg.sender] == 0);
        addressToVoterId[msg.sender] = votingIndex + 1;
        voterIdToResult[addressToVoterId[msg.sender]] = vote;
        votingIndex += 1;
        vote ? votesFor++ : votesAgainst++;
    }

    function getResult() public returns(bool) {
        return votesFor > votesAgainst;
    }

}