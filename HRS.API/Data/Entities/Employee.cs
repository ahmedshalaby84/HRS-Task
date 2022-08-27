using Microsoft.VisualBasic;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Reflection;

namespace HRS.API.Data.Entities
{
    public class Employee
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public DateTime  HireDate { get; set; }

        public int DepartmentId { get; set; }

        public Department Department { get; set; }


        //public ICollection<Department> Departments { get; set; }
        //public ICollection<Job> Jobs { get; set; }
    }
}
