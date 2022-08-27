using HRS.API.Data.Entities;
using HRS.API.Data.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HRS.API.Controllers
{
    [Route("[controller]")]
    [Produces("application/json")]
    public class DepartmentController : ControllerBase
    {
        private IDeptRepository _IDeptRepo;
        public DepartmentController(IDeptRepository IDeptRepo)
        {
            _IDeptRepo = IDeptRepo;
        }
        // GET: api/<DepartmentController>
        [HttpGet]
        public async Task<ICollection<Department>> Get()
        {
            return await _IDeptRepo.AllDepartments();
        }

        // GET api/<DepartmentController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var result = await _IDeptRepo.DepartmentByID(id);
            if (result == null) return NotFound();
            return Ok(result);
        }

        // POST api/<DepartmentController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Department dept)
        {
            await _IDeptRepo.AddDepartment(dept);
            return Ok(dept);
        }

        // PUT api/<DepartmentController>
        [HttpPut()]
        public async Task<IActionResult> Put([FromBody] Department dept)
        {
            await _IDeptRepo.UpdateDepartment(dept);
            return Ok(dept);
        }

        // DELETE api/<DepartmentController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _IDeptRepo.DeleteDepartment(id);
            return Ok();
        }
    }
}
