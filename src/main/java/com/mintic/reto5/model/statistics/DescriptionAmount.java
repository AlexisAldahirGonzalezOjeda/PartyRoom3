/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mintic.reto5.model.statistics;

/**
 *
 * @author pc
 */
public class DescriptionAmount {

    private Integer completed;
    private Integer cancelled; 
    
    public DescriptionAmount(Integer completed, Integer cancelled) {
        this.completed = completed;
        this.cancelled = cancelled;
    } 

    public Integer getCompleted() {
        return completed;
    }

    public void setCompleted(Integer completed) {
        this.completed = completed;
    }

    public Integer getCancelled() {
        return cancelled;
    }

    public void setCancelled(Integer cancelled) {
        this.cancelled = cancelled;
    }

}
