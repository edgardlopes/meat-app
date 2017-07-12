import { Injectable } from "@angular/core";

import {Http, Headers, RequestOptions} from '@angular/http'

import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import { CartItem } from "app/restaurant-detail/shopping-cart/cart-item.model";
import { Order } from "app/order/order.model";
import { Observable } from "rxjs/Observable";

import { MEAT_API } from '../app.api'
import { ErrorHandler } from "app/app.error-handler";

@Injectable()
export class OrderService {

    constructor(private cartService: ShoppingCartService,
                private http: Http){   
    }

    cartItems(): CartItem[]{
        return this.cartService.items
    }

    increaseQty(item: CartItem){
        this.cartService.increaseQty(item)
    }

    decreaseQty(item: CartItem){
        this.cartService.decreaseQty(item)
    }

    remove(item: CartItem){
        this.cartService.remove(item)
    }

    itemsValue(): number {
        return this.cartService.total()
    }

    checkOrder(order: Order): Observable<string>{
        const headers = new Headers()
        headers.append('Content-Type', 'applicatin/json')

        return this.http.post(`${MEAT_API}/orders`, 
                                JSON.stringify(order),
                                new RequestOptions(headers))
                    .map(response => response.json().id)
                    .catch(ErrorHandler.handleError)
    }

    clear() {
        this.cartService.clear()
    }
}