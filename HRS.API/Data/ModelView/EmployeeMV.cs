using HRS.API.Data.Entities;
using System;

namespace HRS.API.Data.ModelView
{
    public class EmployeeMV
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public DateTime HireDate { get; set; }

        public int DepartmentId { get; set; }

        public string DepartmentName { get; set; }
    }
}
