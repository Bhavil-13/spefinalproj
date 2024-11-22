package com.KJ.Employee_Management_System.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmployeeController {

    @GetMapping("/")
    public String home() {
        return "Welcome to the Employee Management System!";
    }
}
