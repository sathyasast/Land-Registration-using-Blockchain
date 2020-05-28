pragma solidity ^0.5.0;

contract Marketplace {
    string public name;
    uint public productCount = 0;
    uint public registerCount = 0;
    uint public buyerCount = 0;
    uint public added;
    uint public r=0;
    mapping(uint => Registry) public registers;
    mapping(uint => Product) public products;
    mapping(uint => Buyer) public buyers;
    struct Registry{
        uint id;
        string name1;
        uint phoneno1;
        bytes20 adhaarno1;
        bytes20 surveyno1;
        bytes20 plotno1;
        bytes20 street1;
        string city1;
        address payable owner;
        bool registered;
    }
    
    event PropertyRegistered(
        uint id,
        string name1,
        uint phoneno1,
        bytes20 adhaarno1,
        bytes20 surveyno1,
        bytes20 plotno1,
        bytes20 street1,
        string city1,
        address payable owner,
        bool registered
    );
    
    struct Product {
        uint id;
        //string name;
        string name;
        uint phoneno;
        bytes20 adhaarno;
        bytes20 surveyno;
        bytes20 plotno;
        bytes20 street;
        string city;
        uint price;
        address payable owner;
        bool purchased;
        uint added;
    }

    event ProductCreated(
        uint id,
        string name,
        uint phoneno,
        bytes20 a,
        bytes20 s,
        bytes20 p,
        bytes20 t,
        string city,
        uint price,
        address payable owner,
        bool purchased,
        uint added
    );
     struct Buyer{
        uint id;
        string name2;
        uint phoneno2;
        bytes20 adhaarno2;
        address payable owner;
        }
    
    event BuyerRegistered(
        uint id,
        string name,
        uint phoneno,
        bytes20 a,
        address payable owner
        );

    event ProductPurchased(
        uint id,
       // string name,
        string name,
        uint phoneno,
        bytes20 adhaarno,
        bytes20 surveyno,
        bytes20 plotno,
        bytes20 street,
        string city,
        uint price,
        address payable owner,
        bool purchased
    );

    constructor() public {
        name = "Chennai Real Estate Market";
    }
    
    function propertyRegistry(string memory _name1, uint _phoneno1, uint _adhaarno1, uint _surveyno1, uint _plotno1, string memory _street1, string memory _city1) public {
        require(bytes(_name1).length > 0);
        bytes20 a;
        bytes20 s;
        bytes20 p;
        bytes20 t;
        // require(_price > 0);
        registerCount ++;
        a = ripemd160(abi.encodePacked(sha256(abi.encodePacked(_adhaarno1))));
        s = ripemd160(abi.encodePacked(sha256(abi.encodePacked(_surveyno1))));
        p = ripemd160(abi.encodePacked(sha256(abi.encodePacked(_plotno1))));
        t = ripemd160(abi.encodePacked(sha256(abi.encodePacked(_street1))));
        // Create the product
        registers[registerCount] = Registry(registerCount, _name1, _phoneno1, a, s, p, t, _city1, msg.sender, true);
        // Trigger an event
        emit PropertyRegistered(registerCount, _name1, _phoneno1, a, s, p, t, _city1, msg.sender, true);
    }
    function createProduct(string memory _name, uint _phoneno, uint _adhaarno, uint _surveyno, uint _plotno, string memory _street, string memory _city, uint _price) public {
        require(bytes(_name).length > 0);
        added = 0;
        uint l;
        added ++;
        uint m = 0;
        bytes20 a;
        bytes20 s;
        bytes20 p;
        bytes20 t;
        //  _name = sha256(_name);
        //_name=sha256(abi.encodePacked(_name));
        a = ripemd160(abi.encodePacked(sha256(abi.encodePacked(_adhaarno))));
        s = ripemd160(abi.encodePacked(sha256(abi.encodePacked(_surveyno))));
        p = ripemd160(abi.encodePacked(sha256(abi.encodePacked(_plotno))));
        t = ripemd160(abi.encodePacked(sha256(abi.encodePacked(_street))));
         
        for(uint i=1;i<= registerCount;i++){
            if(registers[i].surveyno1 == s && registers[i].phoneno1 == _phoneno && registers[i].adhaarno1 == a && registers[i].plotno1 == p && registers[i].street1 == t ){
                l=i;
            }
        }
        require(registers[l].registered,"not registered");
        require(registers[l].owner == msg.sender);
    
        if(r>0 && m==0){
            for(uint i=1;i<=productCount;i++){
                if(products[i].surveyno == s && products[i].owner == msg.sender){
                    require(products[i].added<1);
                }
            }   
        }
        // require(_price > 0);
        productCount ++;
        // Create the product
        products[productCount] = Product(productCount, _name, _phoneno, a, s, p, t, _city, _price, msg.sender, false, added);
        // Trigger an event
        emit ProductCreated(productCount, _name, _phoneno, a, s, p, t, _city, _price, msg.sender, false, added);
        r ++;
    }
    function buyerProduct(string memory _name2, uint _phoneno2, uint _adhaarno2) public {
        require(bytes(_name2).length > 0);
        bytes20 a;
        a = ripemd160(abi.encodePacked(sha256(abi.encodePacked(_adhaarno2))));
        buyerCount ++;
        buyers[buyerCount] = Buyer(buyerCount, _name2, _phoneno2, a, msg.sender);
        emit BuyerRegistered(buyerCount, _name2, _phoneno2, a, msg.sender);
        
    }
    function purchaseProduct(uint _id) public payable {
        // Fetch the product
        Product memory _product = products[_id];
        // Fetch the owner
        address payable _seller = _product.owner;
        // Make sure the product has a valid id
        require(_product.id > 0 && _product.id <= productCount);
        // Require that there is enough Ether in the transaction
        require(msg.value >= _product.price);
        // Require that the product has not been purchased already
        require(!_product.purchased);
        // Require that the buyer is not the seller
        require(_seller != msg.sender);
        // Transfer ownership to the buyer
        _product.owner = msg.sender;
        // Mark as purchased
        _product.purchased = true;
        // Update the product
        products[_id] = _product;
        // Pay the seller by sending them Ether
        address(_seller).transfer(msg.value);
        // Trigger an event
        for(uint i=1;i<=buyerCount;i++){
            if(buyers[i].owner == _product.owner){
                products[_id].name = buyers[i].name2;
                products[_id].phoneno = buyers[i].phoneno2;
                products[_id].adhaarno = buyers[i].adhaarno2;
            }
        }
        emit ProductPurchased(productCount, _product.name, _product.phoneno, ripemd160(abi.encodePacked(sha256(abi.encodePacked(_product.adhaarno)))), ripemd160(abi.encodePacked(sha256(abi.encodePacked(_product.surveyno)))), ripemd160(abi.encodePacked(sha256(abi.encodePacked(_product.plotno)))), ripemd160(abi.encodePacked(sha256(abi.encodePacked(_product.street)))), _product.city, _product.price, msg.sender, true);
        for(uint i=1;i<=registerCount;i++){
            if(registers[i].surveyno1 == products[_id].surveyno){
                registers[i].name1 =  products[_id].name;
                registers[i].phoneno1 = products[_id].phoneno;
                registers[i].adhaarno1 = products[_id].adhaarno;
                registers[i].owner = msg.sender;
                products[i].added = 0;
            }
        }
    }
}
