using HRS.API.Data.Entities;
using HRS.API.Data.ModelView;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRS.API.Data.Repositories
{
    public class EmpRepository : IEmpRepository
    {
        private HRContext _context;
        public EmpRepository(HRContext context)
        {
            _context = context;
        }

        public async Task<ICollection<EmployeeMV>> AllEmployees()
        {
            
            var empsVM = new List<EmployeeMV>();
            var emps = await _context.Employees
                .Include("Department")
                .ToListAsync();
            foreach (Employee emp in emps)
            {
                var empVM = new EmployeeMV();
                empVM.Id = emp.Id;
                empVM.FirstName = emp.FirstName;
                empVM.LastName = emp.LastName;
                empVM.HireDate = emp.HireDate;
                empVM.DepartmentName = emp.Department.DepartmentName;
                empVM.DepartmentId = emp.DepartmentId;
                
                empsVM.Add(empVM);
            }

            return empsVM;
        }

        public async Task<Employee> EmployeeByID(int Id)
        {

            return await _context.Employees.FirstOrDefaultAsync(d => d.Id == Id);

        }

        public async Task AddEmployee(Employee Employee)
        {
            await _context.Employees.AddAsync(Employee);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateEmployee(Employee Employee)
        {
            var emp = await _context.Employees.FirstOrDefaultAsync(d => d.Id == Employee.Id);
            // AND UPDATE r.resumeId with viewModel.ResumeId
            if (emp != null)
            {
                emp.FirstName = Employee.FirstName;
                emp.LastName = Employee.LastName;
                emp.DepartmentId = Employee.DepartmentId;
                emp.HireDate = Employee.HireDate;
                _context.Employees.Update(emp);
                _context.Entry(emp).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }

        }

        public async Task DeleteEmployee(int Id)
        {
            var dept = await _context.Employees.FirstOrDefaultAsync(d => d.Id == Id);
            // AND UPDATE r.resumeId with viewModel.ResumeId
            if (dept != null)
            {
                _context.Employees.Remove(dept);
                _context.Entry(dept).State = EntityState.Deleted;
                await _context.SaveChangesAsync();
            }


        }


    }
}
