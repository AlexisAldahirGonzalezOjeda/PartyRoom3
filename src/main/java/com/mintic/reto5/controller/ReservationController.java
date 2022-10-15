/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mintic.reto5.controller;

import com.mintic.reto5.model.Reservation;
import com.mintic.reto5.model.statistics.CountClients;
import com.mintic.reto5.model.statistics.DescriptionAmount;
import com.mintic.reto5.service.ReservationService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author pc
 */
@RestController
@RequestMapping("/api/Reservation")
public class ReservationController {
    
    @Autowired
    private ReservationService reservationService;
    
    @GetMapping("/all")
    public List<Reservation> getAll(){
        return reservationService.getAll();
    }
    
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation save(@RequestBody Reservation r){
        return reservationService.save(r);
    }
    
    @GetMapping("/{id}")
    public Optional<Reservation> obtenerReservationeId(@PathVariable("id") Integer identificador) {
        return reservationService.getReservation(identificador);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation change(@RequestBody Reservation r) {
        return reservationService.update(r);
    }

    @DeleteMapping("/{id}") 
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id") Integer identificador) {
        reservationService.delete(identificador);
    }
     
    @GetMapping("/report-dates/{dateOne}/{dateTwo}")
    public List<Reservation> getDatesReport(@PathVariable("dateOne") String d1, @PathVariable("dateTwo") String d2){
        return reservationService.geteservationPeriod(d1, d2);
    }  
    
    @GetMapping("/report-status")
    public DescriptionAmount getReservationDescriptionStatus(){
        return reservationService.getStatusReport();
    }
     
    @GetMapping("/report-clients")
    public List<CountClients> getCountClients(){
        return reservationService.getTopClients();
    } 
     
    
}