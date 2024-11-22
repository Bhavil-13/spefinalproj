package com.KJ.Employee_Management_System.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.KJ.Employee_Management_System.model.Employee;
// import org.springframework.stereotype.Repository;
public interface EmployeeRepository extends JpaRepository<Employee,Long> {
//    Long because employee id is long
//    JpaRepository allows for all the CRUD operations.
    
}
