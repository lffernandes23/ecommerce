package com.desafio.ecommerce.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.desafio.ecommerce.model.Cliente;
import com.desafio.ecommerce.model.Compra;
import com.desafio.ecommerce.model.Produto;
import com.desafio.ecommerce.repository.ClienteRepository;
import com.desafio.ecommerce.repository.CompraRepository;
import com.desafio.ecommerce.repository.ProdutoRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/compras")
public class CompraController {
	
	@Autowired
	private CompraRepository compraRepository;
	
	@Autowired
	private ClienteRepository clienteRepository;

	@Autowired
	private ProdutoRepository produtoRepository;
	
	@GetMapping
	public List<Compra> listar(){
		return compraRepository.findAll();
	}
	
	//Buscar
	@GetMapping("/{id}")
	public Optional<Compra>buscar(@PathVariable Long id){
		return compraRepository.findById(id);
	}
	
	//Criar
	@PostMapping
	public Compra criar(@RequestBody Compra compra) {
		//Buscar cliente e produto pelo ID
	     Optional<Cliente> cliente = clienteRepository.findById(compra.getCliente().getId());
	     Optional<Produto> produto = produtoRepository.findById(compra.getProduto().getId());
	     
	     if(cliente.isPresent() && produto.isPresent()) {
	    	 compra.setCliente(cliente.get());
	    	 compra.setProduto(produto.get());
	    	 compra.setDataCompra(java.time.LocalDateTime.now());
	    	 return compraRepository.save(compra);
	     } else {
	    	 throw new RuntimeException("Cliente ou produto não encontrado");
	     }
	}
	
	//Atualizar compra
	@PutMapping("/{id}")
	public Compra atualizar(@PathVariable Long id, @RequestBody Compra dados) {
		return compraRepository.findById(id).map(compra ->{
            Optional<Cliente> cliente = clienteRepository.findById(dados.getCliente().getId());
            Optional<Produto> produto = produtoRepository.findById(dados.getProduto().getId());
            
            
            if(cliente.isPresent() && produto.isPresent()) {
                compra.setCliente(cliente.get());
                compra.setProduto(produto.get());
                compra.setQuantidade(dados.getQuantidade());
                compra.setDataCompra(java.time.LocalDateTime.now());
                return compraRepository.save(compra);
            } else {
                throw new RuntimeException("Cliente ou Produto não encontrado.");           	
            }
		}).orElseThrow(() -> new RuntimeException("Compra não encontrada."));
	}
}
