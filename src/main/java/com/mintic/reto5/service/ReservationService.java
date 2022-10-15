/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mintic.reto5.service;

import com.mintic.reto5.model.Reservation;
import com.mintic.reto5.model.statistics.CountClients;
import com.mintic.reto5.model.statistics.DescriptionAmount;
import com.mintic.reto5.repository.ReservationRepository;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author pc
 */
@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public List<Reservation> getAll() {
        return reservationRepository.getAll();
    }

    public Optional<Reservation> getReservation(int id) {
        return reservationRepository.getReservation(id);
    }

    public Reservation save(Reservation r) {
        if (r.getIdReservation() == null) {
            return reservationRepository.save(r);
        } else {
            Optional<Reservation> e = reservationRepository.getReservation(r.getIdReservation());
            if (e.isPresent()) {
                return r;
            } else {
                return reservationRepository.save(r);
            }
        }
    }

    public Reservation update(Reservation r) {
        if (r.getIdReservation() != null) {
            Optional<Reservation> r2 = reservationRepository.getReservation(r.getIdReservation());
            if (r2.isPresent()) {
                if (r.getStartDate() != null) {
                    r2.get().setStartDate(r.getStartDate());
                }
                if (r.getDevolutionDate() != null) {
                    r2.get().setDevolutionDate(r.getDevolutionDate());
                }
                if (r.getStatus() != null) {
                    r2.get().setStatus(r.getStatus());
                }
                reservationRepository.save(r2.get());
                return r2.get();
            } else {
                return r;
            }
        } else {
            return r;
        }
    }

    public void delete(int id) {
        Optional<Reservation> r = reservationRepository.getReservation(id);
        if (r.isPresent()) {
            reservationRepository.delete(r.get());
        }
    }

    public List<CountClients> getTopClients() {
        return reservationRepository.getTopClients();
    }

    public DescriptionAmount getStatusReport() {
        List<Reservation> completed = reservationRepository.geteservationByStatus("completed");
        List<Reservation> cancelled = reservationRepository.geteservationByStatus("cancelled");

        DescriptionAmount info = new DescriptionAmount(completed.size(), cancelled.size());

        return info;
    }

    public List<Reservation> geteservationPeriod(String d1, String d2) {
        SimpleDateFormat parser = new SimpleDateFormat("yyyy-MM-dd");

        Date dateOne = new Date();
        Date dateTwo = new Date();

        try {
            dateOne = parser.parse(d1);
            dateTwo = parser.parse(d2);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        if (dateOne.before(dateTwo)) {
            return reservationRepository.geteservationPeriod(dateOne, dateTwo);
        } else {
            return new ArrayList<>();
        }

    }

}
