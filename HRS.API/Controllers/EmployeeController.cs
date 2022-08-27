using HRS.API.Data.Entities;
using HRS.API.Data.ModelView;
using HRS.API.Data.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HRS.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {

        private IEmpRepository _IEmpRepo;
        public EmployeeController(IEmpRepository IEmpRepo)
        {
            _IEmpRepo = IEmpRepo;
        }
        // GET: api/<EmployeeController>
        [HttpGet]
        public async Task<ICollection<EmployeeMV>> Get()
        {
            return await _IEmpRepo.AllEmployees();
        }

        // GET api/<EmployeeController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var result = await _IEmpRepo.EmployeeByID(id);
            if (result == null) return NotFound();
            return Ok(result);
        }

        // POST api/<EmployeeController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Employee dept)
        {
            await _IEmpRepo.AddEmployee(dept);
            return Ok(dept);
        }

        // PUT api/<EmployeeController>
        [HttpPut()]
        public async Task<IActionResult> Put([FromBody] Employee dept)
        {
            await _IEmpRepo.UpdateEmployee(dept);
            return Ok(dept);
        }

        // DELETE api/<EmployeeController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _IEmpRepo.DeleteEmployee(id);
            return Ok();
        }
    }
}
