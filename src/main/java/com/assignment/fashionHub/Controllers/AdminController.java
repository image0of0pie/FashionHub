package com.assignment.fashionHub.Controllers;
import com.assignment.fashionHub.Models.AppUserRole;
import com.assignment.fashionHub.Models.ApplicationUser;
import com.assignment.fashionHub.Models.Product;
import com.assignment.fashionHub.Services.AdminServices;
import com.assignment.fashionHub.Services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

@RestController
@RequestMapping(path = "api/admin/")
public class AdminController {
    private final AdminServices adminServices;
    private final ProductService productService;

    @Autowired
    public AdminController(AdminServices adminServices, ProductService productService){
        this.adminServices = adminServices;
        this.productService=productService;
    }
    @GetMapping(path = "token")
    public String getAdminRegisterToken(){
        return adminServices.getAdminTokenRegister();
    }

    @GetMapping(path="summary")
    public HashMap<String,String> getSummary(){

        HashMap<String,String> res=new HashMap<>();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if ( auth!= null && auth.getPrincipal() != null && auth.isAuthenticated() && !(auth instanceof AnonymousAuthenticationToken) ){
            ApplicationUser userDetails = (ApplicationUser) auth.getPrincipal();
            if(userDetails.getAppUserRole().equals(AppUserRole.ADMIN)){
                res.put("Permission","ALLOWED");
                res.put("MALE",productService.getProductSummaryBySex("male"));
                res.put("FEMALE",productService.getProductSummaryBySex("female"));
                res.put("OLDER",productService.getProductSummaryByArrival("old"));
                res.put("NEW ARRIVAL",productService.getProductSummaryByArrival("new"));
            }
        }else{
            res.put("Permission","NOT ALLOWED");
        }

        return res;
    }
    @GetMapping("cloth")
    public HashMap<String, Object> getProductById(@RequestParam(name="id")Integer id, HttpServletRequest request){
        HashMap<String, Object> res = new HashMap<>();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if ( auth!= null && auth.getPrincipal() != null && auth.isAuthenticated() && !(auth instanceof AnonymousAuthenticationToken) ) {
            ApplicationUser userDetails = (ApplicationUser) auth.getPrincipal();
            if (userDetails.getAppUserRole().equals(AppUserRole.ADMIN)) {
                res.put("product", adminServices.getProductById(id));
                return res;
            } else {
                res.put("status", "Permission not granted");
            }
        }else{
            res.put("status","UNAUTHORIZED");
        }
        return res;
    }

    @DeleteMapping(path="cloth")
    public HashMap<String, Object> addOrUpdateProduct(@RequestParam("id") Integer id,HttpServletRequest request){
        HashMap<String, Object> res = new HashMap<>();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if ( auth!= null && auth.getPrincipal() != null && auth.isAuthenticated() && !(auth instanceof AnonymousAuthenticationToken) ) {
            ApplicationUser userDetails = (ApplicationUser) auth.getPrincipal();
            if (userDetails.getAppUserRole().equals(AppUserRole.ADMIN)) {
                res.put("status", adminServices.deleteProductById(id.longValue()));
                return res;
            } else {
                res.put("status", "Permission not granted");
            }
        }else{
            res.put("status","UNAUTHORIZED");
        }
        return res;

    }
    @PutMapping(path="cloth")
    public HashMap<String, Object> addOrUpdateProduct(@RequestBody Product product){
        HashMap<String, Object> res = new HashMap<>();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if ( auth!= null && auth.getPrincipal() != null && auth.isAuthenticated() && !(auth instanceof AnonymousAuthenticationToken) ) {
            ApplicationUser userDetails = (ApplicationUser) auth.getPrincipal();
            if (userDetails.getAppUserRole().equals(AppUserRole.ADMIN)) {
                res.put("product", adminServices.addProductData(product));
                res.put("status", true);
                return res;
            } else {
                res.put("status", "Permission not granted");
            }
        }else{
            res.put("status","UNAUTHORIZED");
        }
        return res;
    }
}
