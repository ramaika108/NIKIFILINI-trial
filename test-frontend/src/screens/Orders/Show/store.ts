import { makeAutoObservable } from "mobx";
import { SingleOrder } from "~/screens/Orders/Show/types";
import client from "api/gql";
import { ORDER_QUERY } from "./queries"

export default class OrdersShowStore {
  order: SingleOrder | null = null;
  id: string | null = null;

  constructor(id: any) {
  	makeAutoObservable(this);
    this.id = id.id
    this.loadOrder()
  }

  loadOrder () {
    client
    .query(ORDER_QUERY, { number: this.id })
    .toPromise()
    .then(result => {
    	this.order = result.data.order
    });
  }
}
