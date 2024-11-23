import { BigInt } from "@graphprotocol/graph-ts";
import {
  loanAccepted,
  repaidAmounts,
  LoanRepaid,
  LoanRepayment,
  SubmittedLoan,
} from "../generated/poolAddress/poolAddress";
import { Loan, BorrowerLoan } from "../generated/schema";

export function handleLoanAccepted(event: loanAccepted): void {
  let loan = Loan.load(event.params.loanId.toString());
  if (loan) {
    loan.loanState = "ACCEPTED";
    loan.save();
  }
}

export function handleRepaidAmounts(event: repaidAmounts): void {
  let loan = Loan.load("someExistingLogicToFindLoanId");
  if (loan) {
    loan.totalRepaidPrincipal = event.params.owedPrincipal.plus(BigInt.zero());
    loan.totalRepaidInterest = event.params.interest.plus(BigInt.zero());
    loan.lastRepaidTimestamp = event.block.timestamp;
    loan.save();
  }
}

export function handleLoanRepaid(event: LoanRepaid): void {
  let loan = Loan.load(event.params.loanId.toString());
  if (loan) {
    loan.loanState = "PAID";
    loan.save();
  }
}

export function handleLoanRepayment(event: LoanRepayment): void {
  let loan = Loan.load(event.params.loanId.toString());
  if (loan) {
    loan.totalRepaidPrincipal = loan.totalRepaidPrincipal.plus(event.params.Amount);
    loan.save();
  }
}

export function handleSubmittedLoan(event: SubmittedLoan): void {
  let loan = new Loan(event.params.loanId.toString());
  loan.borrower = event.params.borrower;
  loan.receiver = event.params.receiver;
  loan.poolId = event.params.loanId;
  loan.paymentCycleAmount = event.params.paymentCycleAmount;
  loan.loanState = "PENDING";
  loan.totalRepaidPrincipal = BigInt.zero();
  loan.totalRepaidInterest = BigInt.zero();
  loan.lastRepaidTimestamp = BigInt.zero();
  loan.save();

  let borrowerLoan = new BorrowerLoan(
    event.params.borrower.toHex() + "-" + event.params.loanId.toString()
  );
  borrowerLoan.borrower = event.params.borrower;
  borrowerLoan.loanId = event.params.loanId;
  borrowerLoan.save();
}
