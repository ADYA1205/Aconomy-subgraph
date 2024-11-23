import {
  OwnershipTransferred as OwnershipTransferredEvent,
  SetAconomyNFTLendBorrowFee as SetAconomyNFTLendBorrowFeeEvent,
  SetAconomyPiMarketFee as SetAconomyPiMarketFeeEvent,
  SetAconomyPoolFee as SetAconomyPoolFeeEvent,
} from "../generated/AconomyFee/AconomyFee";

import {
  OwnershipTransferred,
  SetAconomyNFTLendBorrowFee,
  SetAconomyPiMarketFee,
  SetAconomyPoolFee,
} from "../generated/schema";

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleSetAconomyNFTLendBorrowFee(
  event: SetAconomyNFTLendBorrowFeeEvent
): void {
  let entity = new SetAconomyNFTLendBorrowFee(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.newFee = event.params.newFee;
  entity.oldFee = event.params.oldFee;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleSetAconomyPiMarketFee(
  event: SetAconomyPiMarketFeeEvent
): void {
  let entity = new SetAconomyPiMarketFee(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.newFee = event.params.newFee;
  entity.oldFee = event.params.oldFee;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleSetAconomyPoolFee(event: SetAconomyPoolFeeEvent): void {
  let entity = new SetAconomyPoolFee(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.newFee = event.params.newFee;
  entity.oldFee = event.params.oldFee;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
