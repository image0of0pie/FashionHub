package com.assignment.fashionHub.Repositories;

import com.assignment.fashionHub.Models.Product;
import com.sun.istack.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findProductById( Long id);

    @Query("select p from Product p where LOWER(p.b_dresstype) LIKE LOWER(CONCAT('%', :type, '%'))")
    List<Product> findProductsByB_Dresstype(@Param("type") String type);

    @Query(value = "select p from Product p where LOWER(p.a_sex)=lower(:sex) order by p.e_arrival desc ")
    Page<Product> findProductByA_sex(@Param("sex") String sex, Pageable paging);

    @Query(value = "select p from Product p where LOWER(p.e_arrival)=LOWER(:arrival) and LOWER(p.a_sex)=LOWER(:sex)")
    List<Product> findProductsByE_arrivalAndA_sex(@Param("arrival") String arrival, @Param("sex") String sex);

    @Query(value = "select count(p.id) from Product p where LOWER(p.a_sex)=lower(:sex)")
    Integer countProductsByA_sex(@Param("sex") String sex);

    @Query(value = "select count(p.id) from Product p where LOWER(p.e_arrival)=LOWER(:arrival)")
    Integer countProductsByE_arrival(@Param("arrival")String arrival);

    @Query(value = "select count(DISTINCT p.id) from Product p")
    Long countAllById(@Param("id")Integer id);

    @Query(value = "select count(p.id) from Product p where p.id=:id")
    Integer countProductsById(@Param("id")Long id);

    void deleteById(@Param("id")Long Id);


}
