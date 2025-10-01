package com.desafio.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.desafio.ecommerce.model.Compra;

@Repository
public interface CompraRepository extends JpaRepository<Compra, Long> {

}
