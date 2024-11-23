import { TokenMinted } from "../generated/validatedNFT/validatedNFT";
import { ValidatedNFTToken } from "../generated/schema";
import { BigInt } from "@graphprotocol/graph-ts";

export function handleTokenMinted(event: TokenMinted): void {
  let token = new ValidatedNFTToken(event.params.tokenId.toString());
  token.owner = event.params.to;
  token.uri = ""; // Add URI fetch logic if applicable
  token.createdAt = event.block.timestamp;
  token.save();
}
import { RoyaltiesSetForValidator } from "../generated/validatedNFT/validatedNFT";
import { ValidatorRoyalties } from "../generated/schema";
import { BigInt, Bytes } from "@graphprotocol/graph-ts";

export function handleRoyaltiesSetForValidator(event: RoyaltiesSetForValidator): void {
  let royalties = ValidatorRoyalties.load(event.params.tokenId.toString());

  if (!royalties) {
    royalties = new ValidatorRoyalties(event.params.tokenId.toString());
  }

  royalties.token = event.params.tokenId.toString();
  
  // Explicitly define the type of `royalty` and assign correctly
  royalties.addresses = event.params.royalties.map<Bytes>((royalty) => royalty.account as Bytes);
  royalties.values = event.params.royalties.map<BigInt>((royalty) => royalty.value as BigInt);
  
  royalties.updatedAt = event.block.timestamp;
  royalties.save();
}
