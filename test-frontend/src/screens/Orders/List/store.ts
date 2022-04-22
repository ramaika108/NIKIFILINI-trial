import { makeAutoObservable } from "mobx";
import { OrdersListItem } from "./types";
import { createBrowserHistory, History } from "history";
import client from "api/gql";
import { GET_ORDERS_QUERY } from "~/screens/Orders/List/queries";

export default class OrdersListState {
  initialized = false;
  loading = false;
  page = 1;
  totalPages = 1;
  orders: OrdersListItem[] = [];
  history: History;

  setInitialized(val: boolean) {
    this.initialized = val;
  }

  constructor() {
    makeAutoObservable(this);
    this.history = createBrowserHistory();
  }

  setOrders(orders: OrdersListItem[]): void {
    this.orders = orders;
  }

  startLoading(): void {
    this.loading = true;
  }

  stopLoading(): void {
    this.loading = false;
  }

  setPage(page: number): void {
    this.page = page;
    const url = new URL(window.location.href);
    if (url.searchParams.get("page") !== this.page.toString()) {
      url.searchParams.set("page", "" + this.page);
      this.history.replace(url.pathname + url.search, {});
    }
  }

  nextPage(): void {
    if (this.page >= this.totalPages) return;
    this.setPage(this.page + 1);
    this.loading = true;
    this.loadOrders();
  }

  prevPage(): void {
    if (this.page <= 1) return;
    this.setPage(this.page - 1);
    this.loading = true;
    this.loadOrders();
  }

  setTotalPages(totalPages: number): void {
    this.totalPages = totalPages;
  }

  get canNext(): boolean {
    return this.page < this.totalPages;
  }

  get canPrev(): boolean {
    return this.page > 1;
  }

  getPage (): void{
    const url = new URL(window.location.href);
    const page = url.searchParams.get("page")
    if (page) this.page = Number(page)
    
  }

  async loadOrders() {
    this.startLoading()

    client
    .query(GET_ORDERS_QUERY, { page: this.page })
    .toPromise()
    .then(result => {
      // console.log(result.data.getOrders.orders); // { data: ... }
      this.setOrders(result.data.getOrders.orders)
      this.setTotalPages(result.data.getOrders.pagination.totalPageCount)
    });

    this.stopLoading()
  }

  initialize() {
    if (this.initialized) return;
    this.initialized = true;
    this.getPage()
    this.loadOrders();
  }
}