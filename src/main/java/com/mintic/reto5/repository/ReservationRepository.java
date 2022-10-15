/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mintic.reto5.repository;

import com.mintic.reto5.model.Client;
import com.mintic.reto5.model.Reservation;
import com.mintic.reto5.model.statistics.CountClients;
import com.mintic.reto5.repository.crudRepository.ReservationCrudRepository;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author pc
 */
@Repository
public class ReservationRepository {

    @Autowired
    private ReservationCrudRepository reservationCrudRepository;

    public List<Reservation> getAll() {
        return (List<Reservation>) reservationCrudRepository.findAll();
    }

    public Optional<Reservation> getReservation(int id) {
        return reservationCrudRepository.findById(id);
    }

    public Reservation save(Reservation c) {
        return reservationCrudRepository.save(c);
    }

    public void delete(Reservation c) {
        reservationCrudRepository.delete(c);
    }

    public List<Reservation> geteservationByStatus(String Status) {
        return (List<Reservation>) reservationCrudRepository.findAllByStatus(Status);
    }

    public List<Reservation> geteservationPeriod(Date dateOne, Date dateTwo) {
        return (List<Reservation>) reservationCrudRepository.findAllByStartDateAfterAndDevolutionDateBefore(dateOne, dateTwo);
    }

    public List<CountClients> getTopClients() {
        List<CountClients> res = new ArrayList<>();

        List<Object[]> report = reservationCrudRepository.countReservationByStatus();
        for (int i = 0; i < report.size(); i++) {
            Client cliente = (Client) report.get(i)[0];
            Long cantidad = (Long) report.get(i)[1];
            CountClients cc = new CountClients(cantidad, cliente);
            res.add(cc);
        }

        return res;
    }

}
