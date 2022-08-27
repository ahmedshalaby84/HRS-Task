using HRS.API.Data.Entities;
using HRS.API.Data.ModelView;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HRS.API.Data.Repositories
{
    public interface IEmpRepository
    {
        Task AddEmployee(Employee Employee);
        Task<ICollection<EmployeeMV>> AllEmployees();
        Task DeleteEmployee(int Id);
        Task<Employee> EmployeeByID(int Id);
        Task UpdateEmployee(Employee Employee);
    }
}