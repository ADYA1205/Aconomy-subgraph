import {
    ERC20Added,
    ERC20Transferred,
    ValidatorFundsWithdrawn,
    ValidatorAdded
  } from "../generated/piNFTMethods/piNFTMethods";
  import {
    ERC20Event,
    ValidatorEvent,
    Commission,
    ValidatorFundsWithdrawn as ValidatorFundsWithdrawnEntity
  } from "../generated/schema";
  
  export function handleERC20Added(event: ERC20Added): void {
    let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString();
    let entity = new ERC20Event(id);
    entity.collectionAddress = event.params.collectionAddress;
    entity.from = event.params.from;
    entity.tokenId = event.params.tokenId;
    entity.erc20Contract = event.params.erc20Contract;
    entity.value = event.params.value;
    entity.save();
  }
  
  export function handleERC20Transferred(event: ERC20Transferred): void {
    let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString();
    let entity = new ERC20Event(id);
    entity.collectionAddress = event.params.collectionAddress;
    entity.tokenId = event.params.tokenId;
    entity.erc20Contract = event.params.erc20Contract;
    entity.value = event.params.value;
    entity.save();
  }
  
  export function handleValidatorFundsWithdrawn(event: ValidatorFundsWithdrawn): void {
    let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString();
    let entity = new ValidatorFundsWithdrawnEntity(id);
    entity.collectionAddress = event.params.collectionAddress;
    entity.withdrawer = event.params.withdrawer;
    entity.tokenId = event.params.tokenId;
    entity.erc20Contract = event.params.erc20Contract;
    entity.amount = event.params.amount;
    entity.save();
  }
  
  export function handleValidatorAdded(event: ValidatorAdded): void {
    let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString();
    let entity = new ValidatorEvent(id);
    entity.collectionAddress = event.params.collectionAddress;
    entity.tokenId = event.params.tokenId;
    entity.validator = event.params.validator;
    entity.save();
  }
  