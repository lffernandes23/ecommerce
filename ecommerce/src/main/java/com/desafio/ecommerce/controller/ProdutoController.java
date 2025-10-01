package com.desafio.ecommerce.controller;

import java.security.PublicKey;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.desafio.ecommerce.model.Produto;
import com.desafio.ecommerce.repository.ProdutoRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/produtos")
@RestController
public class ProdutoController {
	
	@Autowired
	private ProdutoRepository produtoRepository;
	
	@GetMapping
	public List<Produto> listar(){
		return produtoRepository.findAll();
	}
	
	//Buscar produtos
	@GetMapping("/{id}")
	public Optional<Produto>buscar(@PathVariable Long id){
		return produtoRepository.findById(id);
	}
	
	//Criar produtos
	@PostMapping
	public Produto criar(@RequestBody Produto produto) {
		return produtoRepository.save(produto);
	}
	
	//Atualizar produtos
	@PutMapping("/{id}")
	public Produto atualizar(@PathVariable Long id, @RequestBody Produto dados) {
		return produtoRepository.findById(id).map(produto ->{
			produto.setNome(dados.getNome());
			produto.setPreco(dados.getPreco());
			return produtoRepository.save(produto);
		}).orElseGet(() ->{
			dados.setId(id);
			return produtoRepository.save(dados);
		});
	}
	
	//Deletar
	@DeleteMapping("/{id}")
	public void deletar(@PathVariable Long id) {
		produtoRepository.deleteById(id);
	}
}
