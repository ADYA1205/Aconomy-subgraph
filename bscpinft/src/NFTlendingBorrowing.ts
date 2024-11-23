import { BigInt } from "@graphprotocol/graph-ts";
import {
    NFTlisted,
    AppliedBid,
    AcceptedBid,
    repaid,
    Withdrawn,
    BidRejected,
    NFTRemoved,
  } from "../generated/NFTlendingBorrowing/NFTlendingBorrowing";
  import {
    NFTDetail,
    BidDetail,
    AppliedBid as AppliedBidEntity,
    AcceptedBidEvent,
    RepaidEvent,
    WithdrawnEvent,
    BidRejectedEvent,
    NFTRemovedEvent,
  } from "../generated/schema";
  
  
  
  
  export function handleAcceptedBid(event: AcceptedBid): void {
    let entity = new AcceptedBidEvent(event.params.BidId.toHex());
    entity.nftId = event.params.NFTid;
    entity.bidId = event.params.BidId;
    entity.amount = event.params.Amount;
    entity.protocolAmount = event.params.ProtocolAmount;
    entity.contractAddress = event.params.ContractAddress;
    entity.save();
  }
  
  export function handleRepaid(event: repaid): void {
    let entity = new RepaidEvent(event.params.BidId.toHex());
    entity.nftId = event.params.NFTid;
    entity.bidId = event.params.BidId;
    entity.amount = event.params.Amount;
    entity.contractAddress = event.params.ContractAddress;
    entity.save();
  }
  
  export function handleWithdrawn(event: Withdrawn): void {
    let entity = new WithdrawnEvent(event.params.BidId.toHex());
    entity.nftId = event.params.NFTid;
    entity.bidId = event.params.BidId;
    entity.amount = event.params.Amount;
    entity.save();
  }
  
  export function handleBidRejected(event: BidRejected): void {
    let entity = new BidRejectedEvent(event.params.BidId.toHex());
    entity.nftId = event.params.NFTid;
    entity.bidId = event.params.BidId;
    entity.receiverAddress = event.params.recieverAddress;
    entity.amount = event.params.Amount;
    entity.save();
  }
  
  export function handleNFTRemoved(event: NFTRemoved): void {
    let entity = new NFTRemovedEvent(event.params.NFTId.toHex());
    entity.nftId = event.params.NFTId;
    entity.contractAddress = event.params.ContractAddress;
    entity.save();
  }
  import { BigInt } from "@graphprotocol/graph-ts";

// Inside `handleNFTListed` function
export function handleNFTListed(event: NFTlisted): void {
  let entity = new NFTDetail(event.params.NFTid.toHex());
  entity.tokenId = event.params.TokenId;
  entity.tokenOwner = event.transaction.from;
  entity.contractAddress = event.params.ContractAddress;
  entity.duration = event.params.Duration.toI32(); // Convert BigInt to i32
  entity.expiration = event.params.Expiration;
  entity.expectedAmount = event.params.ExpectedAmount;
  entity.percent = event.params.Percent;
  entity.listed = true;
  entity.bidAccepted = false;
  entity.repaid = false;
  entity.save();
}

// Inside `handleAppliedBid` function
export function handleAppliedBid(event: AppliedBid): void {
  let entity = new AppliedBidEntity(event.params.BidId.toHex());
  entity.nftId = event.params.NFTid;
  entity.bidId = event.params.BidId;
  entity.tokenId = event.params.TokenId;
  entity.contractAddress = event.params.ContractAddress;
  entity.bidAmount = event.params.BidAmount;
  entity.apy = event.params.APY;
  entity.duration = event.params.Duration.toI32(); // Convert BigInt to i32
  entity.expiration = event.params.Expiration;
  entity.ERC20Address = event.params.ERC20Address;
  entity.save();
}
