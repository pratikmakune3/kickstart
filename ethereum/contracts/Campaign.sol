pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}


contract Campaign {
    struct Request {
        string description;
        uint value;
        address recepient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    
    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    // address[] public approvers;  Refactoring, array -> mapping
    mapping(address => bool) public approvers;
    uint public approversCount;
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    constructor(uint minimum, address creator) public{
        manager = creator;
        minimumContribution = minimum;
    }
    
    function contribute(uint contribution) public payable {
        require(contribution > minimumContribution);
        // approvers.push(msg.sender);
        approvers[msg.sender] = true;
        approversCount++;
    }
    
    function createRequest(string description, uint value, address recepient)
        public restricted 
    {
        Request memory newRequest = Request({
            description : description,
            value : value,
            recepient : recepient,
            complete : false,
            approvalCount : 0
            // We need to initalize only value types vars and not ref. types
            // hence, not initalizing var approvals
        });
        
        // Alternative syntax not recommended to use -->
        // Request(description, value, recepient, false)
        
        requests.push(newRequest);
    }
    
    function approveRequest(uint index) public {
        // Check for if the person has donated !
        require(approvers[msg.sender]);
        // Check for if the person has already voted YES !
        require(!requests[index].approvals[msg.sender]);
        
        requests[index].approvals[msg.sender] = true;
        requests[index].approvalCount++;
    }
    
    function finalizeRequest(uint index) public {
        
        // Making request variable as storage, makes it point it to the same storage location.
        Request storage request = requests[index];
        
        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);
        request.recepient.transfer(request.value);
        request.complete = true;
    }
}