using HRS.API.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRS.API.Data.Repositories
{
    public class DeptRepository : IDeptRepository
    {
        private HRContext _context;
        public DeptRepository(HRContext context)
        {
            _context = context;
        }

        public async Task<ICollection<Department>> AllDepartments()
        {
            return await _context.Departments.ToListAsync();
        }

        public async Task<Department> DepartmentByID(int Id)
        {

            return await _context.Departments.FirstOrDefaultAsync(d => d.Id == Id);

        }

        public async Task AddDepartment(Department department)
        {
            await _context.Departments.AddAsync(department);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateDepartment(Department department)
        {
            var dept = await _context.Departments.FirstOrDefaultAsync(d => d.Id == department.Id);
            // AND UPDATE r.resumeId with viewModel.ResumeId
            if (dept != null)
            {
                dept.DepartmentName = department.DepartmentName;
                _context.Departments.Update(dept);
                _context.Entry(dept).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }

        }

        public async Task DeleteDepartment(int Id)
        {
            var dept = await _context.Departments.FirstOrDefaultAsync(d => d.Id == Id);
            // AND UPDATE r.resumeId with viewModel.ResumeId
            if (dept != null)
            {
                _context.Departments.Remove(dept);
                _context.Entry(dept).State = EntityState.Deleted;
                await _context.SaveChangesAsync();
            }


        }
    }
}
