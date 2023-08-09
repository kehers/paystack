"use strict";

var root = "/refund";

module.exports = {
  /*
    Create Refund
    @param: transaction, amount, currency, customer_note, merchant_note
    */

  create: {
    method: "post",
    endpoint: root,
    params: [
      "transaction",
      "amount",
      "currency",
      "customer_note",
      "merchant_note",
    ],
  },

  /*
    List Refund
    @param: reference, currrency, from, to, perPage, page
    */
  list: {
    method: "get",
    endpoint: root,
    params: ["reference", "currency", "from", "to", "perPage", "page"],
  },

  /**
   *Fetch Refund
   */
  fetch: {
    method: get,
    endpoint: [root, "/{id}"].join(""),
    args: ["id"],
  },
};
