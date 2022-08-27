using HRS.API.Data.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HRS.API.Data.Repositories
{
    public interface IDeptRepository
    {
        Task AddDepartment(Department department);
        Task<ICollection<Department>> AllDepartments();
        Task DeleteDepartment(int Id);
        Task<Department> DepartmentByID(int Id);
        Task UpdateDepartment(Department department);
    }
}