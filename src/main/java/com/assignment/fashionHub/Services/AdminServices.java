package com.assignment.fashionHub.Services;

import com.assignment.fashionHub.Models.AdminRegisterToken;
import com.assignment.fashionHub.Models.Product;
import com.assignment.fashionHub.Repositories.AdminTokenRepository;
import com.assignment.fashionHub.Repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class AdminServices {
    public AdminTokenRepository adminTokenRepository;
    public ProductRepository productRepository;

    @Autowired
    public AdminServices(AdminTokenRepository adminTokenRepository,ProductRepository productRepository){
        this.adminTokenRepository=adminTokenRepository;
        this.productRepository=productRepository;
    }
    public String getAdminTokenRegister(){
        Long Id= 0L;
        String token=getAlphaNumericString(20);
        String time= LocalDate.now().toString();
        AdminRegisterToken adminRegisterToken= new AdminRegisterToken(Id,token,time);
        adminTokenRepository.save(adminRegisterToken);
        return adminRegisterToken.getToken();
    }
    public Optional<AdminRegisterToken> getAdminTokenVerify(){
        Long Id=0L;
        return adminTokenRepository.findById(Id);

    }
    public Product getProductById(Integer id){
        Long Lid=Long.valueOf(id);
        return productRepository.findProductById(Lid)
                .orElseThrow( () -> new IllegalStateException("product not found"));
    }
    public String getAlphaNumericString(int n)
    {

        // chose a Character random from this String
        String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                + "0123456789"
                + "abcdefghijklmnopqrstuvxyz";

        // create StringBuffer size of AlphaNumericString
        StringBuilder sb = new StringBuilder(n);

        for (int i = 0; i < n; i++) {

            // generate a random number between
            // 0 to AlphaNumericString variable length
            int index
                    = (int)(AlphaNumericString.length()
                    * Math.random());

            // add Character one by one in end of sb
            sb.append(AlphaNumericString
                    .charAt(index));
        }

        return sb.toString();
    }
    public String deleteProductById(Long Id){
        Integer idExists=productRepository.countProductsById(Id);
        if(idExists>0){
            productRepository.deleteById(Id);
            return "SUCCESS";
        }else{
            return "ID not found";
        }
    }
    public Product addProductData(Product product){
        //insert case
        if(product.getId()==-1){
            product.setId(productRepository.countAllById(0));
            productRepository.save(product);
            return product;
        }
        // check for update
        Integer idExists=productRepository.countProductsById(product.getId());
        if(idExists>0) {
                productRepository.save(product);
                return product;
        }else{
            return null;
        }
    }
}
