import { TokenMinted } from "../generated/piNFT/piNFT";
import { Token } from "../generated/schema";

export function handleTokenMinted(event: TokenMinted): void {
  let token = new Token(event.params.tokenId.toString());
  token.owner = event.params.to;
  token.uri = ""; // Replace this with logic to fetch the token URI if needed.
  token.save();
}
import { RoyaltiesSetForTokenId } from "../generated/piNFT/piNFT";
import { Royalties, Token } from "../generated/schema";

export function handleRoyaltiesSetForTokenId(event: RoyaltiesSetForTokenId): void {
  let token = Token.load(event.params.tokenId.toString());
  if (!token) return;

  for (let i = 0; i < event.params.royalties.length; i++) {
    let royalty = new Royalties(
      event.params.tokenId.toString() + "-" + i.toString()
    );
    royalty.token = token.id;
    royalty.account = event.params.royalties[i].account;
    royalty.value = event.params.royalties[i].value;
    royalty.save();
  }
}
