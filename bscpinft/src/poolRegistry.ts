import { BigInt } from "@graphprotocol/graph-ts";
import {
  poolCreated as PoolCreatedEvent,
  SetPaymentCycleDuration as SetPaymentCycleDurationEvent,
  SetPaymentDefaultDuration as SetPaymentDefaultDurationEvent,
  SetPoolFee as SetPoolFeeEvent,
  SetloanExpirationTime as SetLoanExpirationTimeEvent,
  SetPoolURI as SetPoolURIEvent,
  SetAPR as SetAPREvent,
  poolClosed as PoolClosedEvent,
} from "../generated/poolRegistry/poolRegistry";
import {
  PoolDetail,
  PoolCreated,
  SetPaymentCycleDuration,
  SetPaymentDefaultDuration,
  SetPoolFee,
  SetLoanExpirationTime,
  SetPoolURI,
  SetAPR,
  PoolClosed,
} from "../generated/schema";

export function handlePoolCreated(event: PoolCreatedEvent): void {
  let entity = new PoolCreated(event.transaction.hash.toHex());
  entity.owner = event.params.owner;
  entity.poolAddress = event.params.poolAddress;
  entity.poolId = BigInt.fromI32(event.params.poolId.toI32());
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();

  let pool = new PoolDetail(event.params.poolId.toString());
  pool.owner = event.params.owner;
  pool.poolAddress = event.params.poolAddress;
  pool.save();
}

export function handleSetPaymentCycleDuration(
  event: SetPaymentCycleDurationEvent
): void {
  let entity = new SetPaymentCycleDuration(event.transaction.hash.toHex());
  entity.poolId = BigInt.fromI32(event.params.poolId.toI32());
  entity.duration = BigInt.fromI32(event.params.duration.toI32());
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

export function handleSetPaymentDefaultDuration(
  event: SetPaymentDefaultDurationEvent
): void {
  let entity = new SetPaymentDefaultDuration(event.transaction.hash.toHex());
  entity.poolId = BigInt.fromI32(event.params.poolId.toI32());
  entity.duration = BigInt.fromI32(event.params.duration.toI32());
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

export function handleSetPoolFee(event: SetPoolFeeEvent): void {
  let entity = new SetPoolFee(event.transaction.hash.toHex());
  entity.poolId = BigInt.fromI32(event.params.poolId.toI32());
  entity.feePct = BigInt.fromI32(event.params.feePct); // Cast i32 to BigInt
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

export function handleSetLoanExpirationTime(
  event: SetLoanExpirationTimeEvent
): void {
  let entity = new SetLoanExpirationTime(event.transaction.hash.toHex());
  entity.poolId = BigInt.fromI32(event.params.poolId.toI32());
  entity.duration = BigInt.fromI32(event.params.duration.toI32());
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

export function handleSetPoolURI(event: SetPoolURIEvent): void {
  let entity = new SetPoolURI(event.transaction.hash.toHex());
  entity.poolId = BigInt.fromI32(event.params.poolId.toI32());
  entity.uri = event.params.uri;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

export function handleSetAPR(event: SetAPREvent): void {
  let entity = new SetAPR(event.transaction.hash.toHex());
  entity.poolId = BigInt.fromI32(event.params.poolId.toI32());
  entity.APR = BigInt.fromI32(event.params.APR); // Cast i32 to BigInt
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

export function handlePoolClosed(event: PoolClosedEvent): void {
  let entity = new PoolClosed(event.transaction.hash.toHex());
  entity.poolId = BigInt.fromI32(event.params.poolId.toI32());
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}
