/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mintic.reto5.repository.crudRepository;

import com.mintic.reto5.model.Client; 
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author pc
 */
public interface ClientCrudRepository extends CrudRepository<Client,Integer> {
    
}