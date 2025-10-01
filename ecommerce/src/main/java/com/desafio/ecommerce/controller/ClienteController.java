package com.desafio.ecommerce.controller;

import com.desafio.ecommerce.model.Cliente;
import com.desafio.ecommerce.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/clientes")
public class ClienteController {
	
	@Autowired
	private ClienteRepository clienteRepository;
	
	@GetMapping
	public List<Cliente> listar(){
		return clienteRepository.findAll();
	}
	
	//Buscar cliente pelo ID
	@GetMapping("/{id}")
	public Optional<Cliente> buscar(@PathVariable Long id){
		return clienteRepository.findById(id);
	}
	
	//Criar novo cliente
	@PostMapping
	public Cliente criar(@RequestBody Cliente cliente) {
		return clienteRepository.save(cliente);
	}
	
	//Atualizar cliente
	@PutMapping("/{id}")
	public Cliente atualizar(@PathVariable Long id, @RequestBody Cliente dados) {
		return clienteRepository.findById(id).map(cliente ->{
			cliente.setNome(dados.getNome());
			cliente.setEmail(dados.getEmail());
			return clienteRepository.save(cliente);
		}).orElseGet(() ->{
			dados.setId(id);
			return clienteRepository.save(dados);
		});
	}
	
	//Deletar
	@DeleteMapping("/{id}")
	public void deletar(@PathVariable Long id) {
		clienteRepository.deleteById(id);
	}
}
