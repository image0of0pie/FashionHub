package com.assignment.fashionHub.Controllers;

import com.assignment.fashionHub.DTO.OrderDTO;
import com.assignment.fashionHub.DTO.UpdateOrderDTO;
import com.assignment.fashionHub.Services.CartService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping(path = "api/v1/")
@AllArgsConstructor
public class CartServiceController {

    private final CartService cartService;


    @PostMapping( path = "add")
    public ResponseEntity<String> addProduct(@RequestBody OrderDTO orderDTO ){
        return new ResponseEntity<String>(cartService.addToCart(orderDTO) , HttpStatus.CREATED);
    }

    @GetMapping( path = "orders")
    public ResponseEntity<HashMap<String , Object>> getOrders(){
        return new ResponseEntity<>(cartService.getProducts(), HttpStatus.OK);
    }

    @PutMapping(path = "order")
    public ResponseEntity<String> updateOrder(@RequestBody UpdateOrderDTO updateOrderDTO){
        return new ResponseEntity<>(cartService.updateOrder( updateOrderDTO ), HttpStatus.CREATED);
    }

    @DeleteMapping( path = "order/{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable String id){
        return new ResponseEntity<>(cartService.deleteOrder(id), HttpStatus.OK);
    }


}
