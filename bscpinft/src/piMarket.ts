import {
    SaleCreated as SaleCreatedEvent,
    NFTBought as NFTBoughtEvent,
    SaleCancelled as SaleCancelledEvent,
    BidCreated as BidCreatedEvent,
    BidExecuted as BidExecutedEvent,
    BidWithdrawn as BidWithdrawnEvent,
    SwapCancelled as SwapCancelledEvent,
    SwapAccepted as SwapAcceptedEvent,
    SwapProposed as SwapProposedEvent,
    updatedSalePrice as UpdatedSalePriceEvent,
  } from "../generated/piMarket/piMarket";
  import { Sale, BidOrder, Swap } from "../generated/schema";
  
  export function handleSaleCreated(event: SaleCreatedEvent): void {
    let sale = new Sale(event.params.saleId.toString());
    sale.saleId = event.params.saleId;
    sale.tokenId = event.params.tokenId;
    sale.tokenContract = event.params.tokenContract;
    sale.status = true;
    sale.currentOwner = event.transaction.from;
    sale.save();
  }
  
  export function handleNFTBought(event: NFTBoughtEvent): void {
    let sale = Sale.load(event.params.saleId.toString());
    if (sale) {
      sale.status = false;
      sale.currentOwner = event.transaction.from;
      sale.save();
    }
  }
  
  export function handleSaleCancelled(event: SaleCancelledEvent): void {
    let sale = Sale.load(event.params.saleId.toString());
    if (sale) {
      sale.status = false;
      sale.save();
    }
  }
  
  export function handleBidCreated(event: BidCreatedEvent): void {
    let bid = new BidOrder(event.transaction.hash.toHex() + "-" + event.logIndex.toString());
    bid.bidId = event.params.bidId;
    bid.saleId = event.params.saleId;
    bid.sellerAddress = event.transaction.from;
    bid.buyerAddress = event.transaction.to!;
    bid.price = event.transaction.value;
    bid.withdrawn = false;
    bid.save();
  }
  
  export function handleBidExecuted(event: BidExecutedEvent): void {
    let bid = BidOrder.load(event.params.bidId.toString());
    if (bid) {
      bid.withdrawn = true;
      bid.save();
    }
  }
  
  export function handleBidWithdrawn(event: BidWithdrawnEvent): void {
    let bid = BidOrder.load(event.params.bidId.toString());
    if (bid) {
      bid.withdrawn = true;
      bid.save();
    }
  }
  
  export function handleSwapCancelled(event: SwapCancelledEvent): void {
    let swap = Swap.load(event.params.swapId.toString());
    if (swap) {
      swap.status = false;
      swap.save();
    }
  }
  
  export function handleSwapAccepted(event: SwapAcceptedEvent): void {
    let swap = Swap.load(event.params.swapId.toString());
    if (swap) {
      swap.status = false;
      swap.save();
    }
  }
  
  export function handleSwapProposed(event: SwapProposedEvent): void {
    let swap = new Swap(event.params.swapId.toString());
    swap.initiatorNFTAddress = event.params.from;
    swap.initiator = event.transaction.from;
    swap.requestedTokenOwner = event.params.to;
    swap.status = true;
    swap.save();
  }
  
  export function handleUpdatedSalePrice(event: UpdatedSalePriceEvent): void {
    let sale = Sale.load(event.params.saleId.toString());
    if (sale) {
      sale.price = event.params.Price;
      sale.save();
    }
  }
  