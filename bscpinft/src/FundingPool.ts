import { BigInt } from "@graphprotocol/graph-ts";
import {
  SuppliedToPool as SuppliedToPoolEvent,
  BidAccepted as BidAcceptedEvent,
  BidRejected as BidRejectedEvent,
  BidRepaid as BidRepaidEvent,
  InstallmentRepaid as InstallmentRepaidEvent,
  FullAmountRepaid as FullAmountRepaidEvent,
  Withdrawn as WithdrawnEvent,
} from "../generated/FundingPool/FundingPool";
import {
  SuppliedToPool,
  BidAccepted,
  BidRejected,
  BidRepaid,
  InstallmentRepaid,
  FullAmountRepaid,
  Withdrawn,
} from "../generated/schema";

export function handleSuppliedToPool(event: SuppliedToPoolEvent): void {
  let entity = new SuppliedToPool(event.transaction.hash.toHex());
  entity.lender = event.params.lender;
  entity.poolId = event.params.poolId;
  entity.bidId = event.params.BidId;
  entity.erc20Token = event.params.ERC20Token;
  entity.tokenAmount = event.params.tokenAmount;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

export function handleBidAccepted(event: BidAcceptedEvent): void {
  let entity = new BidAccepted(event.transaction.hash.toHex());
  entity.lender = event.params.lender;
  entity.receiver = event.params.reciever;
  entity.bidId = event.params.BidId;
  entity.poolId = event.params.PoolId;
  entity.amount = event.params.Amount;
  entity.paymentCycleAmount = event.params.paymentCycleAmount;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

export function handleBidRejected(event: BidRejectedEvent): void {
  let entity = new BidRejected(event.transaction.hash.toHex());
  entity.lender = event.params.lender;
  entity.bidId = event.params.BidId;
  entity.poolId = event.params.PoolId;
  entity.amount = event.params.Amount;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

export function handleBidRepaid(event: BidRepaidEvent): void {
  let entity = new BidRepaid(event.transaction.hash.toHex());
  entity.bidId = event.params.bidId;
  entity.paidAmount = event.params.PaidAmount;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

export function handleInstallmentRepaid(event: InstallmentRepaidEvent): void {
  let entity = new InstallmentRepaid(event.transaction.hash.toHex());
  entity.poolId = event.params.poolId;
  entity.bidId = event.params.bidId;
  entity.owedAmount = event.params.owedAmount;
  entity.dueAmount = event.params.dueAmount;
  entity.interest = event.params.interest;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

export function handleFullAmountRepaid(event: FullAmountRepaidEvent): void {
  let entity = new FullAmountRepaid(event.transaction.hash.toHex());
  entity.poolId = event.params.poolId;
  entity.bidId = event.params.bidId;
  entity.amount = event.params.Amount;
  entity.interest = event.params.interest;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

export function handleWithdrawn(event: WithdrawnEvent): void {
  let entity = new Withdrawn(event.transaction.hash.toHex());
  entity.receiver = event.params.reciever;
  entity.bidId = event.params.BidId;
  entity.poolId = event.params.PoolId;
  entity.amount = event.params.Amount;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}
