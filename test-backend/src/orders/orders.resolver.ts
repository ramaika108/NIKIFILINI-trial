import { Args, Query, Resolver } from '@nestjs/graphql'
import { RetailService } from '../retail_api/retail.service'
import { OrdersResponse } from '../graphql'
import { OrdersFilter } from '../retail_api/types'
import { plainToClass } from 'class-transformer'

@Resolver('Orders')
export class OrdersResolver {
  constructor(private retailService: RetailService) {}

  @Query()
  async order(@Args('number') id: string) {
    return this.retailService.findOrder(id)
  }

  @Query()
  async getOrders(@Args('page') page: number) {
  	// console.log('get Orders ran.. with page', page)
  	let pageNumber = plainToClass(OrdersFilter, {page: page})
  	// plainToClass(Order, resp.data.orders)
  	let ords = await this.retailService.orders(pageNumber)
    return {pagination: ords[1], orders: ords[0]}
  }
}
