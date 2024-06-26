using Microsoft.AspNetCore.Mvc;
using DTO;
using KolTaiib.Models;

namespace KolTaiib.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MiceController : ControllerBase
    {
        private static List<Mouse> _mice = new List<Mouse>
        {
            new Mouse { ID = 1, Model = "Myszka1", DPI = 16000 },
            new Mouse { ID = 2, Model = "Myszka2", DPI = 20000 },
            new Mouse { ID = 2, Model = "Myszka3", DPI = 18000 }
        };

        [HttpGet]
        public ActionResult<IEnumerable<Mouse>> GetMice()
        {
            return Ok(_mice);
        }

        [HttpPost]
        public ActionResult<Mouse> AddMouse([FromBody] MouseDto newMouseDto)
        {
            var newMouse = new Mouse
            {
                ID = _mice.Max(m => m.ID) + 1,
                Model = newMouseDto.Model,
                DPI = newMouseDto.DPI
            };

            _mice.Add(newMouse);
            return CreatedAtAction(nameof(GetMice), new { id = newMouse.ID }, newMouse);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteMouse(int id)
        {
            var mouse = _mice.FirstOrDefault(m => m.ID == id);
            if (mouse == null)
            {
                return NotFound();
            }

            _mice.Remove(mouse);
            return NoContent();
        }
    }
}
